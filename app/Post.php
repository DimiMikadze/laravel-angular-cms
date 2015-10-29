<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'posts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'description', 'image', 'visible'];

    /**
     * One to many relation
     */
    public function postImages()
    {
        return $this->hasMany('App\PostImages', 'post_id', 'id');
    }
}
