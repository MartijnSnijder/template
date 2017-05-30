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

        $rootScope.orderTemp = [{
            id: 24,
            name: "Thee",
            price: "2",
            qty: "4"

        },
            {
                id:22,
                name: "koffie",
                price: "4",
                qty: "1"
            }];

        $rootScope.tableSectionA = [{
            id: 23,
            name: "A-1",
            order: []

        }, {
            id: 21,
            name: "A-2",
            order: []
        }, {
            id: 22,
            name: "A-3",
            order: []
        }, {
            id: 22,
            name: "A-4",
            order: []
        }, {
            id: 22,
            name: "A-5",
            order: []
        },{
            id: 22,
            name: "A-6",
            order: []
        }

        ];

        $rootScope.tableSectionB = [{
            id: 23,
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
            id: 24,
            name: "B-2",
            order: [{
                name: "BIER",
                price: "2",
                qty: "25"
            }]
        }, {
            id: 25,
            name: "B-3",
            order: []
        }, {
            id: 24,
            name: "B-4",
            order: []
        }, {
            id: 25,
            name: "B-5",
            order: []
        }

        ];

        $rootScope.test = function () {
            return $rootScope.tableSectionB[1].price;
        };


        $rootScope.getTotal = function () {
            var tot = 0;
            for (var i = 0; i < $rootScope.tableSectionB.length; i++) {
                tot += ($rootScope.tableSectionB[i].price * $rootScope.tableSectionB[i].qty)
            }
            return tot;
        };


        $rootScope.getTable = function (tableID) {
            return tableID;
        };

        $rootScope.showHide = function(){
            if($rootScope.show = true){
                $rootScope.show = false;
            } else{
                $rootScope.show = true;
            }

        };

        function initController() {
            // todo init
        }
    }
})();