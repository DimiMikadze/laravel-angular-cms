<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Gallery;
use App\GalleryImages;
use Illuminate\Support\Facades\File;
use App\Helpers\ImageHelper;

class GalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Gallery::with('galleryImages')->orderBy('gallery.created_at', 'desc')->paginate(50);
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
        $this->validate($request, [
            'title'         => 'required|min:3|max:100',
            'date'          => 'required',
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
            $image = ImageHelper::create($data['file'], 600, 'admin/images/gallery/');
            $data['image'] = $image['filename'];
        }

        $gallery = Gallery::create($data);

        if(isset($data['files']))
        {
            $image_multiple = ImageHelper::createMultiple($data['files'], 600, 'admin/images/gallery/');
            for($i=0; $i< count($data['files']); $i++)
            {
                $gallery->galleryImages()->save(new GalleryImages(['name' => $image_multiple['filenames'][$i]]));
            }
        }

        return response()->json(['message' => 'Gallery successfully Created']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Gallery::with('GalleryImages')->find($id);
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
            'date'          => 'required',
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
            $image = ImageHelper::create($data['file'], 600, 'admin/images/gallery/');
            $data['image'] = $image['filename'];
        }

        $gallery = Gallery::find($id);
        $gallery->update($data);

        if(isset($data['files']))
        {
            $image_multiple = ImageHelper::createMultiple($data['files'], 600, 'admin/images/gallery/');
            for($i=0; $i< count($data['files']); $i++)
            {
                $gallery->galleryImages()->save(new GalleryImages(['name' => $image_multiple['filenames'][$i]]));
            }
        }

        return response()->json(['message' => 'Gallery updated successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $gallery = Gallery::find($id);

        if(File::exists(public_path() . '/admin/images/gallery/' . $gallery->image))
        {
            File::delete(public_path() . '/admin/images/gallery/' . $gallery->image);
        }

        if(count($gallery->GalleryImages) > 0)
        {
            foreach($gallery->GalleryImages as $img)
            {
                if(File::exists(public_path() . '/admin/images/gallery/' . $img->name))
                {
                    File::delete(public_path() . '/admin/images/gallery/' . $img->name);
                }
            }
        }

        Gallery::destroy($id);

        return response()->json(['message' => 'Gallery successfully deleted']);
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
            $gallery_image = GalleryImages::find($request->image_id);

            if(File::exists(public_path() . '/admin/images/gallery/' . $gallery_image->name))
            {
                File::delete(public_path() . '/admin/images/gallery/' . $gallery_image->name);
            }

            GalleryImages::destroy($gallery_image->id);
        }
        else
        {
            $gallery = Gallery::find($request->id);

            if(File::exists(public_path() . '/admin/images/gallery/' . $gallery->image))
            {
                File::delete(public_path() . '/admin/images/gallery/' . $gallery->image);
            }

            $gallery->update(['image' => '']);
        }

        return response()->json(['message' => 'Gallery image successfully deleted']);
    }

    /**
     * live search
     */
    public function search(Request $request)
    {
        return Gallery::where('title', 'like', '%' . $request->keyword . '%')
                      ->orderBy('gallery.created_at', 'desc')
                      ->with('GalleryImages')->paginate(50);
    }
}
