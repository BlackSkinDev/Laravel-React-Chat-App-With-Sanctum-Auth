<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/messages',[\App\Http\Controllers\ChatController::class,'message']);
Route::get('/messages',[\App\Http\Controllers\ChatController::class,'messages']);



Route::post('/auth/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/auth/signup', [\App\Http\Controllers\AuthController::class, 'signup']);




Route::group(['middleware' => ['auth:sanctum','throttle']], function () {
    Route::get('/me', function(Request $request) {
        return auth()->user();
    });
    Route::post('/auth/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});
