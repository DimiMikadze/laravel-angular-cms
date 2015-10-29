<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Post;
use App\PostImages;
use Illuminate\Support\Facades\File;
use App\Helpers\ImageHelper;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Post::with('postImages')->orderBy('posts.created_at', 'desc')->paginate(50);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $images = [];
        foreach($request->file() as $image) {
            $image->move(public_path() . '/admin/images/posts', $image->getClientOriginalName());
        }

        return $image;

        $this->validate($request, [
            'title'         => 'required|min:3|max:100',
            'description'   => 'required|min:10',
            'visible'       => 'required'
        ]);

        $data = $request->all();

        if($request->file)
        {
            $validate = ImageHelper::validate($request->file, 2000000);

            if(! $validate['success'])
            {
                return response()->json([$validate['message']], 422);
            }
        }

        if(isset($data['files']))
        {
            $validate_multiple = ImageHelper::validateMultiple($data['files'], 20000000);

            if(! $validate_multiple['success'])
            {
                return response()->json([$validate_multiple['message']], 422);
            }
        }

        if($request->file)
        {
            $image = ImageHelper::create($data['file'], 600, 'admin/images/posts/');
            $data['image'] = $image['filename'];
        }

        $post = Post::create($data);

        if(isset($data['files']))
        {
            $image_multiple = ImageHelper::createMultiple($data['files'], 600, 'admin/images/posts/');
            for($i=0; $i< count($data['files']); $i++)
            {
                $post->PostImages()->save(new PostImages(['name' => $image_multiple['filenames'][$i]]));
            }
        }

        return response()->json(['message' => 'Post successfully Created']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Post::with('PostImages')->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title'         => 'required|min:3|max:20',
            'description'   => 'required|min:10',
            'visible'       => 'required'
        ]);

        $data = $request->all();

        if($request->file)
        {
            $validate = ImageHelper::validate($request->file, 2000000);

            if(! $validate['success'])
            {
                return response()->json([$validate['message']], 422);
            }
        }

        if(isset($data['files']))
        {
            $validate_multiple = ImageHelper::validateMultiple($data['files'], 20000000);

            if(! $validate_multiple['success'])
            {
                return response()->json([$validate_multiple['message']], 422);
            }
        }

        if($request->file)
        {
            $image = ImageHelper::create($data['file'], 600, 'admin/images/posts/');
            $data['image'] = $image['filename'];
        }

        $post = Post::find($id);
        $post->update($data);

        if(isset($data['files']))
        {
            $image_multiple = ImageHelper::createMultiple($data['files'], 600, 'admin/images/posts/');
            for($i=0; $i< count($data['files']); $i++)
            {
                $post->PostImages()->save(new PostImages(['name' => $image_multiple['filenames'][$i]]));
            }
        }

        return response()->json(['message' => 'Post successfully Updated']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);

        if(File::exists(public_path() . '/admin/images/posts/' . $post->image))
        {
            File::delete(public_path() . '/admin/images/posts/' . $post->image);
        }

        if(count($post->PostImages) > 0)
        {
            foreach($post->PostImages as $img)
            {
                if(File::exists(public_path() . '/admin/images/posts/' . $img->name))
                {
                    File::delete(public_path() . '/admin/images/posts/' . $img->name);
                }
            }
        }

        Post::destroy($id);

        return response()->json(['message' => 'Post successfully deleted']);
    }

    /**
     * Remove image
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyImage(Request $request)
    {
        if($request->image_id)
        {
            $post_image = PostImages::find($request->image_id);

            if(File::exists(public_path() . '/admin/images/posts/' . $post_image->name))
            {
                File::delete(public_path() . '/admin/images/posts/' . $post_image->name);
            }

            PostImages::destroy($post_image->id);
        }
        else
        {
            $post = Post::find($request->id);

            if(File::exists(public_path() . '/admin/images/posts/' . $post->image))
            {
                File::delete(public_path() . '/admin/images/posts/' . $post->image);
            }

            $post->update(['image' => '']);
        }

        return response()->json(['message' => 'User image successfully deleted']);
    }

    /**
     * live search
     */
    public function search(Request $request)
    {
        return Post::where('title', 'like', '%' . $request->keyword . '%')
            ->orWhere('description', 'like', '%' . $request->keyword . '%')
            ->orderBy('posts.created_at', 'desc')
            ->with('PostImages')->paginate(50);
    }
}
