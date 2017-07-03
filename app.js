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

            /*if(table === "eten"){
             console.log(table);
             $rootScope.eten = res.data;
             }


             if(table === "drinken"){
             console.log(table);
             $rootScope.drinken = res.data;
             }*/

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

        /*$rootScope.data = {naam: 'Gouden carolus', prijs: 240, type: 'drinken', cafe_id: 1};
*/

        $rootScope.poster = function () {
            console.log("Ik ben uitgevoerd...");

            /*var req = {
             method: 'POST',
             url: 'http://localhost:3000/api/producten',
             headers: {
             'Content-Type': undefined
             },
             data: {naam: 'test', prijs: 230, type: 'drinken'}
             };*!/
             return $http.post('http://localhost:3000/api/producten' , {naam: 'test', prijs: 230, type: 'drinken'},{
             headers : {
             'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
             }).then()
             };*/

            var urr = 'http://localhost:3000/api/producten';
            var data = {naam: 'Bax Bier', prijs: 290, barcode: null, type: 'drinken', cafe_id: 2};
            data = JSON.stringify(data);

            $http.post(urr, data).then(postFail(), postSuccess());


            function postFail() {
                console.log("joe");
            }

            function postSuccess() {
                console.log("ohoh");
            }

        }

    }
})();