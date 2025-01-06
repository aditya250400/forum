<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Models\Thread;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    private $path = 'public/avatars/';

    public function index(User $user)
    {
        $user->loadCount('threads', 'resolved', 'comments');

        $threads = Thread::query()
            ->with('user', 'tags')
            ->withCount('comments')
            ->withTotalVisitCount()
            ->where('user_id', $user->id)
            ->search()
            ->status()
            ->latest()
            ->paginate(6)->withQueryString();

        return inertia('Account/Profile/Index', compact('user', 'threads'));
    }

    public function updateProfile(User $user, request $request)
    {
        if ($request->password) {
            $user->update([
                'name' => $request->name,
                'username' => str()->slug($request->username) . '-' . $user->id,
                'password' => bcrypt($request->password),
            ]);

            if ($request->file('avatar')) {
                Storage::disk('local')->delete($this->path . basename($user->avatar));

                $avatar = $request->file('avatar');
                $avatar->storeAs($this->path, $avatar->hashname());

                $user->update(['avatar' => $avatar->hashName()]);
            }
        } else {
            $user->update([
                'name' => $request->name,
                'username' => str()->slug($request->name),
            ]);

            if ($request->file('avatar')) {
                Storage::disk('local')->delete($this->path . basename($user->avatar));

                $avatar = $request->file('avatar');
                $avatar->storeAs($this->path, $avatar->hashName());

                $user->update([
                    'avatar' => $avatar->hashName()
                ]);
            }
        }
    }
}
