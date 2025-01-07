<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UsersResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $page = $request->input('page', 1);

        $perPage = $request->input('perPage', 6);

        $users = User::query()
            ->withCount('threads', 'comments', 'resolved')
            ->paginate($perPage, ['*'], 'page', $page);

        return UsersResource::collection($users);
    }
}
