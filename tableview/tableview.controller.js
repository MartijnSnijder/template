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

        /*        $rootScope.tables = [{
         id: 1,
         name: "A-1",
         order: []

         }, {
         id: 2,
         name: "A-2",
         order: []
         }, {
         id: 3,
         name: "A-3",
         order: []
         }, {
         id: 4,
         name: "A-4",
         order: []
         }, {
         id: 5,
         name: "A-5",
         order: []
         },{
         id: 6,
         name: "A-6",
         order: []
         },{
         id: 7,
         name: "B-1",
         order: [{
         name: "koffie",
         price: "2",
         qty: "4"
         },{
         name:"thee",
         price:"3",
         qty: "8"
         }

         ]

         }, {
         id: 8,
         name: "B-2",
         order: [{
         name: "BIER",
         price: "2",
         qty: "25"
         }]
         }, {
         id: 9,
         name: "B-3",
         order: []
         }, {
         id: 10,
         name: "B-4",
         order: []
         }, {
         id: 11,
         name: "B-5",
         order: []
         }, {
         id: 12,
         name: "C-1",
         order: [{
         name: "BIER",
         price: "2",
         qty: "27"
         }]
         }, {
         id: 13,
         name: "C-2",
         order: []
         }, {
         id: 14,
         name: "C-3",
         order: []
         }, {
         id: 15,
         name: "C-4",
         order: []
         }

         ];*/

        // DATA Collection
        $rootScope.tafels = [];
        $rootScope.product_orders = [];
        $rootScope.extention;
        //DB filler
        $rootScope.Fill = function () {

            /*if($rootScope.tafels.length === 0 && $rootScope.product_orders.length === 0){*/
            $rootScope.extention = "tafels";
            $rootScope.getter();

            //@TODO werkt niet als deze ook aan staat...
            /* $rootScope.extention = "product_orders";
             $rootScope.getter();*/
            /* }*/
        };

        //LOCALHOST GETTEN
        $rootScope.getter = function() {
            console.log("getter");
            return $http.get('http://localhost:3000/api/' + $rootScope.extention).then(handleSuccess, handleError('Error bij getten..'));
        };

        // If connection succesfull
        function handleSuccess(res) {
            console.log("nu ben ik: " + $rootScope.extention);

            if($rootScope.extention === "tafels"){
                $rootScope.tafels = res.data;
                console.log("Joe")

            }

            if($rootScope.extention === "product_orders"){
                $rootScope.product_orders = res.data;
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

        // variable current table ID
        $rootScope.currentTable = 0;

        // gets the table ID when button is clicked and changes currentTable
        $rootScope.getTable = function (tableID) {
            $rootScope.currentTable = tableID;
        };

        // returns the index corresponding to the tableID.
        //@TODO optimize it by checking if > or < than number..
        //@TODO now it checks from 1>>
        $rootScope.findIndexArray= function(tableID){
            var arrayIndex = 0;
            for (var x = 0; x < $rootScope.tables.length ; x++) {
                console.log($rootScope.tables[x].id + " test.. " + tableID);
                if ($rootScope.tables[x].id.toString() === tableID.toString()) {
                    console.log("x = " + x);
                    return x;

                }
            }
            return arrayIndex;
        };

        /*TODO EEN PRODUCT FIND FUNCTION??
         *
         *
         * */

        $rootScope.findOrderProductIndex = function(arrayIndex, productname){
            for (var i = 0; i < $rootScope.tables[arrayindex].order.length; i++){
                if(productname === $rootScope.tables[arrayIndex].order[i].name){
                    return i;
                }
            }

        };

        // get total needs table id // place in the array to show correct table totalprice
        $rootScope.getTotal = function (tableID) {
            var tot = 0;
            // if no table is selected then the tableID will be 0.
            if(tableID !== 0) {
                var arrayIndex = $rootScope.findIndexArray(tableID);

                // Calculate the total amount of the order
                for (var i = 0; i < $rootScope.tables[arrayIndex].order.length; i++) {
                    tot += ($rootScope.tables[arrayIndex].order[i].price * $rootScope.tables[arrayIndex].order[i].qty)
                }
            }
            return tot;
        };

        $rootScope.changeOrderQty= function(tableID, productname, qty){
            var arrayIndex = $rootScope.findIndexArray(tableID);
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