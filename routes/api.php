<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/messages',[\App\Http\Controllers\ChatController::class,'message']);
