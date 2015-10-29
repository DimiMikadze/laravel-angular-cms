(function() {

    'use strict';

    angular
        .module("app.gallery")
        .factory("Gallery", Gallery);

    Gallery.$inject = ['$resource'];
    /* @ngInject */
    function Gallery($resource) {
        return $resource('/admin/api/gallery/:id', {id: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    }

}());