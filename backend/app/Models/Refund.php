<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Refund extends Model
{
    use HasUuids;

    protected $fillable = ['booking_id', 'user_id', 'refund_amount', 'status', 'refund_reason', 'rejection_reason', 'refunded_at'];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
