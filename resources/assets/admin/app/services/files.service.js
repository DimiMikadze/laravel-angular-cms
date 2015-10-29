(function() {

    'use strict';

    angular
        .module("app.services")
        .factory("File", File);

    /**
     * Files Service
     */
    File.$inject = ['$http', 'Upload'];

    function File($http, Upload) {

        var service = {
            create: create,
            createMultiple: createMultiple,
            update: update,
            remove: remove
        };

        return service;

        /**
         * Create single image with form data
         */
        function create(url, fields, file) {

            var name = Upload.upload({
                url: url,
                method: 'POST',
                fields: fields,
                file: file
            });

            return name;
        }

        /**
         * Create multiple images with form data
         */
        function createMultiple(url, fields, files) {

            var name = Upload.upload({
                url: url,
                method: 'POST',
                fields: fields,
                file: {'file[]' : files}
            });

            return name;
        }

        /**
         * Update single image with form data
         */
        function update(url, fields, file) {

            var name = Upload.upload({
                url: url,
                method: 'POST',
                data: fields,
                fields: fields,
                file: file,
                transformRequest: function (data) {
                    data._method = 'PUT';
                    return data;
                }
            });

            return name;
        }

        /**
         * Remove single image
         */
        function remove(url, id) {
            return $http.post(url, {id: id});
        }

    }

}());