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

        // VARS
        $rootScope.currentTable = "";

        // gets the table ID when button is clicked and changes currentTable
        $rootScope.getTable = function (tableNaam) {
            $rootScope.currentTable = tableNaam;
        };


        // gets the total value of the order basis on the tableNaam
        $rootScope.getTotalTable = function (tableNaam) {
            var tot = 0;
            $rootScope.product_view.forEach(function(product){
                if(product.tafel_naam === tableNaam){
                    tot += ((product.prijs * product.aantal) / 100);
                }
            });

            if(tot > 0){
                return tot;
            } else return 0;
        };

        $rootScope.changeOrderQty= function(tableNaam, prodProductNaam, plusOrMinusOne){
            $rootScope.product_view.forEach(function(product){
                if(product.product_naam === prodProductNaam){
                    //@TODO update de DB
                    if(plusOrMinusOne === 'plusOne'){
                        product.aantal++;
                    } else if(plusOrMinusOne === 'minusOne'){
                        if(product.aantal >0){
                        product.aantal--;
                            }
                        if(product.aantal === 0){
                            alert("Product wordt niet meegerekend in totaalprijs, maar blijft op de bon staan voor administratieve doeleinden.");
                        }
                    }
                }
            })
        };


        $rootScope.popupClear = function(orderOrProduct){
            if(confirm("-- Weet u zeker dat u " + orderOrProduct + " wilt annuleren?")){
                //@TODO DB DINGEN
            }

        };

        // clear the entire order from the currentTable and DB
        $rootScope.deleteOrder = function (currentTable) {
            if($rootScope.currentTable !== "") {
                if ($rootScope.getTotalTable($rootScope.currentTable) > 0) {
                    var conf = confirm(" - Tafel : " + currentTable + " wordt geannuleerd.." + ($rootScope.totOrders + 1) + "\n\nTotaalbedrag: €" + $rootScope.getTotalTable($rootScope.currentTable).toFixed(2) + "\n\nZeker weten?");

                    if(conf){
                        $rootScope.order = [];
                        $rootScope.totOrders += 1;
                        $rootScope.cancelOrder($rootScope.currentTable);
                    }

                }
            }
        };

        // checkout the currentTable & change order status in DB
        $rootScope.checkoutTable = function (currentTable) {
            if($rootScope.currentTable !== "") {
                if ($rootScope.getTotalTable($rootScope.currentTable) > 0) {
                var conf = confirm(" - Tafel : " + currentTable + " wordt afgerekend.." + ($rootScope.totOrders + 1) + "\n\nTotaalbedrag: €" + $rootScope.getTotalTable($rootScope.currentTable).toFixed(2) + "\n\nBetaling ontvangen. Bedankt!");

                if(conf){
                    $rootScope.order = [];
                    $rootScope.totOrders += 1;
                    $rootScope.finishOrder($rootScope.currentTable);
                }

                }
            }
        };


        //DONT REMOVE THIS IT WILL DESTROY EVERYTHING
        function initController() {
            // todo init
        }
    }
})();