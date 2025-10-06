<?php

use App\Http\Controllers\Api\V1\Admin\AnalyticsController;
use App\Http\Controllers\Api\V1\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Api\V1\Admin\DashboardOverviewController;
use App\Http\Controllers\Api\V1\Admin\TourController as AdminTourController;
use App\Http\Controllers\Api\V1\Admin\TravelController as AdminTravelController;
use App\Http\Controllers\Api\V1\Admin\RefundController as AdminRefundController;
use App\Http\Controllers\Api\V1\Auth\LoginController;
use App\Http\Controllers\Api\V1\Auth\LogoutController;
use App\Http\Controllers\Api\V1\Auth\SignUpController;
use App\Http\Controllers\Api\V1\BookingController;
use App\Http\Controllers\Api\V1\RatingController;
use App\Http\Controllers\Api\V1\RefundController;
use App\Http\Controllers\Api\V1\TourController;
use App\Http\Controllers\Api\V1\TravelController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/travels', [TravelController::class, 'index']);
Route::get('/travels/{travel:slug}', [TravelController::class, 'show']);

Route::get('/tours', [TourController::class, 'index']);
Route::get('/tours/{tour:slug}', [TourController::class, 'show']);

Route::prefix('customer')->middleware(['auth:sanctum', 'role:customer'])->group(function () {
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/tours/{tour:slug}/bookings', [BookingController::class, 'store']);
    Route::put('/tours/{tour:slug}/bookings', [BookingController::class, 'cancel']);

    Route::get('/refunds', [RefundController::class, 'index']);
    Route::get('/refunds/{refund}', [RefundController::class, 'show']);
    Route::post('/bookings/{booking}/refund', [RefundController::class, 'store']);

    Route::post('/tours/{tour:slug}/rate', [RatingController::class, 'store']);
});

Route::prefix('admin')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/travels', [AdminTravelController::class, 'index']);
    Route::get('/travels/{travel:id}', [AdminTravelController::class, 'show']);
    Route::post('/travels', [AdminTravelController::class, 'store']);
    Route::put('/travels/{travel:id}', [AdminTravelController::class, 'update']);
    Route::delete('travels/{travel:id}', [AdminTravelController::class, 'destroy']);

    Route::get('/tours', [AdminTourController::class, 'index']);
    Route::get('/travels/{travel:id}/tours', [TourController::class, 'index']);
    Route::get('/tours/{tour:id}', [AdminTourController::class, 'show']);
    Route::post('/travels/{travel:id}/tours', [AdminTourController::class, 'store']);
    Route::put('tours/{tour:id}', [AdminTourController::class, 'update']);
    Route::delete('tours/{tour:id}', [AdminTourController::class, 'destroy']);

    Route::get('/bookings', [AdminBookingController::class, 'index']);
    Route::get('/travels/{travel:id}/customers', [AdminBookingController::class, 'getCustomersForTravel']);
    Route::get('/tours/{tour:id}/customers', [AdminBookingController::class, 'getCustomersForTour']);
    Route::put('/bookings/{booking:id}', [AdminBookingController::class, 'confirmBooking']);

    Route::get('/refunds', [AdminRefundController::class, 'index']);
    Route::get('/refunds/{refund:id}', [AdminRefundController::class, 'show']);
    Route::put('/refunds/{refund:id}', [AdminRefundController::class, 'update']);

    Route::get('/dashboard/overview', [DashboardOverviewController::class, 'index']);

    Route::prefix('analytics')->group(function () {
        Route::get('/top-countries', [AnalyticsController::class, 'getTopCountries']);
        Route::get('/top-customers', [AnalyticsController::class, 'getTopCustomers']);
        Route::get('/refund-reasons', [AnalyticsController::class, 'getRefundReasons']);
        Route::get('/sales-summary', [AnalyticsController::class, 'getSalesSummary']);
    });
});

Route::post('/login', LoginController::class);
Route::post('/logout', LogoutController::class)->middleware('auth:sanctum');
Route::post('/signup', SignUpController::class);
