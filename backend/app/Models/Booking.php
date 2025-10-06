<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    use HasUuids;
    
    protected $table = 'bookings';
    protected $fillable = ['user_id', 'travel_id', 'tour_id', 'status'];

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }
    public function travel(): BelongsTo
    {
        return $this->belongsTo(Travel::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function refund(): HasOne
    {
        return $this->hasOne(Refund::class);
    }
}
