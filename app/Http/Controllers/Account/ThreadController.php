<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Requests\ThreadRequest;
use App\Http\Resources\Thread\ThreadResource;
use App\Models\Tag;
use App\Models\Thread;
use Illuminate\Http\Request;

class ThreadController extends Controller
{
    public function create()
    {
        $tags = Tag::get()->map(function ($tag) {
            return [
                'label' => $tag->name,
                'value' => $tag->id,
            ];
        });

        return inertia('Account/Threads/Create', compact('tags'));
    }

    public function store(ThreadRequest $request)
    {
        $thread = $request->user()->threads()->create([
            'title' => $request->title,
            'slug' => str()->slug($request->title),
            'description' => $request->description,
            'content' => $request->content,
        ]);

        foreach ($request->tags as $tagName) {
            $tag = Tag::firstOrCreate([
                'name' => $tagName,
                'slug' => str()->slug($tagName)
            ]);

            $thread->tags()->attach($tag);
        }

        return to_route('threads.index');
    }

    public function edit(Thread $thread)
    {
        $this->authorize('update', $thread);

        $tags = Tag::get()->map(function ($tag) {
            return [
                'label' => $tag->name,
                'value' => $tag->id,
            ];
        });

        $thread->load('tags', 'user');

        return inertia('Account/Threads/Edit', [
            'thread' => new ThreadResource($thread),
            'tags' => $tags,
        ]);
    }

    public function update(ThreadRequest $request, Thread $thread)
    {
        $this->authorize('update', $thread);

        $thread->update([
            'title' => $request->title,
            'slug' => str()->slug($request->title),
            'description' => $request->description,
            'content' => $request->content,
        ]);

        $newTags = [];

        foreach ($request->tags as $tagName) {
            $tag = Tag::firstOrCreate([
                'name' => $tagName,
                'slug' => str()->slug($tagName)
            ]);

            array_push($newTags, $tag->id);

            $thread->tags()->sync($newTags);
        }

        return to_route('threads.index');
    }

    public function destroy(Thread $thread)
    {
        $this->authorize('destroy', $thread);

        $thread->delete();

        return back();
    }
}
