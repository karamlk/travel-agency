<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\RatingRequest;
use App\Http\Resources\RatingResource;
use App\Models\Rating;
use App\Models\Tour;

class RatingController extends Controller
{
    public function store(RatingRequest $rating_request, $tourSlug)
    {
        $tour = Tour::where('slug', $tourSlug)->firstOrFail();
        $existinRating = Rating::where('user_id', auth('sanctum')->user()->id)
            ->where('tour_id', $tour->id)
            ->first();

        if ($existinRating) {
            return response()->json([
                'message' => "You have already rated this tour.",
            ], 409);
        }

        Rating::create([
            'user_id' => auth('sanctum')->user()->id,
            'tour_id' => $tour->id,
            'rating' => $rating_request->rating,
            'review' => $rating_request->review ?? null
        ]);

        return response()->json([
            'message' => 'Your rating has been submitted successfully.',
        ], 201);
    }
}
