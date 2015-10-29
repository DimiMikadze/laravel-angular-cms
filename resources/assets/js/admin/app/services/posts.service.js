(function() {

    'use strict';

    angular
        .module("app.services")
        .factory("Post", Post);

    Post.$inject = ['$resource'];
    /* @ngInject */
    function Post($resource) {
        return $resource('/admin/api/posts/:id', {id: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    }

}());