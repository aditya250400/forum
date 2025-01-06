<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Resources\Notification\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        // get all notification where user_id == authenticated user
        $notifications = Notification::with('to_user', 'from_user', 'thread')
            ->where('to_user_id', $request->user()->id)
            ->latest()
            ->get();

        // render view
        return inertia('Account/Notifications/Index', [
            'notifications' => NotificationResource::collection($notifications),
        ]);
    }

    public function read()
    {
        // get all notification where is_read have 0 value
        $notifications = Notification::where('is_read', 0)->get();

        // looping notifications data
        foreach ($notifications as $notification) {
            // update notification is_read
            $notification->update([
                'is_read' => 1,
            ]);
        }

        // render view
        return back();
    }
}
