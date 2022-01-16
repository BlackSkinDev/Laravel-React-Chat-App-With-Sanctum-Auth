<?php

use Illuminate\Support\Facades\Route;

Route::get('/{path?}', function () {
    return view('app');
});
Route::get('/{path?}/{path2?}', function () {
    return view('app');
});
Route::get('/{path?}/{path2?}/{path3?}', function () {
    return view('app');
});
