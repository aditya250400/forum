<?php

namespace App\Traits;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

trait HasSlug
{
    /**
     * Auto add str()->slug() to title
     */
    public static function BootHasSlug()
    {
        // event trigger when created
        static::creating(function ($model) {
            // check schema column in migration if have slug column
            if (Schema::hasColumn($model->getTable(), 'slug')) {
                // if has slug column, give column name or title to slug helper method
                $model->slug = Str::slug($model->name . '-' . $model->id ?? $model->title . '-' . $model->id);
            }
        });
        // event trigger when updated
        static::updating(function ($model) {
            // check schema column in migration if have slug column
            if (Schema::hasColumn($model->getTable(), 'slug')) {
                // if has slug column, give column name or title to slug helper method
                $model->slug = Str::slug($model->name . '-' . $model->id ?? $model->title . '-' . $model->id);
            }
        });
    }
}
