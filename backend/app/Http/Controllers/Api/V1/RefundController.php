<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\RefundResource;
use App\Models\Booking;
use App\Models\Refund;
use Illuminate\Http\Request;

class RefundController extends Controller
{

    public function index()
    {
        $refunds = Refund::with(['user', 'booking'])->where('user_id', auth('sanctum')->user()->id)->get();

        return RefundResource::collection($refunds);
    }

    public function store(Request $request, $bookingId)
    {
        $request->validate([
            'refund_reason' => 'required|string|max:255',
        ]);

        $booking = Booking::with('tour')->findOrFail($bookingId);

        if ($booking->status !== 'canceled') {
            return response()->json([
                'message' => 'Refunds can only be requested for canceled bookings.'
            ], 400);
        }

        if (Refund::where('booking_id', $bookingId)->exists()) {
            return response()->json(['message' => 'Refund already requested.'], 409);
        }

        $refund = Refund::create([
            'booking_id' => $bookingId,
            'status'=>'pending',
            'user_id' => auth('sanctum')->user()->id,
            'refund_amount' => $booking->tour->price,
            'refund_reason' => $request->input('refund_reason'),
        ]);

        return new RefundResource($refund);
    }

    public function show($refundId)
    {
        $refund = Refund::with(['booking', 'user'])->where('user_id', auth('sanctum')->user()->id)->findOrFail($refundId);

        return new RefundResource($refund);
    }
}
