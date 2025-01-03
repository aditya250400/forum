<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Coderflex\Laravisit\Concerns\HasVisits;

class Thread extends Model
{
    use HasVisits;
    protected $guarded = [];
}
