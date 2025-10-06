<?php

namespace Database\Seeders;

use App\Models\Rating;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(
            [
                RoleSeeder::class,
                UserSeeder::class,
                TravelSeeder::class,
                TourSeeder::class,
                BookingSeeder::class,
                RefundSeeder::class,
                RatingSeeder::class
            ]
        );
    }
}
