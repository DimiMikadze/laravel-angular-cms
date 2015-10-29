(function() {

    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$http', '$timeout', 'User', 'AuthUser'];
    /* @ngInject */
    function ProfileController($http, $timeout, User, AuthUser) {

        var vm = this;

        vm.authuser = {};

        vm.update = update;
        vm.deleteImage = deleteImage;
        vm.hideImage = hideImage;
        authUser();

        /**
         * Auth user
         */
        function authUser() {
            AuthUser.get().success(function(res) {
                vm.authUser = res;
                vm.ready = true;
            });
        }

        /**
         * update
         */
        function update() {

            vm.loading = true;

            User.update({id: vm.authUser.id}, vm.authUser, function (res) {
                _successResponse(res.message);
            }, function (err) {
                _errorResponse(err.data, 'User edition failed, see errors below');
            });
        }

        /**
         * Delete image
         */
        function deleteImage(id) {
            $http.post('/admin/api/destroy-user-image', {id: id}).success(function(res) {
                vm.authUser.image = false;
            });
        }

        /**
         * Hide image
         */
        function hideImage() {
            vm.authUser.file = false;
        }

        /**
         * Success response
         */
        function _successResponse(successMessage) {
            vm.errors = '';
            vm.flash = successMessage;
            vm.loading = false;
            $timeout(function () {
                vm.flash = false;
            }, 5000);
        }

        /**
         * Errors response
         */
        function _errorResponse(errors, flashError) {
            vm.errors = errors;
            vm.loading = false;
            vm.flashError = flashError;
            $timeout(function () {
                vm.flashError = false;
            }, 5000);
        }

    }

}());