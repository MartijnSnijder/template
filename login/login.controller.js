/**
 * Created by Martijn on 30-5-2017.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
    function LoginController($location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            console.log(vm.username + " ::: " + vm.password);
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                console.log("auth service komt wel terug");
                console.log(response);
                if (response.success) {
                    console.log("doe iets gvd");
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/');
                } else {
                    FlashService.Error("Gebruikersnaam en/of wachtwoord is incorrect. Probeer opnieuw.");
                    vm.dataLoading = false;
                }
            });
        }
    }

})();