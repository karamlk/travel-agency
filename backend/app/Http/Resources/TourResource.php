<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TourResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'starting_date' => $this->starting_date,
            'ending_date' => $this->ending_date,
            'avgRate' => round($this->avgRating(), 2),
            'price' => number_format($this->price, 2, '.', ','),
            'number_of_days' => $this->number_of_days,
            'number_of_nights' => $this->number_of_nights,
        ];
    }
}
