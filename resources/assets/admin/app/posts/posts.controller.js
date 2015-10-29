(function() {

    'use strict';

    angular
        .module('app.posts')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['$http', '$state', '$timeout', '$stateParams', 'User', 'File', 'Post'];
    /* @ngInject */
    function PostsController($http, $state, $timeout, $stateParams, User, File, Post) {

        var vm = this;

        vm.post = {
            mainImage: 0
        };
        vm.posts = {};

        vm.create = create;
        vm.setMainImage = setMainImage;
        vm.deleteImage = deleteImage;

        if(! $stateParams.id) { getPosts(); }

        /**
         * Get Posts
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
         * Create Post
         */
        function create() {
            //vm.loading = true;

            var file = File.createMultiple('/upme/api/posts', vm.post, vm.post.image);

            file.then(function (res) {
                console.log(res.data);
            }, function (err) {
                console.log(res.data);
            });

            //Post.save(vm.post, function(res) {
            //    _successResponse(res.message, 'posts')
            //}, function (err) {
            //    _errorResponse(err.data);
            //});
        }

        /**
         * Delete image
         */
        function deleteImage(index) {
            console.log('delete image ' + index);
        }

        /**
         * Set main image
         */
        function setMainImage(index) {
            console.log(vm.post.mainImage);
            vm.post.mainImage = index;
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