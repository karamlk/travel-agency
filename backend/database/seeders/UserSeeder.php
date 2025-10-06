<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);
        $admin->roles()->attach(Role::where('name', 'admin')->first()->id);

        // Create Customer
        $customer = User::create([
            'name' => 'Customer User',
            'email' => 'customer@example.com',
            'password' => Hash::make('password'),
        ]);
        $customer->roles()->attach(Role::where('name', 'customer')->first()->id);

           $customer1 = User::create([
            'name' => 'Customer User1',
            'email' => 'customer1@example.com',
            'password' => Hash::make('password'),
        ]);
        $customer1->roles()->attach(Role::where('name', 'customer')->first()->id);
    }
}
