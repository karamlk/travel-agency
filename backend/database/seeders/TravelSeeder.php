<?php

namespace Database\Seeders;

use App\Models\Travel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TravelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $travels = [
            ['name' => 'UK Adventure', 'description' => 'Explore the UK countryside', 'country' => 'UK', 'is_public' => true],
            ['name' => 'Paris Getaway', 'description' => 'Romantic escape in Paris', 'country' => 'France',  'is_public' => true],
            ['name' => 'Tokyo Lights', 'description' => 'Experience Tokyo nightlife', 'country' => 'Japan',  'is_public' => true],
            ['name' => 'New York Buzz', 'description' => 'Feel the energy of NYC', 'country' => 'USA', 'is_public' => true],
            ['name' => 'Desert Safari', 'description' => 'Thrilling ride in Dubai', 'country' => 'UAE',  'is_public' => true],
            ['name' => 'Swiss Alps', 'description' => 'Skiing in Switzerland', 'country' => 'Switzerland',  'is_public' => true],
            ['name' => 'Cairo Mysteries', 'description' => 'Discover ancient Egypt', 'country' => 'Egypt', 'is_public' => true],
            ['name' => 'Sydney Shores', 'description' => 'Beach vibes in Australia', 'country' => 'Australia', 'is_public' => true],
            ['name' => 'Hidden Himalayas', 'description' => 'Remote trekking adventure', 'country' => 'Nepal', 'is_public' => false],
            ['name' => 'Secret Amazon', 'description' => 'Uncharted jungle trails', 'country' => 'Brazil', 'is_public' => false],
        ];

        foreach ($travels as $travel) {
            Travel::create($travel);
        }
    }
}
