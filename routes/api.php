<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StatementController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\IssueController;
use App\Http\Controllers\Api\ChatController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:web');

Route::get('events', [EventController::class, 'index']);
Route::get('events/{event}', [EventController::class, 'show']);

Route::get('statements', [StatementController::class, 'index']);
Route::get('statements/{statement}', [StatementController::class, 'show']);

Route::get('issues', [IssueController::class, 'index']);
Route::get('issues/{issue}', [IssueController::class, 'show']);

Route::middleware('auth:web')->group(function () {
    Route::get('chat', [ChatController::class, 'index']);
    Route::post('chat', [ChatController::class, 'store']);
    Route::delete('chat/{chatMessage}', [ChatController::class, 'destroy']);

    Route::post('events', [EventController::class, 'store']);
    Route::put('events/{event}', [EventController::class, 'update']);
    Route::delete('events/{event}', [EventController::class, 'destroy']);

    Route::post('statements', [StatementController::class, 'store']);
    Route::put('statements/{statement}', [StatementController::class, 'update']);
    Route::delete('statements/{statement}', [StatementController::class, 'destroy']);

    Route::post('issues', [IssueController::class, 'store']);
    Route::put('issues/{issue}', [IssueController::class, 'update']);
    Route::delete('issues/{issue}', [IssueController::class, 'destroy']);
});
