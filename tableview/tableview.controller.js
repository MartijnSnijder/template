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
        }

        ];

        $rootScope.currentTable = 0;
        $rootScope.getTable = function (tableID) {
            $rootScope.currentTable = tableID;
            console.log(tableID.toString() + ": joe");
        };


        $rootScope.tableFilter = function(tablename, tableSection) {
            console.log("ik kom hier wel G");

            console.log(tableSection + " " + tablename);

                if (tablename.search(tableSection)) {
                    return true;
                }

            return false;
        };

        // get total needs table id // place in the array to show correct table totalprice
        $rootScope.getTotal = function (tableID) {
            // to test
           // var tableid = 23;
           // var tableinArray = 0;

            var tot = 0;
            for (var i = 0; i < $rootScope.tableSectionB[tableinArray].order.length; i++) {
                tot += ($rootScope.tableSectionB[tableinArray].order[i].price * $rootScope.tableSectionB[tableinArray].order[i].qty)
            }
            return tot;
        };

        function initController() {
            // todo init
        }
    }
})();