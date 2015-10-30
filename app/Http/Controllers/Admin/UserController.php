<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\User;
use App\UserRoles;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Intervention\Image\Facades\Image as Image;
use App\Helpers\ImageHelper;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        return User::with('userRoles')->orderBy('users.created_at', 'desc')->paginate(50);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name'          => 'required|min:3|max:20',
            'email'         => 'required|email|unique:users,email',
            'password'      => 'required|min:6',
            'repassword'    => 'required_with|same:password',
            'role'          => 'not_in:Role'
        ]);

        if(Auth::user()->UserRoles->role <= $request->role)
        {
            return response()->json(["You don't have permission to create this type of user"], 422);
        }

        $data = $request->all();
        $data['password'] = bcrypt($request->password);

        if($request->file)
        {
            $validate = ImageHelper::validate($request->file, 2000000);

            if(! $validate['success'])
            {
                return response()->json([$validate['message']], 422);
            }

            $image = ImageHelper::create($request->file, 600, 'admin/images/users/');

            $data['image'] = $image['filename'];
        }

        $user = User::create($data);
        $user->UserRoles()->save(new UserRoles($data));

        return response()->json(['message' => 'User successfully Created']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        return User::with('UserRoles')->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        if($request->id == 51)
        {
            return response()->json(['oldpassword' => 'Old password is not correct'], 422);
        }

        $this->validate($request, [
            'name'          => 'required|min:3|max:20',
            'email'         => 'required|email|unique:users,email,' . $id,
            'oldpassword'   => 'required',
            'repassword'    => 'required_with:password|same:password'
        ]);

        if($request->password && strlen($request->password) < 6)
        {
            return response()->json(["password" => "Password at least 6 characters"], 422);
        }

        $user = User::find($id);

        if(Hash::check($request->oldpassword, $user->password))
        {
            $data = $request->all();

            if($request->password)
            {
                $data['password'] = bcrypt($request->password);
            }

            if ($request->file)
            {
                $validate = ImageHelper::validate($request->file, 2000000);

                if(! $validate['success'])
                {
                    return response()->json([$validate['message']], 422);
                }

                $image = ImageHelper::create($request->file, 600, 'admin/images/users/');

                $data['image'] = $image['filename'];
            }

            $user->update($data);
            $user->UserRoles()->update(['role' => $data['user_roles']['role']]);

            return response()->json(['message' => 'User successfully updated']);
        }

        return response()->json(['oldpassword' => 'Old password is not correct'], 422);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if(Auth::user()->UserRoles->role <= $user->UserRoles->role)
        {
            return response()->json(['error' => 'You dont have permission to delete this type of user'], 422);
        }

        if(File::exists(public_path() . '/admin/images/users/' . $user->image))
        {
            File::delete(public_path() . '/admin/images/users/' . $user->image);
        }

        User::destroy($id);

        return response()->json(['message' => 'User successfully deleted']);
    }

    /**
     * Remove image
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyImage(Request $request)
    {
        $user = User::find($request->id);

        if(File::exists(public_path() . '/admin/images/users/' . $user->image))
        {
            File::delete(public_path() . '/admin/images/users/' . $user->image);
        }

        $user->update(['image' => '']);

        return response()->json(['message' => 'User image successfully deleted']);

    }

    /**
     * live search
     */
    public function search(Request $request)
    {
        return User::where('name', 'like', '%' . $request->keyword . '%')
                    ->orWhere('email', 'like', '%' . $request->keyword . '%')
                    ->orderBy('users.created_at', 'desc')
                    ->with('userRoles')->paginate(50);
    }

    /**
     * Role filter
     */
    public function userRoleFilter(Request $request)
    {
        $role = $request->role;

        if($role === "Role")
        {
            $users = User::with('userRoles')->orderBy('users.created_at', 'desc')->paginate(50);
        }
        else
        {
            $users = User::whereHas('UserRoles', function($query) use ($role) {
                $query->where('role', $role);
            })->with('UserRoles')->paginate(50);
        }

        return $users;
    }

    /**
     * Auth user information
     */
    public function authUser()
    {
        return Auth::user();
    }

}
