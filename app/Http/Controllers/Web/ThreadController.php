<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Thread\ThreadResource;
use App\Http\Resources\Thread\ThreadsResource;
use App\Models\Comment;
use App\Models\Tag;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ThreadController extends Controller
{
    public function index()
    {
        $threads = Thread::query()
            ->with('tags', 'user')
            ->withTotalVisitCount()
            ->withCount('comments')
            ->latest()
            ->search()
            ->status()
            ->paginate(6)->withQueryString();

        $users_count = User::count();
        $threads_count = Thread::count();
        $resolved_count = Thread::query()
            ->where('status', 'resolved')
            ->count();

        $tags = Tag::query()
            ->withCount('threads')
            ->orderBy('threads_count', 'desc')
            ->get();



        return inertia('Web/Threads/Index', [
            'threads' => ThreadsResource::collection($threads),
            'users_count' => $users_count,
            'resolved_count' => $resolved_count,
            'threads_count' => $threads_count,
            'tags' => $tags,
        ]);
    }

    public function show(Thread $thread)
    {
        $thread->load('user', 'tags', 'comments', 'solved')
            ->loadCount('comments');
        if (Auth::user()->id != $thread->user_id) {
            $thread->visit()->hourlyIntervals()->withIp()->withSession()->withUser();
        }


        $comments = Comment::query()
            ->with('user')
            ->where('thread_id', $thread->id)
            ->get();

        return inertia('Web/Threads/Show', [
            'thread' => new ThreadResource($thread),
            'comments' => $comments,
        ]);
    }
}
