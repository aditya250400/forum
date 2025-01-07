<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Http\Resources\Thread\ThreadsResource;
use App\Models\Tag;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Tag $tag, Request $request)
    {
        $threads = Thread::query()
            ->with('tags', 'user')
            ->whereHas('tags', function ($query) use ($tag) {
                $query->where('name', $tag->name);
            })
            ->withTotalVisitCount()
            ->withCount('comments')
            ->latest()
            ->search()
            ->status()
            ->paginate(6)->withQueryString();

        $threads_count = Thread::count();

        $resolved_count = Thread::query()
            ->where('status', 'resolved')
            ->count();


        $users_count = User::count();

        $tags = Tag::withCount('threads')->orderBy('threads_count', 'desc')->get();

        return inertia('Web/Threads/Index', [
            'threads' => ThreadsResource::collection($threads),
            'users_count' => $users_count,
            'resolved_count' => $resolved_count,
            'threads_count' => $threads_count,
            'tags' => $tags,
        ]);
    }
}
