(function() {

    'use strict';

    angular
        .module('app.posts')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'posts',
                config: {
                    url: '/admin/posts',
                    templateUrl: '/admin/views/admin.posts.index',
                    controller: 'PostsController',
                    controllerAs: 'vm',
                    title: 'Posts'
                }
            },
            {
                state: 'post-create',
                config: {
                    url: '/admin/posts/create',
                    templateUrl: '/admin/views/admin.posts.create',
                    controller: 'PostsController',
                    controllerAs: 'vm',
                    title: 'Create Post'
                }
            },
            {
                state: 'post-edit',
                config: {
                    url: '/admin/posts/:id/edit',
                    templateUrl: '/admin/views/admin.posts.edit',
                    controller: 'PostsController',
                    controllerAs: 'vm',
                    title: 'Edit Post'
                }
            }
        ];
    }
})();