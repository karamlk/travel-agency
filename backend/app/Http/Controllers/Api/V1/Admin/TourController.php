<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TourRequest;
use App\Http\Resources\TourResource;
use App\Models\Tour;
use App\Models\Travel;

class TourController extends Controller
{
    public function index()
    {
        $tours = Tour::all();

        return TourResource::collection($tours);
    }

    public function show($tourId)
    {
        $tour = Tour::findOrFail($tourId);

        return new TourResource($tour);
    }

    public function store(Travel $travel, TourRequest $request)
    {
        $tour = $travel->tours()->create($request->validated());

        return new TourResource($tour);
    }

    public function update(Tour $tour, TourRequest $request)
    {
        $tour->update($request->validated());

        return new TourResource($tour);
    }

    public function destroy($tourId)
    {
        $tour = Tour::findOrFail($tourId);
        
        $tour->delete();

        return response()->json(['message' => 'Tour removed successfully.']);
    }
}
