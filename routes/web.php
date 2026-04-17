<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('mainPage');
})->name('home');

Route::get('/map', function () {
    return Inertia::render('mapPage');
})->name('map');

Route::get('/statements', function () {
    return Inertia::render('statementsPage/index', [
        'userType' => Auth::check() ? Auth::user()->type : null,
    ]);
})->name('statements');

Route::get('/statements/show/{id}', function ($id) {
    return Inertia::render('statementsPage/show', [
        'id' => (int) $id,
        'userType' => Auth::check() ? Auth::user()->type : null,
    ]);
})->name('statements.show');

Route::get('/statements/edit/{id}', function ($id) {
    $userType = Auth::check() ? Auth::user()->type : null;
    $isAllowed = in_array($userType, ['admin', 'onkormanyzat', 'onkormanyzati']);
    if (!$isAllowed) {
        abort(403, 'Nincs jogosultságod a közlemény szerkesztéséhez.');
    }

    return Inertia::render('statementsPage/edit', [
        'id' => (int) $id,
        'userType' => $userType,
    ]);
})->name('statements.edit');

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

Route::get('/register', [UserController::class, 'showRegister'])->name('register');
Route::post('/register', [UserController::class, 'register']);

Route::get('/login', [UserController::class, 'showLogin'])->name('login');
Route::post('/login', [UserController::class, 'login']);

Route::post('/logout', [UserController::class, 'logout'])->name('logout');

Route::get("/issues", function () {
    return Inertia::render('issuePage/index');
})->name('issues.index');

Route::get("/events", function () {
    return Inertia::render('eventPage/index');
})->name('events.index');
