<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\ThreadController as WebThreadController;
use Inertia\Inertia;


Route::middleware('guest')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Auth/Login');
    });
});

Route::group(['middleware' => ['auth']], function () {
    /** thread route */
    Route::controller(WebThreadController::class)->as('threads.')->group(function () {
        Route::get('/threads', 'index')->name('index');
        Route::get('/threads/{thread:slug}', 'show')->name('show');
    });
});

require __DIR__ . '/auth.php';
