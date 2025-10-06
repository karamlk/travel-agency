<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\RefundResource;
use App\Models\Refund;
use App\Notifications\RefundApprovedNotification;
use App\Notifications\RefundRejectedNotification;
use Illuminate\Http\Request;

class RefundController extends Controller
{
    public function index()
    {
        $refunds = Refund::with(['booking', 'user'])->get();

        return RefundResource::collection($refunds);
    }

    public function show($refundId)
    {
        $refund = Refund::with(['booking', 'user'])->findOrFail($refundId);

        return new RefundResource($refund);
    }

    public function update(Request $request, $refundId)
    {
        $request->validate([
            'status' => 'required|in:approved,rejected',
            'rejection_reason' => 'nullable|string|max:255',
        ]);

        $refund = Refund::findOrFail($refundId);

        $refund->status = $request->status;

        if ($request->status === 'approved') {
            $refund->refunded_at = now();
            $refund->rejection_reason = null;
            $refund->user->notify(new RefundApprovedNotification($refund));
        }

        if ($request->status === 'rejected') {
            $refund->refunded_at = null;
            $refund->rejection_reason = $request->input('rejection_reason');
            $refund->user->notify(new RefundRejectedNotification($refund));
        }

        $refund->save();

        return new RefundResource($refund);
    }
}
