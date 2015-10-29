var elixir = require('laravel-elixir');
require('laravel-elixir-ng-annotate');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

var jsPlugins = [
    '../dep/angular/angular.min.js',
    '../dep/angular-ui-router/release/angular-ui-router.min.js',
    '../dep/angular-resource/angular-resource.min.js',
    '../dep/textAngular/dist/textAngular-rangy.min.js',
    '../dep/textAngular/dist/textAngular-sanitize.min.js',
    '../dep/textAngular/dist/textAngular.min.js'
];
var cssPlugins = [
    '../dep/bootstrap/dist/css/bootstrap-paper.min.css',
    '../dep/animate-css/animate-css.min.css',
    '../dep/textAngular/dist/textAngular.css',
    '../dep/font-awesome/css/font-awesome.min.css'
];
var appScripts = [
    'admin/app/**/*.modules.js',
    'admin/app/**/*.js'
];
var appSass = [
    'admin/bundle.scss'
];

elixir(function(mix) {
    mix.styles(cssPlugins, 'public/admin/css/dep.css');
    mix.sass(appSass, 'public/admin/css/app.min.css');
    mix.annotate(appScripts, 'public/admin/js/annotated.js');
    mix.scripts(jsPlugins, 'public/admin/js/dep.js');
    mix.scripts('../../../public/admin/js/annotated.js', 'public/admin/js/app.min.js');
});