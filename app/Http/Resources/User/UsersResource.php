<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsersResource extends JsonResource
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
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'avatar' => $this->avatar,
            'threads_count' => $this->threads_count,
            'resolved_count' => $this->resolved_count,
            'comments_count' => $this->comments_count,
            'notifications_count' => $this->notifications_count,
            'notification_unreads_unreads_count' => $this->notification_unreads_count,
        ];
    }
}
