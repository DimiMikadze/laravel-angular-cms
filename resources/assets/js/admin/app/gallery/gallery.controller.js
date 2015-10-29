(function() {

    'use strict';

    angular
        .module('app.gallery')
        .controller('GalleryController', GalleryController);

    GalleryController.$inject = ['$http', '$timeout', '$stateParams', 'Gallery'];
    /* @ngInject */
    function GalleryController($http, $timeout, $stateParams, Gallery) {

        var vm = this;

        vm.galleries = {};
        vm.gallery = {};

        vm.create = create;
        vm.update = update;
        vm.deleteGallery = deleteGallery;
        vm.hideImage = hideImage;
        vm.showDeleteModal = showDeleteModal;
        vm.hideDeleteModal = hideDeleteModal;
        vm.deleteImage = deleteImage;
        vm.liveSearch = liveSearch;
        vm.loadMore = loadMore;

        if(! $stateParams.id) { getGalleries(); }
        if($stateParams.id) { getGallery(); }

        /**
         * Get all
         */
        function getGalleries() {
            Gallery.get(function (res) {
                vm.galleries = res.data;
                vm.total = res.total;
                vm.next = res.next_page_url;
                vm.ready = true;
            });
        }

        /**
         * find by id
         */
        function getGallery() {
            vm.gallery = Gallery.get({id: $stateParams.id}, function() {
                vm.ready = true;
                vm.gallery.date = new Date(vm.gallery.date);
            });
        }

        /**
         * Create
         */
        function create() {
            vm.loading = true;

            Gallery.save(vm.gallery, function(res) {
                _successResponse(res.message);
                vm.gallery = '';
            }, function (err) {
                _errorResponse(err.data, 'Gallery creation failed, see errors below');
            });
        }

        /**
         * Update
         */
        function update() {
            vm.loading = true;

            Gallery.update({id: vm.gallery.id}, vm.gallery, function (res) {
                _successResponse(res.message);
            }, function (err) {
                _errorResponse(err.data, 'Gallery edition failed, see errors below');
            });
        }

        /**
         * Delete image
         */
        function deleteImage(id, file, image_id) {

            if(image_id) {
                $http.post('/admin/api/destroy-gallery-image', {id: id, image_id: image_id}).success(function(res) {
                    var index = vm.gallery.gallery_images.indexOf(file);
                    vm.gallery.gallery_images.splice(index, 1);
                });
            } else {
                $http.post('/admin/api/destroy-gallery-image', {id: id }).success(function(res) {
                    vm.gallery.image = null;
                });
            }
        }

        /**
         * Hide Image
         */
        function hideImage(file) {
            if(file) {
                var index = vm.gallery.files.indexOf(file);
                vm.gallery.files.splice(index, 1);
            } else {
                document.getElementById('single-uploader').value = null;
                vm.gallery.file = null;
            }
        }

        /**
         * Show delete modal
         */
        function showDeleteModal(gallery) {
            vm.gallery = gallery;
            vm.deleteModal = true;
        }

        /**
         * Delete
         */
        function deleteGallery() {
            Gallery.delete({id: vm.gallery.id}, function (res) {
                vm.galleries.splice(vm.galleries.indexOf(vm.gallery), 1);
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
         * load more
         */
        function loadMore(url) {
            $http.get(url).success(function (res) {
                vm.galleries = vm.galleries.concat(res.data);
                vm.next = res.next_page_url;
            });
        }

        /**
         * Live search
         */
        function liveSearch() {
            $http.post('/admin/api/gallery/search', {keyword: vm.search}).success(function (res) {
                vm.galleries = res.data;
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