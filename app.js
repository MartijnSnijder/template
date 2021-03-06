﻿(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'angular.filter'])
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
        // keeps user CafeID
        $rootScope.userCafeID = $cookies.get('userCafeID') || {} ;

        // keeps cafeEmployees
        $rootScope.cafeUsers = $cookies.get('cafeUsers') || {} ;


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
        $rootScope.currentUser = [];

        //DB filler
        $rootScope.Fill = function () {
            // first empty them
            $rootScope.producten = [];
            $rootScope.tafels = [];
            $rootScope.product_view = [];
            $rootScope.categorieen = [];

            // then fill
            $rootScope.getter("tafels");
            $rootScope.getter("product_view");
            $rootScope.getter("producten");
            $rootScope.getter("subcategorieen");
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

            if (table === "subcategorieen") {
                console.log(table);
                $rootScope.categorieen = res.data;
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


        $rootScope.postOrder = function (data) {
            var urr = 'http://localhost:3000/api/new/order';
            console.log(JSON.stringify(data));

            var orderPost = {};
            orderPost.tafel_id = $rootScope.tableSelect; // @TODO uit order trekken;
            orderPost.comment = "Opmerking";
            orderPost.producten = data;


            console.log(JSON.stringify(orderPost));
            // orderPost.qty = data.qty;order_id,product_id,aantal
            $http.post(urr, orderPost).then(postSuccess).catch(postFail);
            $rootScope.getter("tafels");

        };


        $rootScope.deleteProduct = function (data) {
            var urr = 'http://localhost:3000/api/producten/verwijderen';
            console.log(JSON.stringify(data));
            data = JSON.stringify(data);

            var productDelete = {};
            productDelete.product_id = data;


            $http.post('http://localhost:3000/producten/verwijderen', data ).then(postSuccess(), postFail());
        };


        // creates new product in current cafeID
        $rootScope.postProduct = function (data) {
            var urr = 'http://localhost:3000/api/producten/toevoegen';
            data = JSON.stringify(data);

            // make sure there is data to post, otherwise server will crash
            if(data.length > 0) {
                return $http.post(urr, data).then(postSuccess).catch(postFail);
            }

        };


        // creates new user in the current cafeID
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
            console.log(data);

            return $http.post(urr, data).then(getUserSuccess).catch(postFail);
        };

        // gets the users from current user cafe_id
        $rootScope.getCafeUsers = function (cafe_id) {
            var urr = 'http://localhost:3000/api/gebruikers/getCafeUsers';
            var data = {cafeID: cafe_id};
            console.log(data);

            return $http.post(urr, data).then(getCafeUserSuccess).catch(postFail);
        };

        // finalizes the order
        $rootScope.finishOrder = function (tafel_id) {
            var urr = 'http://localhost:3000/api/update/order/betaald';
            var data = {tafelID: tafel_id};
            console.log(data);

            return $http.post(urr, data).then(postSuccess).catch(postFail);
        };

        // cancels the order
        $rootScope.cancelOrder = function (tafel_id) {
            console.log("dit is de order-id: " + tafel_id);
            var urr = 'http://localhost:3000/api/update/order/annuleren';
            var data = {tafelID: tafel_id};
            console.log(data);

            return $http.post(urr, data).then(postSuccess).catch(postFail);
        };


        // Specific function for the user data
        function getUserSuccess(response) {
            console.log(JSON.stringify(response));
            var currentUser = response.data;
            $rootScope.userID = currentUser[0].id;
            $rootScope.userRights = currentUser[0].rechten;
            $rootScope.userCafeID = currentUser[0].cafe_id;

            //chain reaction, load employees..
            console.log("Nu de medewerkers laden..");
             $rootScope.getCafeUsers($rootScope.userCafeID);

            }

        function getCafeUserSuccess(response) {
            console.log(JSON.stringify(response));
            $rootScope.cafeUsers = JSON.stringify(response.data);
            console.log("Het huidige cafe heeft: " + $rootScope.cafeUsers);
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