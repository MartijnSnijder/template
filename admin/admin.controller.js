/**
 * Created by Martijn on 31-5-2017.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['UserService', '$rootScope', 'FlashService'];
    function AdminController(UserService, $rootScope, FlashService) {

        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        $rootScope.addNewItem = function (item) {
            if (item.category === "Dranken") {
                item.id = $rootScope.dranken.length + $rootScope.eten.length;
                $rootScope.dranken.push(item);
                $rootScope.nieuw = [];
                $('#myTab').find('a[href="#dranken"]').tab('show')
            } else if (item.category === "Eten") {
                item.id = $rootScope.eten.length + $rootScope.eten.length;
                $rootScope.eten.push(item);
                $rootScope.nieuw = [];
                $('#myTab').find('a[href="#eten"]').tab('show')
            } else if(item.category === "favorieten"){
                item.id = $rootScope.favorieten.length + $rootScope.eten.length;
                $rootScope.favorieten.push(item);
                $rootScope.nieuw = [];
            }
        };


        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id, $timeout) {
            if (id === vm.user.id) {
                FlashService.Error('Je kan jezelf niet verwijderen', false);
            }
            else{
                UserService.Delete(id)
                    .then(function () {
                        loadAllUsers();
                    });
            }
        }
    }
})();