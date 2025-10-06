<?php

namespace App\Models;

use Carbon\Carbon;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tour extends Model
{
    use HasFactory, HasUuids, Sluggable;

    protected $fillable = ['travel_id', 'name', 'starting_date', 'ending_date', 'price'];

    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name',
            ],
        ];
    }
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class);
    }
    public function avgRating(): float
    {
        return (float) $this->ratings()->avg('rating');
    }
    public function travel()
    {
        return $this->belongsTo(Travel::class);
    }
    protected static function booted()
    {
        static::saving(function ($tour) {
            $start = Carbon::parse($tour->starting_date);
            $end = Carbon::parse($tour->ending_date);

            $tour->number_of_days = $start->diffInDays($end) + 1;
            $tour->number_of_nights = $start->diffInDays($end);
        });
    }
}
