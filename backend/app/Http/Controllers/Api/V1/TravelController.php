<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\TravelResource;
use App\Models\Travel;

class TravelController extends Controller
{
    public function index()
    {
        $travels = Travel::where('is_public', true)->get();

        return TravelResource::collection($travels);
    }

    public function show($travelSlug)
    {
        $travel = Travel::where('slug', $travelSlug)->firstOrFail();
        return new TravelResource($travel);
    }

    public function showadmin($travelId)
    {
        $travel = Travel::findOrFail($travelId);
        return new TravelResource($travel);
    }
}
