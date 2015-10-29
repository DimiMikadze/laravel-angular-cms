(function() {

    'use strict';

    angular
        .module('app.components')
        .directive("fileread", fileread);

    fileread.$inject = ['$parse'];
    /* @ngInject */
    function fileread($parse) {
        var directive = {
            restrict: "A",
            scope: {
                fileread: '='
            },
            link: link
        };

        return directive;

        function link(scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var file = changeEvent.target.files[0];

                var reader = new FileReader();
                reader.onload = function (loadEvent) {

                    var isImage = file.type.substring(0,5) === 'image';

                    scope.fileread = {
                        url: loadEvent.target.result,
                        size: file.size,
                        type: file.type,
                        name: file.name,
                        isImage: isImage
                    };

                    scope.$apply();
                };
                reader.readAsDataURL(file);

            });
        }
    }

}());