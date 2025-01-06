<?php

namespace App\Http\Resources\Notification;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'from_id' => $this->from_user_id,
            'from_user' => [
                'id' => $this->from_user->id,
                'name' => $this->from_user->name,
                'username' => $this->from_user->username,
                'avatar' => $this->from_user->avatar,
            ],
            'to_user_id' => $this->to_user_id,
            'to_user' => [
                'id' => $this->to_user->id,
                'name' => $this->to_user->name,
                'username' => $this->to_user->username,
                'avatar' => $this->to_user->avatar,
            ],
            'thread_id' => $this->thread->id,
            'thread' => [
                'id' => $this->thread->id,
                'title' => $this->thread->title,
                'slug' => $this->thread->slug,
            ],
            'is_read' => $this->is_read,
            'messages' => $this->messages,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->created_at->diffForHumans(),
        ];
    }
}
