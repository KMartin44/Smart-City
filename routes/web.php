<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('mainPage');
})->name('home');

Route::get('/map', function () {
    return Inertia::render('mapPage');
})->name('map');

Route::get('/admin', function () {
    return Inertia::render('adminPage/index');
})->name('admin.index');

Route::get('/admin/show/{type}/{id}', function ($type, $id) {
    return Inertia::render('adminPage/show', [
        'type' => $type,
        'id' => (int) $id,
    ]);
})->name('admin.show');

Route::get('/admin/edit/{type}/{id}', function ($type, $id) {
    return Inertia::render('adminPage/edit', [
        'type' => $type,
        'id' => (int) $id,
    ]);
})->name('admin.edit');