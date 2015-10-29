<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use App\User;
use App\UserRoles;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('users')->delete();
        DB::table('user_roles')->delete();

        User::reguard();

        $users_data = [
            [
                'name'      => 'John Doe',
                'email'     => 'notauth@gmail.com',
                'password'  => bcrypt('secret'),
                'image'     => 'minion3.jpg',
                'role'      => 0
            ],
            [
                'name'      => 'Christina Doe',
                'email'     => 'auth@gmail.com',
                'password'  => bcrypt('secret'),
                'image'     => 'minion4.jpg',
                'role'      => 1
            ],
            [
                'name'      => 'Ben Doe',
                'email'     => 'admin@gmail.com',
                'password'  => bcrypt('secret'),
                'image'     => 'minion3.jpg',
                'role'      => 2
            ],
            [
                'name'      => 'Jessica Doe',
                'email'     => 'superadmin@gmail.com',
                'password'  => bcrypt('secret'),
                'image'     => 'minion4.jpg',
                'role'      => 3
            ],
            [
                'name'      => 'Jack Doe',
                'email'     => 'owner@gmail.com',
                'password'  => bcrypt('secret'),
                'image'     => 'minion5.jpg',
                'role'      => 4
            ]
        ];

        foreach($users_data as $data)
        {
            $user = User::create($data);
            $user->UserRoles()->save(new UserRoles($data));
        }

        User::unguard();

    }
}