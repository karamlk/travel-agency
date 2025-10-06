<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Booking;
use App\Models\Refund;
use App\Models\Travel;
use Illuminate\Support\Facades\DB;

class AnalyticsController extends Controller
{
    // Helper function to format numbers with 2 decimals and comma separator
    private function formatNumber($number)
    {
        return number_format((float) $number, 2, '.', ',');
    }

    public function getTopCountries()
    {
        $topCountries = Travel::join('tours', 'travels.id', '=', 'tours.travel_id')
            ->join('bookings', function ($join) {
                $join->on('tours.id', '=', 'bookings.tour_id')
                    ->where('bookings.status', 'confirmed');
            })
            ->select(
                'travels.country',
                DB::raw('SUM(tours.price) as revenue'),
                DB::raw('COUNT(DISTINCT bookings.user_id) as number_of_visitors'),
                DB::raw('AVG(tours.price) as average_tour_price'),
                DB::raw('COUNT(DISTINCT tours.id) as total_tours')
            )
            ->groupBy('travels.country')
            ->orderByDesc('revenue')
            ->limit(5)
            ->get()
            ->map(function ($item) {
                return [
                    'country' => $item->country,
                    'revenue' => $this->formatNumber($item->revenue),
                    'number_of_visitors' => $item->number_of_visitors,
                    'average_tour_price' => $this->formatNumber($item->average_tour_price),
                    'total_tours' => $item->total_tours,
                ];
            });

        return response()->json($topCountries);
    }

    public function getTopCustomers()
    {
        $bookings = Booking::with(['user', 'tour'])
            ->where('status', 'confirmed')
            ->get()
            ->groupBy('user_id');

        $results = [];

        foreach ($bookings as $userId => $userBookings) {
            $spend = $userBookings->sum(fn($booking) => $booking->tour->price ?? 0);

            $results[] = [
                'spend' => $this->formatNumber($spend),
                'user' => new UserResource($userBookings->first()->user),
            ];
        }

        return response()->json(collect($results)->sortByDesc('spend')->take(5)->values());
    }

    public function getRefundReasons()
    {
        $groupedRefunds = Refund::whereNotNull('refund_reason')
            ->get()
            ->groupBy('refund_reason');

        $refundsCount = Refund::whereNotNull('refund_reason')->count();

        $stats = [];

        foreach ($groupedRefunds as $reason => $refunds) {
            $percentage = $refundsCount > 0
                ? ($this->formatNumber((count($refunds) / $refundsCount) * 100))
                : '0.00';

            $stats[] = [
                'reason' => $reason,
                'count' => count($refunds),
                'percentage' => $percentage,
            ];
        }

        return response()->json(collect($stats)->sortByDesc('count')->values());
    }

    public function getSalesSummary()
    {
        $ranges = [
            'today' => fn() => Booking::whereDate('created_at', today()),
            'week' => fn() => Booking::whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]),
            'month' => fn() => Booking::whereMonth('created_at', now()->month)->whereYear('created_at', now()->year),
            'six_months' => fn() => Booking::where('created_at', '>=', now()->subMonths(6)),
            'year' => fn() => Booking::whereYear('created_at', now()->year),
        ];

        $sales = [];

        foreach ($ranges as $label => $queryBuilder) {
            $total = $queryBuilder()
                ->where('status', 'confirmed')
                ->with('tour')
                ->get()
                ->sum(fn($b) => $b->tour->price ?? 0);

            $sales[$label] = $this->formatNumber($total);
        }

        return response()->json($sales);
    }
}
