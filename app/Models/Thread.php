<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Coderflex\Laravisit\Concerns\HasVisits;

class Thread extends Model
{
    use HasVisits;
    protected $guarded = [];


    public function scopeSearch($query)
    {
        return $query->when(request()->search, function ($query) {
            $query->where('title', 'like', '%' . request()->search . '%');
        });
    }

    public function scopeStatus($query)
    {
        return $query->when(request()->status, function ($query) {
            $query->where('status', request()->status);
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function solved()
    {
        return $this->hasOne(Solved::class);
    }
}
