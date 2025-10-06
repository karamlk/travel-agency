<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('refunds', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('booking_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->decimal('refund_amount', 10, 2);
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->enum('refund_reason', [
                'weather',
                'health_issue',
                'provider_cancellation',
                'personal_emergency',
                'booking_error',
                'visa_problem',
                'payment_issue',
                'schedule_conflict',
                'other'
            ])->nullable();
            $table->text('rejection_reason')->nullable();
            $table->timestamp('refunded_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'booking_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refunds');
    }
};
