<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('mainPage');
})->name('home');

Route::get('/map', function () {
    return Inertia::render('mapPage');
})->name('map');