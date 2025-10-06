<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookingResource;
use App\Models\Booking;
use App\Models\Tour;
use App\Models\Travel;

class BookingController extends Controller
{
    public function index()
    {
        $bookedList = Booking::with(['tour', 'travel'])
            ->where('user_id', auth('sanctum')->user()->id)
            ->paginate();

        if ($bookedList->isEmpty()) {
            return response()->json([
                'message' => 'you didn\'t booked any tour yet'
            ], 404);
        }

        return BookingResource::collection($bookedList);
    }

    public function store($tourSlug)
    {
        $tour = Tour::where('slug', $tourSlug)->firstOrFail();
        $travel = $tour->travel;

        $user = auth('sanctum')->user();

        $existingBooking = Booking::where('user_id', $user->id)
            ->where('tour_id', $tour->id)
            ->first();


        if ($existingBooking) {

            if ($existingBooking->status === 'canceled') {
                $newBooking = Booking::create([
                    'user_id' => $user->id,
                    'travel_id' => $travel->id,
                    'tour_id' => $tour->id,
                    'status' => 'pending'
                ]);

                return response()->json([
                    'message' => 'The tour is now rebooked. Your booking has been restored to pending.',
                    'data' => new BookingResource($newBooking)
                ], 200);
            }

            return response()->json([
                'message' => "You have already booked this tour"
            ], 409);
        }

        Booking::create([
            'user_id' => $user->id,
            'travel_id' => $travel->id,
            'tour_id' => $tour->id,
            'status' => 'pending'
        ]);

        return response()->json([
            'message' => 'Booking created successfully',
        ], 201);
    }

    public function cancel($tourSlug)
    {
        $user = auth('sanctum')->user();

        $booking = Booking::where('user_id', $user->id)
            ->whereHas('tour', function ($query) use ($tourSlug) {
                $query->where('slug', $tourSlug);
            })
            ->first();

        if (! $booking) {
            return response()->json([
                'message' => 'Booking not found or you don\'t have permission to cancel this booking.'
            ], 404);
        }

        $booking->status = 'canceled';
        $booking->save();

        return response()->json([
            'message' => 'Booking has been successfully canceled.',
            'data' => new BookingResource($booking)
        ]);
    }
}
