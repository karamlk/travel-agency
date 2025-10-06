<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Notifications\BookingConfirmedNotification;

class BookingController extends Controller
{
    public function index()
    {
        $bookings = Booking::with(['travel', 'tour', 'user'])->get();

        return BookingResource::collection($bookings);
    }

    public function getCustomersForTravel($travelId)
    {
        $bookings = Booking::where('travel_id', $travelId)
            ->with(['user', 'tour','travel'])
            ->latest()
            ->get();

       
        return BookingResource::collection($bookings);
    }

     public function getCustomersForTour($tourId)
    {
        $bookings = Booking::where('tour_id', $tourId)
            ->with(['user', 'tour','travel'])
            ->latest()
            ->get();

       
        return BookingResource::collection($bookings);
    }

    public function confirmBooking($bookingId)
    {
        $booking = Booking::findOrFail($bookingId);

        if ($booking->status !== 'pending') {
            return response()->json([
                'message' => 'Booking cannot be confirmed as it is not in pending status.'
            ], 400);
        }
        $booking->status = 'confirmed';
        $booking->save();
        $booking->user->notify(new BookingConfirmedNotification($booking));

        return response()->json([
            'message' => 'Booking confirmed successfully and email sent!',
            'booking' => new BookingResource($booking)
        ]);
    }
}
