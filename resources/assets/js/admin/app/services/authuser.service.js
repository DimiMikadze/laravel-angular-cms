(function() {

    'use strict';

    angular
        .module("app.services")
        .factory("AuthUser", AuthUser);

    AuthUser.$inject = ['$http'];
    /* @ngInject */
    function AuthUser($http) {
        var service = {
            get: get
        };

        return service;

        function get() {
            return $http.get('/admin/api/auth-user');
        }
    }

}());