(function() {

    'use strict';

    angular
        .module('app.profile')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'profile',
                config: {
                    url: '/admin/profile',
                    templateUrl: '/admin/views/admin.profile.index',
                    controller: 'ProfileController',
                    controllerAs: 'vm',
                    title: 'My Profile'
                }
            }
        ];
    }
})();