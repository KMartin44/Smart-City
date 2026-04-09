<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StatementController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\IssueController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('events', EventController::class)->only(['index', 'show']);
Route::apiResource('issues', IssueController::class)->only(['index', 'show']);
Route::apiResource('statements', StatementController::class)->only(['index', 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('events', EventController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('issues', IssueController::class)->only(['store', 'update', 'destroy']);
    Route::apiResource('statements', StatementController::class)->only(['store', 'update', 'destroy']);
});
