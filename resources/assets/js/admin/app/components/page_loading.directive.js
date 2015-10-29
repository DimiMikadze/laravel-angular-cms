(function() {

    'use strict';

    angular
        .module('app.components')
        .directive("pageLoading", pageLoading);

    function pageLoading() {
        var directive = {
            restrict: "E",
            scope: {},
            template: "<div class='preloader'><img src='/admin/images/main/preloader.gif' alt='preloader gif'></div>"
        };

        return directive;
    }

}());