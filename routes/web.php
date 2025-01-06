<?php

use App\Http\Controllers\Account\ProfileController;
use App\Http\Controllers\Account\ThreadController;
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

Route::group(['prefix' => 'account', 'as' => 'account.', 'middleware' => ['auth']], function () {
    /** thread route */
    Route::resource('/threads', ThreadController::class)->except('show');

    /** profiles route */
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile/{user:username}', 'index');
        Route::put('/profile/{user}', 'updateProfile');
    });
});

require __DIR__ . '/auth.php';
