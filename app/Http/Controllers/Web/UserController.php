<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Thread\ThreadsResource;
use App\Http\Resources\User\UsersResource;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //

    public function index()
    {
        return inertia('Web/Users/Index');
    }

    public function show(User $user)
    {
        $user->load('threads', 'comments', 'resolved');
        $threads = Thread::query()->with(['tags', 'user' => function ($query) {
            $query->withCount('resolved', 'comments', 'threads');
        }])
            ->search()
            ->status()
            ->withTotalVisitCount()
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(5);

        return inertia('Web/Users/Show', [
            'user' => new UsersResource($user),
            'threads' => ThreadsResource::collection($threads),
        ]);
    }
}
