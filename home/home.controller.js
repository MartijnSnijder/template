(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
        var vm = this;

         $rootScope.order = [];
         $rootScope.totOrders = 0;
         $rootScope.comments = {};


        $rootScope.getDate = function () {
            var today = new Date();
            var mm = today.getMonth() + 1;
            var dd = today.getDate();
            var yyyy = today.getFullYear();

            var date = dd + "/" + mm + "/" + yyyy;

            return date;
        };

        $rootScope.addToOrder = function (item, qty) {
            console.log($rootScope.order.length + " joe ");
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

        $rootScope.showTables = function (tableName) {
            if(tableName === "A"){
                console.log("Gelukt.. A (tafel id= 1");
                // @TODO ALLE A SECTIE TAFELS LATEN ZIEN..
                $rootScope.tableSelect = 1;
            } else if(tableName === "B"){
                console.log("Gelukt.. B (tafel id= 3");
                // @TODO ALLE B SECTIE TAFELS LATEN ZIEN..
                $rootScope.tableSelect = 3;
            } else if(tableName === "C"){
                console.log("Gelukt.. C (tafel id= 4" );
                // @TODO ALLE C SECTIE TAFELS LATEN ZIEN..
                $rootScope.tableSelect = 4;

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
                tot += (($rootScope.order[i].prijs * $rootScope.order[i].qty) /100)
            }
            return tot;
        };

        $rootScope.clearOrder = function () {
            $rootScope.order = [];
        };

        $rootScope.addToTable = function () {
            alert($rootScope.getDate() + " - Ordernummer: " + ($rootScope.totOrders+1) + "\n\n Toegevoegd aan tafel!");
            $rootScope.postOrder($rootScope.order);
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

        $rootScope.submitComment = function (comment) {
            $rootScope.comments.push(comment);
            return $rootScope.comments;
        };

        var url = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname;

        function initController() {
            // todo init
        }
    }
})();