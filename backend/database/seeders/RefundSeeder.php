<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Refund;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RefundSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = User::whereHas('roles', fn($q) => $q->where('name', 'customer'))->get();

        foreach ($customers as $customer) {
            $canceledBookings = Booking::where('user_id', $customer->id)
                ->where('status', 'canceled')
                ->get();

            foreach ($canceledBookings as $booking) {
                $alreadyRefunded = Refund::where('user_id', $customer->id)
                    ->where('booking_id', $booking->id)
                    ->exists();

                if ($alreadyRefunded) {
                    continue; // Skip if refund already exists
                }

                Refund::create([
                    'id' => Str::uuid(),
                    'booking_id' => $booking->id,
                    'user_id' => $customer->id,
                    'refund_amount' => $booking->tour->price ?? 100.00,
                    'refund_reason' => collect([
                        'weather',
                        'health_issue',
                        'provider_cancellation',
                        'personal_emergency',
                        'booking_error',
                        'visa_problem',
                        'payment_issue',
                        'schedule_conflict',
                        'other'
                    ])->random(),
                    'status' => 'pending',
                    'refunded_at' => null,
                    'rejection_reason' => null,
                ]);
            }
        }
    }
}
