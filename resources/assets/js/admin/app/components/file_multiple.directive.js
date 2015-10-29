(function() {

    'use strict';

    angular
        .module('app.components')
        .directive("filereadMultiple", filereadMultiple);

    filereadMultiple.$inject = ['$parse'];
    /* @ngInject */
    function filereadMultiple($parse) {
        var directive = {
            restrict: "A",
            scope: {
                filereadMultiple: '='
            },
            link: link
        };

        return directive;

        function link(scope, element, attributes) {
            element.bind("change", function (changeEvent) {
                var files = changeEvent.target.files;
                scope.filereadMultiple = [];
                for(var i=0; i<files.length; i++) {
                    (function(file) {
                        var reader = new FileReader();
                        reader.onload = function (loadEvent) {

                            var isImage = file.type.substring(0,5) === 'image';

                            scope.filereadMultiple.push({
                                url: loadEvent.target.result,
                                size: file.size,
                                type: file.type,
                                name: file.name,
                                isImage: isImage
                            });

                            scope.$apply();
                        };
                        reader.readAsDataURL(file);
                    }(files[i]));
                }
            });
        }
    }

}());