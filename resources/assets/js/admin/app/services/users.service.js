(function() {

    'use strict';

    angular
        .module("app.services")
        .factory("User", User);

    User.$inject = ['$resource'];
    /* @ngInject */
    function User($resource) {
        return $resource('/admin/api/users/:id', {id: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    }

}());