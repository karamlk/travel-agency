<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends Model
{
    use HasUuids;
    protected $fillable = ['user_id', 'tour_id', 'rating', 'review'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }
}
