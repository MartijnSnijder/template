(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/admin', {
                controller: 'AdminController',
                templateUrl: 'admin/admin.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })

            .when('/tableview',{
                controller: 'tableViewController',
                templateUrl: 'tableview/tableview.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
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

            //function to show navbar tab or set it active, based on location
        $rootScope.isActive = function (viewLocation) {
            return viewLocation === $location.url();
        };

        $rootScope.favorieten = [{
            id: 4,
            name: "Thee",
            price: "1.90"
        },
            {
                id: 5,
                name: "Koffie",
                price: "2.00"
            },
            {
                id: 6,
                name: "Bier",
                price: "2.40"
            },
            {
                id: 8,
                name: "Tosti",
                price: "1.50"
            }

        ];

        $rootScope.dranken = [{
            id: 0,
            name: "Cola",
            price: "1.50"
        },
            {
                id: 1,
                name: "Sinas",
                price: "1.50"
            },
            {
                id: 2,
                name: "Espresso",
                price: "2.50"
            },
            {
                id: 3,
                name: "Cappuccino",
                price: "2.50"
            },
            {
                id: 4,
                name: "Thee",
                price: "1.90"
            },
            {
                id: 5,
                name: "Koffie",
                price: "2.00"
            },
            {
                id: 6,
                name: "Bier",
                price: "2.40"
            },
            {
                id: 7,
                name: "Radler",
                price: "2.70"
            }];

        $rootScope.eten = [{
            id: 8,
            name: "Tosti",
            price: "1.50"
        },
            {
                id: 9,
                name: "Taart",
                price: "1.30"
            },
            {
                id: 10,
                name: "Nacho's",
                price: "1.70"
            }];

        $rootScope.nieuw = {};
    }
})();