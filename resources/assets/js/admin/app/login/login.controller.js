(function() {

    'use strict';

    angular
        .module("app.login")
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http', '$window'];
    /* @nginject */
    function LoginController($http, $window) {

        var vm = this;

        vm.user = {};
        vm.login = login;

        /**
         * Login
         */
        function login() {
            $http.post('/admin/login', {user: vm.user})
                .success(function (res) {
                    $window.location.href = '/admin/dashboard';
                })
                .error(function(res) {
                    vm.error = res;
                });
        }

    }

}());
