# Laravel and AngularJS CMS

CMS built on Laravel, AngularJS and Material Design

## Features

- Users/User Roles, Posts, Gallery, Profile  CRUD
- Authentication
- John papa Angular style
- Material Design
- Image Manipulation
- Sass

## Demo

````

Email: demo@demo.com
Password: demodemo

[DEMO](http://admin.upmelab.com/admin/login)

````

## Getting Started

Clone Repo

````
git clone https://github.com/DimitriMikadze/laravel-angular-cms.git
````

Create Database

Cd project and run composer install and npm install

````
cd laravel-angular-cms
composer install
npm install
````

Add .env file to root directory.

Example:

````
see .env.example file
````

Migrate tables

````
php artisan migrate
````

Seed tables

````
php artisan db:seed
````

Start Server

````
php artisan serve
````

Navigate to

````
localhost:8000/admin/profile
````

User credentials:

````
email: admin@gmail.com
password: secret
````

## gulp

watch changes

````
gulp watch
````

## gulp minify stylesheets and scripts

````
gulp --production
````

## Angular

you can find angular files in

````
resources/assets/js/admin/app
````

output files

````
public/admin/js
````

## CSS

Css is written in sass. if you don't want to use sass just navigate to

````
public/admin/css/app.css
````

and change css import file in

````
resources/views/admin/layouts/header.blade.php
````

## Sass

Sass files

````
resources/assets/sass/admin
````

output files

````
public/admin/css
````

## Dependencies

all app dependencies are located to

````
resources/assets/dep
````

## Contributing

contributions are more than welcome!

## License

See license.txt
