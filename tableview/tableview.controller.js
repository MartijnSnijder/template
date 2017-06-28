/**
 * Created by r_fli on 29-5-2017.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('tableViewController', tableViewController);

    tableViewController.$inject = ['$rootScope', '$http'];
    function tableViewController($rootScope, $http) {
        var vm = this;

        // DATA Collection
        $rootScope.tafels = [];
        $rootScope.product_view = [];
        $rootScope.currentTableProducts = [];
        //DB filler
        $rootScope.Fill = function () {

            /*if($rootScope.tafels.length === 0 && $rootScope.product_orders.length === 0){*/
            $rootScope.getter("tafels");

            $rootScope.getter("product_view");
        };

        //LOCALHOST GETTEN
        $rootScope.getter = function(table) {
            console.log("getter");
            return $http.get('http://localhost:3000/api/' + table).then(function (res) {
                handleSuccess(table, res);
            }, handleError('Error bij getten..'));
        };

        // If connection succesfull
        function handleSuccess(table, res) {
            console.log("nu ben ik: " + table);

            if(table === "tafels"){
                $rootScope.tafels = res.data;
                console.log("Joe")

            }

            if(table === "product_view"){
                $rootScope.product_view = res.data;
                console.log("xx")
            }

            console.log(res.data);
            return res.data;
        }

        // If connection Error
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

        // variable current table name
        $rootScope.currentTable = "";

        // gets the table ID when button is clicked and changes currentTable
        $rootScope.getTable = function (tableNaam) {
            $rootScope.currentTable = tableNaam;
        };


        $rootScope.addToList = function(tableNaam){

            $rootScope.product_view.forEach(function(object){
               if(object.tafel_naam === tableNaam){
                   $rootScope.currentTableProducts.push(object);
               }
            });

        };






        // returns the index corresponding to the tableID.
        //@TODO optimize it by checking if > or < than number..
        //@TODO now it checks from 1>>
        $rootScope.findIndexArray= function(tableNaam){
            var arrayIndex = 0;
            for (var x = 0; x < $rootScope.tafels.length ; x++) {
                if ($rootScope.tafels[x].naam === tableNaam) {
                    console.log("x = " + x);
                    return x;

                }
            }
            return arrayIndex;
        };


        $rootScope.findOrderProductIndex = function(arrayIndex, productname){
            for (var i = 0; i < $rootScope.tables[arrayindex].order.length; i++){
                if(productname === $rootScope.tables[arrayIndex].order[i].name){
                    return i;
                }
            }

        };

        // get total needs table id // place in the array to show correct table totalprice
        // @TODO FIXEN GODVERDOMME
        /*$rootScope.getTotal = function (tableNaam) {
            var tot = 0;
            // if no table is selected then the tableID will be 0.
            if(table !== 0) {
                var arrayIndex = $rootScope.findIndexArray(tableNaam);

                // Calculate the total amount of the order
                for (var i = 0; i < $rootScope.tables[arrayIndex].order.length; i++) {
                    tot += ($rootScope.tables[arrayIndex].order[i].price * $rootScope.tables[arrayIndex].order[i].qty)
                }
            }
            return tot;
        };*/

        $rootScope.changeOrderQty= function(tableNaam, productname, qty){
            var arrayIndex = $rootScope.findIndexArray(tableNaam);
            var order = $rootScope.tables[arrayIndex].order[$rootScope.findOrderProductIndex(arrayIndex,productname)].name;
            console.log(order);
            console.log("joe");
            console.log(arrayIndex);
            if(qty === -1){
                console.log(order + "twice");
                order.qty = order.qty -1;
                console.log(order + "new");
            } else if(qty === 1){
                order.qty = order.qty +1;
                console.log(order + "new");
            }
        };


        $rootScope.popupClearOrder = function(currentTable){
            if(confirm("-- Weet u zeker dat u de bestelling van tafel " + currentTable + " wilt annuleren?")){
                $rootScope.clearOrder(currentTable);
            }

        };

        // clear the entire order from the currentTable
        $rootScope.clearOrder = function (currentTable) {
            var arrayIndex = $rootScope.findIndexArray(currentTable);
            var order= $rootScope.tables[arrayIndex].order;

            // only clear order when order has items
            if(order.length > 0) {
                $rootScope.tables[arrayIndex].order = [];
            }
        };

        //@TODO checkout function
        /*$rootScope.checkout = function (index) {
         alert($rootScope.getDate() + " - Ordernummer: " + ($rootScope.totOrders+1) + "\n\nTotaalbedrag: €" + $rootScope.getTotal().toFixed(2) + "\n\nBetaling ontvangen. Bedankt!");
         $rootScope.order = [];
         $rootScope.totOrders += 1;
         };*/

        //DONT REMOVE THIS IT WILL DESTROY EVERYTHING
        function initController() {
            // todo init
        }
    }
})();