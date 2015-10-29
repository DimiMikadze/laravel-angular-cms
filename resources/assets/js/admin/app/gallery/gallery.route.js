(function() {

    'use strict';

    angular
        .module('app.gallery')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'gallery',
                config: {
                    url: '/admin/gallery',
                    templateUrl: '/admin/views/admin.gallery.index',
                    controller: 'GalleryController',
                    controllerAs: 'vm',
                    title: 'Gallery'
                }
            },
            {
                state: 'gallery-create',
                config: {
                    url: '/admin/gallery/create',
                    templateUrl: '/admin/views/admin.gallery.create',
                    controller: 'GalleryController',
                    controllerAs: 'vm',
                    title: 'Create Gallery'
                }
            },
            {
                state: 'gallery-edit',
                config: {
                    url: '/admin/gallery/:id/edit',
                    templateUrl: '/admin/views/admin.gallery.edit',
                    controller: 'GalleryController',
                    controllerAs: 'vm',
                    title: 'Edit Gallery'
                }
            }
        ];
    }
})();