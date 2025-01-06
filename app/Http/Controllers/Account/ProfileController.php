<?php

namespace App\Http\Controllers\Account;

use App\Models\User;
use App\Models\Thread;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\User\UsersResource;
use App\Http\Resources\Thread\ThreadsResource;

class ProfileController extends Controller
{
    /**
     * path store image
     */

    public function index(User $user)
    {
        // load relationship
        $user->loadCount('threads', 'resolved', 'comments');

        // get all threads data
        $threads = Thread::query()
            ->with('user', 'tags')
            ->withCount('comments')
            ->withTotalVisitCount()
            ->where('user_id', $user->id)
            ->search()
            ->status()
            ->latest()
            ->paginate(6)->withQueryString();

        // render view
        return inertia('Account/Profile/Index', [
            'user' => new UsersResource($user),
            'threads' => ThreadsResource::collection($threads),
        ]);
    }

    public function updateProfile(User $user, Request $request)
    {
        if ($request->password) {
            // update user data by id
            $user->update([
                'name' => $request->name,
                'username' => str()->slug($request->name),
                'password' => bcrypt($request->password),
            ]);
            // check if user send avatar
            if ($request->file('avatar')) {
                // delete old image
                Storage::disk('public')->delete('avatars/' . basename($user->avatar));

                // upload new avatar
                $avatar = $request->file('avatar');
                $avatar->storeAs('avatars', $avatar->hashName());

                // update user data by id
                $user->update([
                    'avatar' => $avatar->hashName()
                ]);
            }
        } else {
            // update user data by id
            $user->update([
                'name' => $request->name,
                'username' => str()->slug($request->name),
            ]);

            // check if user send avatar
            if ($request->file('avatar')) {
                // delete old image
                Storage::disk('public')->delete('avatars/' . basename($user->avatar));

                // upload new avatar
                $avatar = $request->file('avatar');
                $avatar->storeAs('avatars', $avatar->hashName());

                // update user data by id
                $user->update([
                    'avatar' => $avatar->hashName()
                ]);
            }
        }

        // render view
        return to_route('threads.index');
    }
}
