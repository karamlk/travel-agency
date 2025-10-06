<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\TravelRequest;
use App\Http\Resources\TravelResource;
use App\Models\Travel;

class TravelController extends Controller
{
     public function index()
    {
        $travels = Travel::all();

        return TravelResource::collection($travels);
    }

    public function show($travelId)
    {
        $travel = Travel::findOrFail($travelId);
        return new TravelResource($travel);
    }

    public function store(TravelRequest $request)
    {
        $travel = Travel::create($request->validated());

        return new TravelResource($travel);
    }

    public function update(Travel $travel, TravelRequest $request)
    {
        $travel->update($request->validated());

        return new TravelResource($travel);
    }

    public function destroy(Travel $travel)
    {
        $travel->delete();

        return response()->json(
            ['message' => 'Travel removed successfully.']
        );
    }
}
