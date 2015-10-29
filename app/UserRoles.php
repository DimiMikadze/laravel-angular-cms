<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRoles extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'user_roles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['role', 'user_id'];

    /**
     * One to one relation
     */
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }
}
