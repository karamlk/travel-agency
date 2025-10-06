<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Travel;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all users with the 'customer' role
        $customers = User::whereHas('roles', function ($query) {
            $query->where('name', 'customer');
        })->get();

        $travels = Travel::with('tours')->where('is_public', true)->get()->filter(function ($travel) {
            return $travel->tours->isNotEmpty();
        });


        foreach ($customers as $customer) {
            for ($i = 0; $i < 3; $i++) {
                $travel = $travels->random();

                // Make sure the travel has tours
                if ($travel->tours->isEmpty()) {
                    continue;
                }

                $tour = $travel->tours->random();

                Booking::create([
                    'id'        => Str::uuid(),
                    'user_id'   => $customer->id,
                    'travel_id' => $travel->id,
                    'tour_id'   => $tour->id,
                    'status'    => collect(['pending', 'confirmed', 'canceled'])->random(),
                ]);
            }
        }
    }
}
