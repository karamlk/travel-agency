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
        Schema::create('tours', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('travel_id')->constrained('travels')->onDelete('cascade');
            $table->string('slug')->unique();
            $table->string('name');
            $table->date('starting_date');
            $table->date('ending_date');
            $table->decimal('price', 10, 2);
            $table->unsignedInteger('number_of_days');
            $table->unsignedInteger('number_of_nights');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};
