(function() {

    'use strict';

    angular
        .module('app.users')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'users',
                config: {
                    url: '/admin/users',
                    templateUrl: '/admin/views/admin.users.index',
                    controller: 'UsersController',
                    controllerAs: 'vm',
                    title: 'Users'
                }
            },
            {
                state: 'user-create',
                config: {
                    url: '/admin/users/create',
                    templateUrl: '/admin/views/admin.users.create',
                    controller: 'UsersController',
                    controllerAs: 'vm',
                    title: 'Create User'
                }
            },
            {
                state: 'user-edit',
                config: {
                    url: '/admin/users/:id/edit',
                    templateUrl: '/admin/views/admin.users.edit',
                    controller: 'UsersController',
                    controllerAs: 'vm',
                    title: 'Edit User'
                }
            }
        ];
    }
})();