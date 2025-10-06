<?php

namespace Database\Seeders;

use App\Models\Rating;
use App\Models\Tour;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RatingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
      // Get customer users only
        $customers = User::whereHas('roles', function ($query) {
            $query->where('name', 'customer');
        })->get();

        $tours = Tour::all();

        foreach ($customers as $customer) {
            $ratedTours = $tours->random(min(2, $tours->count()));

            foreach ($ratedTours as $tour) {
                Rating::create([
                    'id' => Str::uuid(),
                    'user_id' => $customer->id,
                    'tour_id' => $tour->id,
                    'rating' => rand(1, 5),
                    'review' => rand(0, 1) ? 'Great experience!' : null,
                ]);
            }
        }
    }
}
