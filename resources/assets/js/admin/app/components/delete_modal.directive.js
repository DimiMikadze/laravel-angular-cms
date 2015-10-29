(function() {

    'use strict';

    angular
        .module('app.components')
        .directive("deleteModal", deleteModal);
    
    function deleteModal() {
        var directive = {
            restrict: "A",
            scope: {
                cancel: "&",
                delete: "&"
            },
            templateUrl: "/admin/views/admin.angular_components.modal"
        };

        return directive;
    }

}());