<?php

namespace App\Helpers;

use Intervention\Image\Facades\Image as Image;

class ImageHelper
{
    /**
     * Create single image
     */
    public static function create($file, $resize_width, $path)
    {
        $image = Image::make($file['url']);
        $resize = self::resize($image, $resize_width);
        $temp = explode("/", $file['type']);
        $newfilename = date('YmdHis') . '.' . uniqid() . '.' .end($temp);
        self::save($resize, $path . $newfilename);

        return ['success' => true, 'filename' => $newfilename];
    }

    /**
     * Create multiple images
     */
    public static function createMultiple($files, $resize_width, $path)
    {
        $filenames = [];

        foreach($files as $file)
        {
            $image = Image::make($file['url']);
            $resize = self::resize($image, $resize_width);
            $temp = explode("/", $file['type']);
            $newfilename = date('YmdHis') . '.' . uniqid() . '.' .end($temp);
            self::save($resize, $path . $newfilename);
            $filenames[] = $newfilename;
        }

        return ['success' => true, 'filenames' => $filenames];
    }

    /**
     * Validate single image
     */
    public static function validate($file, $max_size)
    {
        if(! self::checkImage($file['type']))
        {
            return ['success' => false, 'message' => 'File is not an Image'];
        }

        if($file['size'] > $max_size)
        {
            return ['success' => false, 'message' => 'Image is too big maximum size is ' . $max_size];
        }

        return ['success' => true];
    }

    /**
     * Validate multiple images
     */
    public static function validateMultiple($files, $max_size)
    {
        $filesize = 0;

        foreach($files as $file)
        {
            if(! self::checkImage($file['type']))
            {
                return ['success' => false, 'message' => 'File is not an Image'];
            }

            $filesize = $filesize + $file['size'];
        }

        if($filesize > $max_size)
        {
            return ['success' => false, 'message' => 'Image is too big maximum size is ' . $max_size];
        }

        return ['success' => true];
    }

    /**
     * Resize file
     */
    public static function resize($file, $width)
    {
        return $file->resize($width, null, function($constraint){
            $constraint->aspectRatio();
        });
    }

    /**
     * Save file
     */
    public static function save($file, $path)
    {
        return $file->save(public_path($path));
    }

    /**
     * Check if File is Image
     */
    public static function checkImage($file_type)
    {
        if(substr($file_type, 0, 5) !== 'image')
        {
            return false;
        }

        return true;
    }

}