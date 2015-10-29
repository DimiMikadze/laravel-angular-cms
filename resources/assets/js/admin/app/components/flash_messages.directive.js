(function() {

    'use strict';

    angular
        .module('app.components')
        .directive("flashMessage", flashMessage);

    function flashMessage() {
        var directive = {
            restrict: "E",
            templateUrl: '/admin/views/admin.angular_components.flash_messages'
        };

        return directive;
    }

}());
