(function() {

    'use strict';

    angular
        .module('app', [
            'app.core',
            'app.filters',
            'app.router',
            'app.components',
            'app.services',

            'app.login',
            'app.profile',
            'app.dashboard',
            'app.users',
            'app.posts',
            'app.gallery'
        ]);

}());