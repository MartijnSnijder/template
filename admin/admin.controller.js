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

                item.categorie = item.categorie.toLocaleLowerCase();

                item.cafe_id = 1;

                console.log(JSON.stringify(item));
                $rootScope.postProduct(item, "producten");

            }
        };

        $rootScope.removeItem = function (item) {
            console.log(JSON.stringify(item));

            //@TODO REMOVE ITEM

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

        // @TODO cafe_id must be current user cafe_id
        $rootScope.addNewUser= function(user) {
            console.log(JSON.stringify(user));

            // change rights to the correct type
            if(user.rechten === "Personeel"){
                user.rechten = "cafeUser";
            } else if(user.rechten === "Administrator"){
                user.rechten = "cafeAdmin"
            }

            // ADD CAFE ID
            user.cafe_id = 1;


            console.log("nu is het: " + JSON.stringify(user));

            //post
            $rootScope.postProduct(user, 'gebruikers');
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