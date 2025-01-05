<?php

namespace App\Policies;

use App\Models\Thread;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ThreadPolicy
{
    public function update(User $user, Thread $thread): Response
    {
        return $user->id == $thread->user_id
            ? Response::allow()
            : Response::deny('You do not own this thread.');
    }

    public function destroy(User $user, Thread $thread): Response
    {
        return $user->id == $thread->user_id
            ? Response::allow()
            : Response::deny('You do not own this thread.');
    }
}
