/**
 * Created by r_fli on 29-5-2017.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('tableViewController', tableViewController);

    tableViewController.$inject = ['$rootScope'];
    function tableViewController($rootScope) {
        var vm = this;

        // variable
        $rootScope.show = true;



        $rootScope.tables = [{
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

        ];

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

        // get total needs table id // place in the array to show correct table totalprice
        $rootScope.getTotal = function (tableID) {
            if(tableID !== 0) {
                var arrayIndex = $rootScope.findIndexArray(tableID);

            // Calculate the total amount of the order
            // if no table selected then arrayIndex = 0, thus total = 0.
            var tot = 0;

                for (var i = 0; i < $rootScope.tables[arrayIndex].order.length; i++) {
                    tot += ($rootScope.tables[arrayIndex].order[i].price * $rootScope.tables[arrayIndex].order[i].qty)
                }

            };
            return tot;
        };

        function initController() {
            // todo init
        }
    }
})();