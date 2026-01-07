<?php

use App\Http\Controllers\CurrencyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(CurrencyController::class)->group(function() {
    Route::get('conversions', 'getConversions');
    Route::post('convert-currency', 'convertCurrency');
});
