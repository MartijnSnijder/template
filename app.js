(function () {
    'use strict';

    angular
        .module('MyApp', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'PosController',
                templateUrl: 'Home/home.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'Login/login.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'Register.register.html',
                controllerAs: 'vm'
            })
            .when('/dashboard', {
                controller: 'DashboardController',
                templateUrl: 'Dashboard.dashboard.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }

})();
