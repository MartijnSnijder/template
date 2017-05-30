/**
 * Created by r_fli on 29-5-2017.
 */

var app = angular.module('app', []);

app.controller('tableViewController', function ($scope) {

    $scope.tableSectionA = [{
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

    $scope.tableSectionB = [{
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
        order: []
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

    $scope.test=function () {
        return $scope.tableSectionB[1].price;
    };


    $scope.getTotal = function () {
        var tot = 0;
        for (var i = 0; i < $scope.tableSectionB.length; i++) {
            tot += ($scope.tableSectionB[i].price * $scope.tableSectionB[i].qty)
        }
        return tot;
    };



    $scope.orderTemp = [{
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
    
    $scope.getTable = function (tableID) {
        return tableID;
    };

    // variable
    $scope.show = true;

    $scope.showHide = function(){
        if(show = true){
            show = false;
        } else{
            show = true;
        }

    }


});
