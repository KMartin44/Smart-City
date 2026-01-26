<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatementController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\IssueController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/statements', [StatementController::class, 'index'])->name('api.statements.index');
Route::post('/statements', [StatementController::class, 'store'])->name('api.statements.store');
Route::delete('/statements/{statement}', [StatementController::class, 'destroy'])->name('api.statements.destroy');

Route::get('/events', [EventController::class, 'index'])->name('api.events.index');
Route::post('/events', [EventController::class, 'store'])->name('api.events.store');
Route::delete('/events/{event}', [EventController::class, 'destroy'])->name('api.events.destroy');

Route::get('/issues', [IssueController::class, 'index'])->name('api.issues.index');
Route::post('/issues', [IssueController::class, 'store'])->name('api.issues.store');
Route::delete('/issues/{issue}', [IssueController::class, 'destroy'])->name('api.issues.destroy');