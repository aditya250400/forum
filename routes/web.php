<?php

use App\Http\Controllers\Account\CommentController;
use App\Http\Controllers\Account\NotificationController;
use App\Http\Controllers\Account\ProfileController;
use App\Http\Controllers\Account\ThreadController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Web\ThreadController as WebThreadController;
use App\Http\Middleware\CustomRedirectIfAuthenticated;
use Inertia\Inertia;


Route::get('/', [AuthenticatedSessionController::class, 'create'])->middleware(CustomRedirectIfAuthenticated::class)->name('login');

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

    /** notifications route */
    Route::controller(NotificationController::class)->as('notifications.')->group(function () {
        Route::get('/notifications', 'index')->name('index');
        Route::post('/notifications/read', 'read')->name('read');
    });

    /** comments route */
    Route::controller(CommentController::class)->as('comments.')->group(function () {
        Route::post('/comments/{thread}', 'store')->name('store');
        Route::put('/comments/{comment}', 'update')->name('update');
        Route::delete('/comments/{comment}', 'destroy')->name('destroy');
        Route::put('/comments/{thread}/solution/{comment}', 'solution')->name('solution');
    });
});

require __DIR__ . '/auth.php';
