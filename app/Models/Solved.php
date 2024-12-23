<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Solved extends Model
{
    protected $guarded = [];

    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }

    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }
}
