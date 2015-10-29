(function() {

    'use strict';

    angular
        .module('app.posts')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['$http', '$timeout', '$stateParams', 'Post'];
    /* @ngInject */
    function PostsController($http, $timeout, $stateParams, Post) {

        var vm = this;

        vm.posts = {};
        vm.post = {};

        vm.create = create;
        vm.update = update;
        vm.deletePost = deletePost;
        vm.hideImage = hideImage;
        vm.showDeleteModal = showDeleteModal;
        vm.hideDeleteModal = hideDeleteModal;
        vm.deleteImage = deleteImage;
        vm.liveSearch = liveSearch;
        vm.loadMore = loadMore;

        if(! $stateParams.id) { getPosts(); }
        if($stateParams.id) { getPost(); }

        /**
         * Get all
         */
        function getPosts() {
            Post.get(function (res) {
                vm.posts = res.data;
                vm.total = res.total;
                vm.next = res.next_page_url;
                vm.ready = true;
            });
        }

        /**
         * find by id
         */
        function getPost() {
            vm.post = Post.get({id: $stateParams.id}, function() {
                vm.ready = true;
            });
        }

        /**
         * Create
         */
        function create() {
            vm.loading = true;

            Post.save(vm.post, function(res) {
                _successResponse(res.message);
                vm.post = '';
            }, function (err) {
                _errorResponse(err.data, 'Post creation failed, see errors below');
            });
        }

        /**
         * Update
         */
        function update() {
            vm.loading = true;

            Post.update({id: vm.post.id}, vm.post, function (res) {
                _successResponse(res.message);
            }, function (err) {
                _errorResponse(err.data, 'Post edition failed, see errors below');
            });
        }

        /**
         * Delete image
         */
        function deleteImage(id, file, image_id) {

            if(image_id) {
                $http.post('/admin/api/destroy-post-image', {id: id, image_id: image_id}).success(function(res) {
                    var index = vm.post.post_images.indexOf(file);
                    vm.post.post_images.splice(index, 1);
                });
            } else {
                $http.post('/admin/api/destroy-post-image', {id: id }).success(function(res) {
                    vm.post.image = false;
                });
            }
        }

        /**
         * Hide Image
         */
        function hideImage(file) {
            if(file) {
                var index = vm.post.files.indexOf(file);
                vm.post.files.splice(index, 1);
            } else {
                document.getElementById('single-uploader').value = null;
                vm.post.file = false;
            }
        }

        /**
         * Show delete modal
         */
        function showDeleteModal(post) {
            vm.post = post;
            vm.deleteModal = true;
        }

        /**
         * Delete
         */
        function deletePost() {
            Post.delete({id: vm.post.id}, function (res) {
                vm.posts.splice(vm.posts.indexOf(vm.post), 1);
                vm.total = vm.total - 1;
                vm.deleteModal = false;
                vm.flash = res.message;
                $timeout(function () {
                    vm.flash = false;
                }, 3000);
            });
        }

        /**
         * Hide delete modal
         */
        function hideDeleteModal() {
            vm.deleteModal = false;
        }

        /**
         * load more users
         */
        function loadMore(url) {
            $http.get(url).success(function (res) {
                vm.posts = vm.posts.concat(res.data);
                vm.next = res.next_page_url;
            });
        }

        /**
         * Live search
         */
        function liveSearch() {
            $http.post('/admin/api/posts/search', {keyword: vm.search}).success(function (res) {
                vm.posts = res.data;
                vm.total = res.total;
                vm.next = res.next_page_url;
            });
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