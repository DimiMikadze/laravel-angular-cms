(function() {

    'use strict';

    angular
        .module('app', [
            'app.core',
            'app.filters',
            'app.router',
            'app.components',
            'app.services',

            'app.login',
            'app.profile',
            'app.dashboard',
            'app.users',
            'app.posts',
            'app.gallery'
        ]);

}());
(function() {

    'use strict';

    angular
        .module('app.core', [
            'ui.router',
            'ngResource'
        ]);

}());
(function() {

    'use strict';

    angular
        .module('app.components', []);

}());
(function() {

    'use strict';

    angular
        .module('app.dashboard', [
            'app.core'
        ]);

}());
(function() {

    'use strict';

    angular
        .module('app.filters', []);

}());
(function() {

    'use strict';

    angular
        .module('app.login', [
            'app.core'
        ]);

}());
(function() {

    'use strict';

    angular
        .module('app.gallery', [
            'app.core'
        ]);

}());
(function() {

    'use strict';

    angular
        .module('app.posts', [
            'app.core',
            'textAngular'
        ]);

}());
(function() {

    'use strict';

    angular
        .module('app.profile', [
            'app.core'
        ]);

}());
(function() {

    'use strict';

    angular
        .module('app.router', [
            'ui.router'
        ]);

}());
(function() {

    'use strict';

    angular
        .module('app.services', [
            'app.core'
        ]);

}());
(function() {

    'use strict';

    angular
        .module('app.users', [
            'app.core'
        ]);

}());
(function() {

    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    function appRun(routerHelper) {
        var otherwise = '/admin/404';
        routerHelper.configureStates(getStates(), otherwise);
    }
    appRun.$inject = ["routerHelper"];

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/admin/404',
                    templateUrl: '/admin/views/admin.error.index'
                }
            }
        ];
    }

}());
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
(function() {

    'use strict';

    angular
        .module("app.dashboard")
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$http'];
    /* @nginject */
    function DashboardController($http) {

        var vm = this;
        vm.getData = getData;

        getData();

        /**
         * Get Data
         */
        function getData() {
            $http.get('/admin/api/dashboard').success(function(res) {
                vm.users_count      = res.users_count;
                vm.posts_count      = res.posts_count;
                vm.galleries_count  = res.galleries_count;
                vm.ready = true;
            });
        }
    }

}());

(function() {

    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/admin/dashboard',
                    templateUrl: '/admin/views/admin.dashboard.index',
                    controller: 'DashboardController',
                    controllerAs: 'vm',
                    title: 'Dashboard'
                }
            }
        ];
    }
})();
(function() {

    'use strict';

    angular
        .module('app.filters')
        .filter('roles', roles);

    function roles() {
        return function(role) {
            var roleWords = ['Not Auth', 'Auth', 'Admin', 'Super Admin', 'Owner'];

            return roleWords[role];
        }
    }

}());
(function() {

    'use strict';

    angular
        .module("app.login")
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$http', '$window'];
    /* @nginject */
    function LoginController($http, $window) {

        var vm = this;

        vm.user = {};
        vm.login = login;

        /**
         * Login
         */
        function login() {
            $http.post('/admin/login', {user: vm.user})
                .success(function (res) {
                    $window.location.href = '/admin/dashboard';
                })
                .error(function(res) {
                    vm.error = res;
                });
        }

    }

}());

(function() {

    'use strict';

    angular
        .module('app.login')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'login',
                config: {
                    url: '/admin/login',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'Login'
                }
            }
        ];
    }
})();
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
                    vm.gallery.image = false;
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
                vm.gallery.file = false;
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
(function() {

    'use strict';

    angular
        .module('app.gallery')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'gallery',
                config: {
                    url: '/admin/gallery',
                    templateUrl: '/admin/views/admin.gallery.index',
                    controller: 'GalleryController',
                    controllerAs: 'vm',
                    title: 'Gallery'
                }
            },
            {
                state: 'gallery-create',
                config: {
                    url: '/admin/gallery/create',
                    templateUrl: '/admin/views/admin.gallery.create',
                    controller: 'GalleryController',
                    controllerAs: 'vm',
                    title: 'Create Gallery'
                }
            },
            {
                state: 'gallery-edit',
                config: {
                    url: '/admin/gallery/:id/edit',
                    templateUrl: '/admin/views/admin.gallery.edit',
                    controller: 'GalleryController',
                    controllerAs: 'vm',
                    title: 'Edit Gallery'
                }
            }
        ];
    }
})();
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
(function() {

    'use strict';

    angular
        .module('app.posts')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'posts',
                config: {
                    url: '/admin/posts',
                    templateUrl: '/admin/views/admin.posts.index',
                    controller: 'PostsController',
                    controllerAs: 'vm',
                    title: 'Posts'
                }
            },
            {
                state: 'post-create',
                config: {
                    url: '/admin/posts/create',
                    templateUrl: '/admin/views/admin.posts.create',
                    controller: 'PostsController',
                    controllerAs: 'vm',
                    title: 'Create Post'
                }
            },
            {
                state: 'post-edit',
                config: {
                    url: '/admin/posts/:id/edit',
                    templateUrl: '/admin/views/admin.posts.edit',
                    controller: 'PostsController',
                    controllerAs: 'vm',
                    title: 'Edit Post'
                }
            }
        ];
    }
})();
(function() {

    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$http', '$timeout', 'User', 'AuthUser'];
    /* @ngInject */
    function ProfileController($http, $timeout, User, AuthUser) {

        var vm = this;

        vm.authuser = {};

        vm.update = update;
        vm.deleteImage = deleteImage;
        vm.hideImage = hideImage;
        authUser();

        /**
         * Auth user
         */
        function authUser() {
            AuthUser.get().success(function(res) {
                vm.authUser = res;
                vm.ready = true;
            });
        }

        /**
         * update
         */
        function update() {

            vm.loading = true;

            User.update({id: vm.authUser.id}, vm.authUser, function (res) {
                _successResponse(res.message);
            }, function (err) {
                _errorResponse(err.data, 'User edition failed, see errors below');
            });
        }

        /**
         * Delete image
         */
        function deleteImage(id) {
            $http.post('/admin/api/destroy-user-image', {id: id}).success(function(res) {
                vm.authUser.image = false;
            });
        }

        /**
         * Hide image
         */
        function hideImage() {
            vm.authUser.file = false;
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
(function() {

    'use strict';

    angular
        .module('app.profile')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'profile',
                config: {
                    url: '/admin/profile',
                    templateUrl: '/admin/views/admin.profile.index',
                    controller: 'ProfileController',
                    controllerAs: 'vm',
                    title: 'My Profile'
                }
            }
        ];
    }
})();
/* Help configure the state-base ui.router */
(function() {

    'use strict';

    angular
        .module('app.router')
        .provider('routerHelper', routerHelperProvider);

    routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        var config = {
            docTitle: 'Admin',
            resolveAlways: {}
        };

        $locationProvider.html5Mode(true);

        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = RouterHelper;
        RouterHelper.$inject = ['$location', '$rootScope', '$state'];
        /* @ngInject */
        function RouterHelper($location, $rootScope, $state, logger) {
            var handlingStateChangeError = false;
            var hasOtherwise = false;
            var stateCounts = {
                errors: 0,
                changes: 0
            };

            var service = {
                configureStates: configureStates,
                getStates: getStates,
                stateCounts: stateCounts
            };

            init();

            return service;

            function configureStates(states, otherwisePath) {
                states.forEach(function(state) {
                    state.config.resolve =
                        angular.extend(state.config.resolve || {}, config.resolveAlways);
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function handleRoutingErrors() {
                // Route cancellation:
                // On routing error, go to the dashboard.
                // Provide an exit clause if it tries to do it twice.
                $rootScope.$on('$stateChangeError',
                    function(event, toState, toParams, fromState, fromParams, error) {
                        if (handlingStateChangeError) {
                            return;
                        }
                        stateCounts.errors++;
                        handlingStateChangeError = true;
                        var destination = (toState &&
                            (toState.title || toState.name || toState.loadedTemplateUrl)) ||
                            'unknown target';
                        var msg = 'Error routing to ' + destination + '. ' +
                            (error.data || '') + '. <br/>' + (error.statusText || '') +
                            ': ' + (error.status || '');
                        logger.warning(msg, [toState]);
                        $location.path('/');
                    }
                );
            }

            function init() {
                handleRoutingErrors();
                updateDocTitle();
            }

            function getStates() { return $state.get(); }

            function updateDocTitle() {
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams) {
                        stateCounts.changes++;
                        handlingStateChangeError = false;
                        var title = (toState.title || '') + ' · ' + config.docTitle;
                        $rootScope.mainUrl = $state.current.url.split('/')[2];
                        $rootScope.title = title; // data bind to <title>
                    }
                );
            }
        }
    }

})();
(function() {

    'use strict';

    angular
        .module("app.services")
        .factory("AuthUser", AuthUser);

    AuthUser.$inject = ['$http'];
    /* @ngInject */
    function AuthUser($http) {
        var service = {
            get: get
        };

        return service;

        function get() {
            return $http.get('/admin/api/auth-user');
        }
    }

}());
(function() {

    'use strict';

    angular
        .module("app.gallery")
        .factory("Gallery", Gallery);

    Gallery.$inject = ['$resource'];
    /* @ngInject */
    function Gallery($resource) {
        return $resource('/admin/api/gallery/:id', {id: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    }

}());
(function() {

    'use strict';

    angular
        .module("app.services")
        .factory("Post", Post);

    Post.$inject = ['$resource'];
    /* @ngInject */
    function Post($resource) {
        return $resource('/admin/api/posts/:id', {id: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    }

}());
(function() {

    'use strict';

    angular
        .module("app.services")
        .factory("User", User);

    User.$inject = ['$resource'];
    /* @ngInject */
    function User($resource) {
        return $resource('/admin/api/users/:id', {id: '@_id'}, {
            update: {
                method: 'PUT'
            }
        });
    }

}());
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
                _successResponse(res.message)
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

            if (vm.user.image) {
                var file = File.create('/upme/api/users', vm.user, vm.user.image);

                file.then(function (res) {
                    _successResponse(res.data.message, 'users')
                }, function (err) {
                    _errorResponse(err.data);
                });
            } else {
                User.save(vm.user, function (res) {
                    _successResponse(res.message, 'users')
                }, function (err) {
                    _errorResponse(err.data);
                });
            }

            User.update({id: vm.user.id}, vm.user, function (res) {
                _successResponse(res.message)
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
                vm.user.image = false;
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
(function() {

    'use strict';

    angular
        .module('app.users')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'users',
                config: {
                    url: '/admin/users',
                    templateUrl: '/admin/views/admin.users.index',
                    controller: 'UsersController',
                    controllerAs: 'vm',
                    title: 'Users'
                }
            },
            {
                state: 'user-create',
                config: {
                    url: '/admin/users/create',
                    templateUrl: '/admin/views/admin.users.create',
                    controller: 'UsersController',
                    controllerAs: 'vm',
                    title: 'Create User'
                }
            },
            {
                state: 'user-edit',
                config: {
                    url: '/admin/users/:id/edit',
                    templateUrl: '/admin/views/admin.users.edit',
                    controller: 'UsersController',
                    controllerAs: 'vm',
                    title: 'Edit User'
                }
            }
        ];
    }
})();