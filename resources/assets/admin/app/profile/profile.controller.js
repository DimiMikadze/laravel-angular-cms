(function() {

    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$http', '$state', '$timeout', '$stateParams', 'User', 'File', 'AuthUser'];
    /* @ngInject */
    function ProfileController($http, $state, $timeout, $stateParams, User, File, AuthUser) {

        var vm = this;

        vm.authuser = {};

        vm.update = update;
        vm.deleteImage = deleteImage;
        vm.ready = false;
        authUser();

        /**
         * Auth user
         */
        function authUser() {
            AuthUser.get().success(function(res) {
                vm.authUser = res;
                vm.isUploaded = res.image ? true : false;
                vm.ready = true;
            });
        }

        /**
         * update user
         */
        function update() {

            vm.loading = true;

            if (! vm.isUploaded && vm.authUser.image) {
                var file = File.update('/upme/api/users/' + vm.authUser.id, vm.authUser, vm.authUser.image);

                file.then(function (res) {
                    _successResponse(res.data.message, 'dashboard')
                }, function (err) {
                    _errorResponse(err.data);
                });
            } else {
                User.update({id: vm.authUser.id}, vm.authUser, function (res) {
                    _successResponse(res.message, 'dashboard')
                }, function (err) {
                    _errorResponse(err.data);
                });
            }
        }

        /**
         * Delete image
         */
        function deleteImage(id) {
            if(id === undefined) {
                vm.user.image = null;
                vm.authUser.image = null;
            } else {
                File.remove('/upme/api/destroy-user-image', id).success(function() {
                    vm.isUploaded = false;
                    vm.authUser.image = '';
                });
            }
        }

        /**
         * Success response
         */
        function _successResponse(successMessage, state) {
            vm.errors = '';
            vm.flash = successMessage;
            vm.loading = false;
            $timeout(function () {
                $state.go(state);
            }, 1000);
        }

        /**
         * Errors response
         */
        function _errorResponse(errors) {
            vm.errors = errors;
            vm.loading = false;
        }

    }

}());