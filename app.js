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

        // ARRAYS
        $rootScope.tafels = [];
        $rootScope.producten = [];
        $rootScope.product_view = [];
        $rootScope.currentUser = {};

        //DB filler
        $rootScope.Fill = function () {
            $rootScope.getter("tafels");
            $rootScope.getter("product_view");
            $rootScope.getter("producten");

        };

        //LOCALHOST GETTEN
        $rootScope.getter = function (table) {

            console.log("getter");
            return $http.get('http://localhost:3000/api/' + table).then(function (res) {
                handleSuccess(table, res);
            }, handleError('Error bij getten..'));
        };

        // If connection succesfull
        function handleSuccess(table, res) {
            console.log("nu ben ik: " + table);

            if (table === "producten") {
                console.log(table);
                $rootScope.producten = res.data;
            }

            if (table === "tafels") {
                console.log(table);
                $rootScope.tafels = res.data;
            }

            if (table === "product_view") {
                console.log(table);
                $rootScope.product_view = res.data;
            }

            console.log(res.data);
            return res.data;
        }

        // If connection Error
        function handleError(error) {
            return function () {
                return {success: false, message: error};
            };
        }


        $rootScope.postProduct = function (data) {
            var urr = 'http://localhost:3000/api/producten/toevoegen';
            data = JSON.stringify(data);

            // make sure there is data to post, otherwise server will crash
            if(data.length > 0) {
                return $http.post(urr, data).then(postSuccess).catch(postFail);
            }

        };

        $rootScope.postUser = function (data) {
            var urr = 'http://localhost:3000/api/gebruikers/toevoegen';
            data = JSON.stringify(data);

            // make sure there is data to post, otherwise server will crash
            if(data.length > 0) {
                return $http.post(urr, data).then(postSuccess).catch(postFail);
            }

        };



        //  gets the rights & cafe_id (getUserData already used..)
        $rootScope.getUserDat = function (username) {
            var urr = 'http://localhost:3000/api/gebruikers/currentuser';
            var data = {username: username};
            //data = JSON.stringify(data);
            console.log(data);

            return $http.post(urr, data).then(getUserSuccess).catch(postFail);
        };

        // gets the users from current user cafe_id
        $rootScope.getCafeUsers = function (cafe_id) {
            console.log("dit is de cafe-id: " + cafe_id);
            var urr = 'http://localhost:3000/api/gebruikers/getCafeUsers';
            var data = {cafeID: cafe_id};
            //data = JSON.stringify(data);
            console.log(data);

            return $http.post(urr, data).then(getCafeUserSuccess).catch(postFail);
        };


        // Specific function for the user data
        function getUserSuccess(response) {
            console.log(JSON.stringify(response));
            $rootScope.currentUser = response.data;
            console.log("de huidige user heeft: " + JSON.stringify($rootScope.currentUser));
            console.log("proberen: " + JSON.stringify($rootScope.currentUser.cafe_id));
            }

        function getCafeUserSuccess(response) {
            console.log(JSON.stringify(response));
            $rootScope.cafeUsers = response.data;
            console.log("Het huidige cafe heeft: " + JSON.stringify($rootScope.cafeUsers));
        }

        // General succes notice
        function postSuccess(response) {
            console.log("dit is de response: " + response);
            console.log(response.status);
            console.log("Gelukt!");

            return response.data;
        }
        // General fail notice
        function postFail(error) {
            console.log(error.data);
            console.log("Ehm foutje");
        }


    }
})();