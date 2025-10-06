<?php

namespace Database\Seeders;

use App\Models\Tour;
use App\Models\Travel;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       $travels = Travel::all();

        foreach ($travels as $travel) {
            for ($i = 1; $i <= 3; $i++) {
                $startDate = Carbon::now()->addDays(rand(10, 60));
                $endDate = (clone $startDate)->addDays(rand(2, 5));

                $numberOfDays = $startDate->diffInDays($endDate) + 1;
                $numberOfNights = $startDate->diffInDays($endDate);

                $name = "{$travel->name} Tour {$i}";

                Tour::create([
                    'travel_id'        => $travel->id,
                    'name'             => $name,
                    'starting_date'    => $startDate->toDateString(),
                    'ending_date'      => $endDate->toDateString(),
                    'price'            => rand(10000, 50000) / 100,
                    'number_of_days'   => $numberOfDays,
                    'number_of_nights' => $numberOfNights,
                ]);
            }
        }
    }
}
