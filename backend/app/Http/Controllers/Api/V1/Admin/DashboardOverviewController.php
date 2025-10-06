<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TourResource;
use App\Models\Booking;
use App\Models\Rating;
use App\Models\Refund;
use App\Models\Tour;
use Carbon\Carbon;

class DashboardOverviewController extends Controller
{
    // Helper function for formatting decimals
    private function formatNumber($number)
    {
        return number_format((float) $number, 2, '.', ',');
    }

    public function index()
    {
        return response()->json([
            'sales_vs_refunds' => $this->getSalesVsRefunds(),
            'booking_metrics' => $this->getBookingMetrics(),
            'booking_status' => $this->getBookingStatus(),
            'top_rated_tours' => $this->getTopRatedTours(),
            'upcoming_tours' => $this->getUpcomingTours(),
            'recent_activity' => $this->getRecentActivity()
        ]);
    }

    private function getSalesVsRefunds()
    {
        $bookings = Booking::with('tour')->where('status', 'confirmed')->get();
        $sales = $bookings->sum(fn($booking) => optional($booking->tour)->price ?? 0);
        $refunds = Refund::sum('refund_amount');

        return [
            'sales' => $this->formatNumber($sales),
            'refunds' => $this->formatNumber($refunds),
            'net' => $this->formatNumber($sales - $refunds),
        ];
    }

    private function getBookingMetrics()
    {
        $totalBookings = Booking::where('status', 'confirmed')->count();
        $totalRatings = Rating::count();
        $totalReviews = Rating::whereNotNull('review')->count();

        return [
            'total_bookings' => $totalBookings,
            'total_ratings' => $totalRatings,
            'total_reviews' => $totalReviews,
        ];
    }

    private function getTopRatedTours()
    {
        $tours = Tour::all();

        $ratedTours = $tours->map(function ($tour) {
            return [
                'date_range' => Carbon::parse($tour->starting_date)->format('M d')
                    . ' – ' .
                    Carbon::parse($tour->ending_date)->format('M d, Y'),
                'tour' => new TourResource($tour),
            ];
        });

        return $ratedTours->sortByDesc('avgRate')->take(5)->values();
    }

    private function getBookingStatus()
    {
        return [
            "confirmed" => Booking::where('status', 'confirmed')->count(),
            "pending" => Booking::where('status', 'pending')->count(),
            "canceled" => Booking::where('status', 'canceled')->count(),
        ];
    }

    private function getUpcomingTours()
    {
        $tours = Tour::where('starting_date', '>', now())
            ->orderByDesc('starting_date')
            ->take(5)
            ->get();

        return TourResource::collection($tours);
    }

    private function getRecentActivity()
    {
        $activities = [];

        $recentBookings = Booking::with('user', 'tour')->latest()->take(5)->get();
        foreach ($recentBookings as $booking) {
            $activities[] = [
                'type' => 'booking',
                'message' => "{$booking->user->name} booked {$booking->tour->name}",
                'timestamp' => Carbon::parse($booking->created_at)->format('M d, Y h:i A')
            ];
        }

        $recentRatings = Rating::with('user', 'tour')->latest()->take(5)->get();
        foreach ($recentRatings as $rating) {
            $activities[] = [
                'type' => 'rating',
                'message' => "{$rating->user->name} rated {$rating->tour->name} {$this->formatNumber($rating->rating)} stars",
                'timestamp' => Carbon::parse($rating->created_at)->format('M d, Y h:i A')
            ];
        }

        $recentReviews = Rating::with('user', 'tour')->whereNotNull('review')->latest()->take(5)->get();
        foreach ($recentReviews as $review) {
            $activities[] = [
                'type' => 'reviewing',
                'message' => "{$review->user->name} reviewed {$review->tour->name} saying: \"{$review->review}\" ",
                'timestamp' => Carbon::parse($review->created_at)->format('M d, Y h:i A')
            ];
        }

        $recentRefunds = Refund::with('user', 'booking.tour')->latest()->take(5)->get();
        foreach ($recentRefunds as $refund) {
            $tourName = optional($refund->booking->tour)->name ?? 'a tour';
            $activities[] = [
                'type' => 'refund',
                'message' => "{$refund->user->name} requested a refund for {$tourName}",
                'timestamp' => Carbon::parse($refund->created_at)->format('M d, Y h:i A')
            ];
        }

        return collect($activities)->sortByDesc('timestamp')->values();
    }
}
