<?php

/*
 |--------------------------------------------------------------------------
 | Client Routes
 |--------------------------------------------------------------------------
*/

// Route::get('/', function() {

//     return "<h1 style='text-align: center; margin-top: 4em;'>Navigate to /admin/login</h1>";

// });


Route::get('/posts', 'Client\PostController@index')->name('posts');