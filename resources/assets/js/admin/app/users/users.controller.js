(function() {

    'use strict';

    angular
        .module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$http', '$timeout', '$stateParams', 'User', 'AuthUser'];
    /* @nginject */
    function UsersController($http, $timeout, $stateParams, User, AuthUser) {

        var vm = this;

        vm.user = {};
        vm.users = {};
        vm.authuser = {};
        vm.create = create;
        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.hideImage = hideImage;
        vm.deleteImage = deleteImage;
        vm.showDeleteModal = showDeleteModal;
        vm.hideDeleteModal = hideDeleteModal;
        vm.loadMore = loadMore;
        vm.liveSearch = liveSearch;
        vm.filterByRole = filterByRole;
        authUser();
        if(! $stateParams.id) { getUsers(); }
        if($stateParams.id) { getUser(); }

        /**
         * Auth user
         */
        function authUser() {
            AuthUser.get().success(function(res) {
                vm.authUser = res;
                vm.isUploaded = res.image ? true : false;
            });
        }

        /**
         * Get all
         */
        function getUsers() {
            User.get(function (res) {
                vm.users = res.data;
                vm.total = res.total;
                vm.next = res.next_page_url;
                vm.ready = true;
            });
        }

        /**
         * find by id
         */
        function getUser() {
            vm.user = User.get({id: $stateParams.id}, function() {
                vm.ready = true;
            });
        }

        /**
         * Create
         */
        function create() {
            vm.loading = true;

            User.save(vm.user, function (res) {
                _successResponse(res.message);
                vm.user = {
                    user_roles: {
                        role: 'Role'
                    }
                };
            }, function (err) {
                _errorResponse(err.data, 'User creation failed see errors below');
            });
        }

        /**
         * update user
         */
        function update() {
            vm.loading = true;

            User.update({id: vm.user.id}, vm.user, function (res) {
                _successResponse(res.message);
            }, function (err) {
                _errorResponse(err.data, "User edition failed see errors below");
            });
        }

        /**
         * Delete
         */
        function deleteUser() {
            User.delete({id: vm.user.id}, function (res) {
                vm.users.splice(vm.users.indexOf(vm.user), 1);
                vm.total = vm.total - 1;
                vm.deleteModal = false;
                vm.flash = res.message;
                $timeout(function () {
                    vm.flash = false;
                }, 3000);
            });
        }

        /**
         * Show delete modal
         */
        function showDeleteModal(user) {
            vm.user = user;
            vm.deleteModal = true;
        }

        /**
         * Hide delete modal
         */
        function hideDeleteModal() {
            vm.deleteModal = false;
        }

        /**
         * load more
         */
        function loadMore(url) {
            $http.get(url).success(function (res) {
                vm.next = res.next_page_url;
                vm.users = vm.users.concat(res.data);
            });
        }

        /**
         * Live search
         */
        function liveSearch() {
            $http.post('/admin/api/users/search', {keyword: vm.search}).success(function (res) {
                vm.users = res.data;
                vm.total = res.total;
                vm.next = res.next_page_url;
            });
        }

        /**
         * Filter by role
         */
        function filterByRole() {
            $http.post('/admin/api/users/user-role-filter', {role: vm.roleFilter}).success(function (res) {
                vm.users = res.data;
                vm.total = res.total;
                vm.next = res.next_page_url;
            });
        }

        /**
         * Delete image
         */
        function deleteImage(id) {
            $http.post('/admin/api/destroy-user-image', {id: id}).success(function(res) {
                document.getElementById('single-uploader').value = null;
                vm.user.image = null;
            });
        }

        /**
         * Hide image
         */
        function hideImage() {
            document.getElementById('single-uploader').value = null;
            vm.user.file = false;
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