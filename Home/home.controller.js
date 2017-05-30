(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;

        initController();

        $rootScope.favorieten = [{
            id: 15,
            name: "Rode wijn (glas)",
            price: "4"

        }, {
            id: 16,
            name: "Rode wijn (fles)",
            price: "14"
        }, {
            id: 17,
            name: "Koffie verkeerd",
            price: "4.20"
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

        $rootScope.tafels = [{
            id: 11,
            name: "1"
        },
            {
                id: 12,
                name: "2"
            },
            {
                id: 13,
                name: "3"

            }];

        $rootScope.order = [];
        $rootScope.nieuw = {};
        $rootScope.totOrders = 0;
        $rootScope.comments = {};

        $rootScope.getDate = function () {
            var today = new Date();
            var mm = today.getMonth() + 1;
            var dd = today.getDate();
            var yyyy = today.getFullYear();

            var date = dd + "/" + mm + "/" + yyyy;

            return date
        };

        $rootScope.addToOrder = function (item, qty) {
            var flag = 0;
            if ($rootScope.order.length > 0) {
                for (var i = 0; i < $rootScope.order.length; i++) {
                    if (item.id === $rootScope.order[i].id) {
                        item.qty += qty;
                        flag = 1;
                        break;
                    }
                }
                if (flag === 0) {
                    item.qty = 1;
                }
                if (item.qty < 2) {
                    $rootScope.order.push(item);
                }
            } else {
                item.qty = qty;
                $rootScope.order.push(item);
            }
        };

        $rootScope.removeOneEntity = function (item) {
            for (var i = 0; i < $rootScope.order.length; i++) {
                if (item.id === $rootScope.order[i].id) {
                    item.qty -= 1;
                    if (item.qty === 0) {
                        $rootScope.order.splice(i, 1);
                    }
                }
            }
        };

        $rootScope.removeItem = function (item) {
            for (var i = 0; i < $rootScope.order.length; i++) {
                if (item.id === $rootScope.order[i].id) {
                    $rootScope.order.splice(i, 1);
                }
            }
        };

        $rootScope.getTotal = function () {
            var tot = 0;
            for (var i = 0; i < $rootScope.order.length; i++) {
                tot += ($rootScope.order[i].price * $rootScope.order[i].qty)
            }
            return tot;
        };

        $rootScope.clearOrder = function () {
            $rootScope.order = [];
        };

        $rootScope.addToTable = function () {
            alert($rootScope.getDate() + " - Ordernummer: " + ($rootScope.totOrders+1) + "\n\n Toegevoegd aan tafel!");
            $rootScope.order= [];
            $rootScope.totOrders += 1;

        };

        $rootScope.checkout = function (index) {
            alert($rootScope.getDate() + " - Ordernummer: " + ($rootScope.totOrders+1) + "\n\nTotaalbedrag: €" + $rootScope.getTotal().toFixed(2) + "\n\nBetaling ontvangen. Bedankt!");
            $rootScope.order = [];
            $rootScope.totOrders += 1;
        };

        $rootScope.selectTable = function(table){
            //TODO
        };

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

        $rootScope.submitComment = function (comment) {
            $rootScope.comments.push(comment);
            return $rootScope.comments;
        };

        var url = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname;

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

        function deleteUser(id) {
            UserService.Delete(id)
                .then(function () {
                    loadAllUsers();
                });
        }
    }
})();