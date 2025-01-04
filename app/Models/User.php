<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Coderflex\Laravisit\Concerns\CanVisit;
use App\Traits\HasSlug;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasSlug;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'username',
        'email',
        'password',
        'avatar'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn($value) => ucwords($value),
            set: fn($value) => strtolower(($value)),
        );
    }

    protected function avatar(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value != '' ? asset('/storage/avatars/' . $value) : 'https://www.gravatar.com/avatar/b2b58f77632a6f5c46d30b08108baa57?d=mm&s=150',
        );
    }



    public function threads()
    {
        return $this->hasMany(Thread::class);
    }

    public function resolved()
    {
        return $this->hasMany(Thread::class)->where('status', 'resolved');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class, 'to_user_id');
    }

    public function notification_unreads()
    {
        return $this->hasMany(Notification::class, 'to_user_id')->where('is_read', 0);
    }
}
