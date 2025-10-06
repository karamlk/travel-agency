<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RefundResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'booking' => new BookingResource($this->whenLoaded('booking')),
            'user' => new UserResource($this->whenLoaded('user')),
            'refund_amount' => number_format($this->refund_amount, 2, '.', ','),
            'status' => $this->status,
            'refund_reason' => $this->refund_reason,
            'rejection_reason' => $this->rejection_reason,
            'refunded_at' => $this->refunded_at
        ];
    }
}
