<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GalleryImages extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'gallery_images';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['gallery_id', 'name'];

    /**
     * One to many relation
     */
    public function gallery()
    {
        return $this->belongsTo('App\Gallery', 'gallery_id', 'id');
    }
}
