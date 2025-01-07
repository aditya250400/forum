<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Thread;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;


class CommentController extends Controller
{
    public function store(Thread $thread, Request $request)
    {
        // create new comment
        $thread->comments()->create([
            'user_id' => $request->user()->id,
            'content' => $request->content,
        ]);


        // create new notification
        $thread->notifications()->create([
            'from_user_id' => $request->user()->id,
            'to_user_id' => $thread->user_id,
            'messages' => 'Memberikan komentar pada thread anda yang berjudul ' . $thread->title,
        ]);

        // render view
        return back();
    }

    /**
     * Store a newly update resource in storage.
     */
    public function update(Comment $comment, Request $request)
    {
        // protect comment with policy
        Gate::authorize('update', $comment);


        // create new comment
        $comment->update([
            'content' => $request->content,
        ]);

        // render view
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        // protect comment with policy
        Gate::authorize('destroy', $comment);


        // delete comment data by id
        $comment->delete();

        // render view
        return back();
    }

    public function solution(Thread $thread, Comment $comment)
    {
        // create new solved data
        $thread->solved()->updateOrcreate([
            'thread_id' => $thread->id,
        ], [
            'comment_id' => $comment->id,
        ]);

        // update thread data by id
        $thread->update([
            'status' => 'resolved',
        ]);

        // create new notification
        $thread->notifications()->create([
            'from_user_id' => $thread->user_id,
            'to_user_id' => $comment->user_id,
            'messages' => 'Memilih komentar anda pada thread ' . $thread->title . ' menjadi solusi terbaik.'
        ]);

        // render view
        return back();
    }
}
