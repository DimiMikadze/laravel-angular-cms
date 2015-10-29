<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\Post;
use App\Gallery;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users_count        = User::count();
        $posts_count        = Post::count();
        $galleries_count    = Gallery::count();

        return response()->json([
            'users_count'       => $users_count,
            'posts_count'       => $posts_count,
            'galleries_count'   => $galleries_count
        ]);
    }

}
