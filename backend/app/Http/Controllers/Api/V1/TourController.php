<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\RatingResource;
use App\Http\Resources\TourResource;
use App\Models\Tour;
use App\Models\Travel;
use Illuminate\Http\Request;

class TourController extends Controller
{
    public function index( Request $request)
    {
        $request->validate([
            'priceFrom' => 'nullable|numeric|min:0',
            'priceTo' => 'nullable|numeric|min:0',
            'dateFrom' => 'nullable|date',
            'dateTo' => 'nullable|date',
            'sortBy' => 'nullable|in:price,starting_date',
            'sortOrder' => 'nullable|in:asc,desc',
        ]);
    $query = Tour::query();

        if ($request->has('priceFrom')) {
            $query->where('price', '>=', $request->priceFrom );
        }

        if ($request->has('priceTo')) {
            $query->where('price', '<=', $request->priceTo );
        }

        if ($request->has('dateFrom')) {
            $query->where('starting_date', '>=', $request->dateFrom);
        }

        if ($request->has('dateTo')) {
            $query->where('starting_date', '<=', $request->dateTo);
        }

        if ($request->has('sortBy') && $request->has('sortOrder')) {
            $query->orderBy($request->sortBy, $request->sortOrder);
        }

       $query->orderByDesc('starting_date');

        $tours = $query->get();

        return TourResource::collection($tours);
    }

    public function show($tourSlug)
    {
        $tour = Tour::where('slug', $tourSlug)->firstOrFail();

        return new TourResource($tour);
    }
}
