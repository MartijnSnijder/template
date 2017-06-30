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

        // VARS
        $rootScope.currentTable = "";

        // gets the table ID when button is clicked and changes currentTable
        $rootScope.getTable = function (tableNaam) {
            $rootScope.currentTable = tableNaam;
        };


        // gets the total value of the order basis on the tableNaam
        $rootScope.getTotal = function (tableNaam) {
            var tot = 0;
            $rootScope.product_view.forEach(function(product){
                if(product.tafel_naam === tableNaam){
                    tot += ((product.prijs * product.aantal) / 100);
                }
            });
            return tot;
        };

        $rootScope.changeOrderQty= function(tableNaam, prodProductNaam, plusOrMinusOne){
            $rootScope.product_view.forEach(function(product){
                if(product.product_naam === prodProductNaam){
                    //@TODO update de DB
                    if(plusOrMinusOne === 'plusOne'){
                        product.aantal++;
                    } else if(plusOrMinusOne === 'minusOne'){
                        product.aantal--;
                    }
                }
            })
        };


        $rootScope.popupClear = function(orderOrProduct){
            if(confirm("-- Weet u zeker dat u " + orderOrProduct + " wilt annuleren?")){
                //@TODO DB DINGEN
            }

        };

        // clear the entire order from the currentTable
        // @TODO DIT MOET NOG GEDAAN WORDEN.. UPDATE NAAR DB?
        $rootScope.clearOrder = function (currentTable) {
            var arrayIndex = $rootScope.findIndexArray(currentTable);
            var order= $rootScope.tables[arrayIndex].order;

            // only clear order when order has items
            if(order.length > 0) {
                $rootScope.tables[arrayIndex].order = [];
            }
        };


        //DONT REMOVE THIS IT WILL DESTROY EVERYTHING
        function initController() {
            // todo init
        }


        /* TIJDELIJK NIET NODIGE DEZE CODE....
        *
        *
        *
        *
        *
        * ...............: : : */

        //@TODO checkout function
        /*$rootScope.checkout = function (index) {
         alert($rootScope.getDate() + " - Ordernummer: " + ($rootScope.totOrders+1) + "\n\nTotaalbedrag: €" + $rootScope.getTotal().toFixed(2) + "\n\nBetaling ontvangen. Bedankt!");
         $rootScope.order = [];
         $rootScope.totOrders += 1;
         };*/

        /*// returns the index corresponding to the tableID.
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

        };*/
    }
})();