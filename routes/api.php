<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StatementController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\IssueController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('events', EventController::class);

Route::apiResource('statements', StatementController::class);

Route::apiResource('issues', IssueController::class);
