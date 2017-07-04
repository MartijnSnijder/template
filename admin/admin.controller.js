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

            // price should be higher than zero
            if(item.prijs > 0) {

                // when price in euros instead of cents (2.30 instead of 230)
                //@ TODO replace comma with '' (replace function)
                if (item.prijs % 1 !== 0) {
                    item.prijs = Math.round(item.prijs * 100);
                }

                item.subcategorieen_id = 1;

                item.cafe_id = $rootScope.currentUser.cafe_id;

                console.log(JSON.stringify(item));
                $rootScope.postProduct(item);

                console.log("nu kan het wel.." + $rootScope.currentUser.cafe_id);

            }
        };

        $rootScope.removeItem = function (item) {
            console.log(JSON.stringify(item));
            var data;
            //@TODO REMOVE ITEM
            //return $http.post('http://localhost:3000/producten/verwijderen', data ).then(postSuccess(), postFail());
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
           /* console.log("Nu de medewerkers laden..");
            var cafe_id = $rootScope.currentUser.cafe_id;
            console.log("de id: " + cafe_id);
            $rootScope.getCafeUsers($rootScope.currentUser.cafe_id);*/

            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        $rootScope.addNewUser= function(user) {
            console.log(JSON.stringify(user));

            // change rights to the correct type
            if(user.rechten === "Personeel"){
                user.rechten = "cafeUser";
            } else if(user.rechten === "Administrator"){
                user.rechten = "cafeAdmin"
            }

            // ADD CAFE ID
            user.cafe_id = $rootScope.currentUser.cafe_id;

            console.log("nu is het: " + JSON.stringify(user));

            //post
            $rootScope.postUser(user);
        };

        function deleteUser(id) {
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