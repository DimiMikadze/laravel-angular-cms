(function() {

    'use strict';

    angular
        .module('app.filters')
        .filter('roles', roles);

    function roles() {
        return function(role) {
            var roleWords = ['Not Auth', 'Auth', 'Admin', 'Super Admin', 'Owner'];

            return roleWords[role];
        }
    }

}());