<?php

/*
 |--------------------------------------------------------------------------
 | Admin Routes
 |--------------------------------------------------------------------------
*/

Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function ()
{
    Route::get('/login', ['uses' => 'LoginController@index']);
    Route::post('/login', 'LoginController@login');

    Route::group(['middleware' => 'role:2'], function()
    {
        Route::get('/logout', ['uses' => 'LoginController@logout']);

        Route::group(['prefix' => 'api'], function()
        {
            Route::get('/dashboard', 'DashboardController@index');

            Route::resource('users', 'UserController');
            Route::post('/users/search', 'UserController@search');
            Route::post('/users/user-role-filter', 'UserController@userRoleFilter');
            Route::get('/auth-user', 'UserController@authUser');
            Route::post('/destroy-user-image', 'UserController@destroyImage');

            Route::resource('posts', 'PostController');
            Route::post('/posts/search', 'PostController@search');
            Route::post('/destroy-post-image', 'PostController@destroyImage');

            Route::resource('gallery', 'GalleryController');
            Route::post('/gallery/search', 'GalleryController@search');
            Route::post('/destroy-gallery-image', 'GalleryController@destroyImage');

        });

        Route::get('/views/{name}', function($name) {
            return View($name);
        });

        Route::any('{path?}', function () {
            return View('admin.layouts.master');
        })->where("path", ".+");

    });

});

