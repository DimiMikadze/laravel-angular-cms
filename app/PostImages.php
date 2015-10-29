<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostImages extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'post_images';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['post_id', 'name'];

    /**
     * One to many relation
     */
    public function post()
    {
        return $this->belongsTo('App\Post', 'post_id', 'id');
    }
}
