/**
 * Created by Martijn on 29-5-2017.
 */
var app = angular.module('myApp', []);

app.controller('PosController', function ($scope) {

    $scope.favorieten = [{
        id: 15,
        name: "Rode wijn (glas)",
        price: "4"

    }, {
        id: 16,
        name: "Rode wijn (fles)",
        price: "14"
    },{
        id: 17,
        name: "Koffie verkeerd",
        price: "4.20"
    }

    ];

    $scope.dranken = [{
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

    $scope.eten = [{
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

    $scope.tafels = [{
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

    $scope.order = [];
    $scope.nieuw = {};
    $scope.totOrders = 0;
    $scope.comments = {};

    var url = window.location.protocol + "://" + window.location.host + "/" + window.location.pathname;

    $scope.getDate = function () {
        var today = new Date();
        var mm = today.getMonth() + 1;
        var dd = today.getDate();
        var yyyy = today.getFullYear();

        var date = dd + "/" + mm + "/" + yyyy

        return date
    };

    $scope.addToOrder = function (item, qty) {
        var flag = 0;
        if ($scope.order.length > 0) {
            for (var i = 0; i < $scope.order.length; i++) {
                if (item.id === $scope.order[i].id) {
                    item.qty += qty;
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) {
                item.qty = 1;
            }
            if (item.qty < 2) {
                $scope.order.push(item);
            }
        } else {
            item.qty = qty;
            $scope.order.push(item);
        }
    };

    $scope.removeOneEntity = function (item) {
        for (var i = 0; i < $scope.order.length; i++) {
            if (item.id === $scope.order[i].id) {
                item.qty -= 1;
                if (item.qty === 0) {
                    $scope.order.splice(i, 1);
                }
            }
        }
    };

    $scope.removeItem = function (item) {
        for (var i = 0; i < $scope.order.length; i++) {
            if (item.id === $scope.order[i].id) {
                $scope.order.splice(i, 1);
            }
        }
    };

    $scope.getTotal = function () {
        var tot = 0;
        for (var i = 0; i < $scope.order.length; i++) {
            tot += ($scope.order[i].price * $scope.order[i].qty)
        }
        return tot;
    };

    $scope.clearOrder = function () {
        $scope.order = [];
    };

    $scope.addToTable = function () {
        alert($scope.getDate() + " - Ordernummer: " + ($scope.totOrders+1) + "\n\n Toegevoegd aan tafel!");
        $scope.order= [];
        $scope.totOrders += 1;

    };

    $scope.checkout = function (index) {
        alert($scope.getDate() + " - Ordernummer: " + ($scope.totOrders+1) + "\n\nTotaalbedrag: €" + $scope.getTotal().toFixed(2) + "\n\nBetaling ontvangen. Bedankt!");
        $scope.order = [];
        $scope.totOrders += 1;
    };

    $scope.selectTable = function(table){
        //TODO
    };

    $scope.addNewItem = function (item) {
        if (item.category === "Dranken") {
            item.id = $scope.dranken.length + $scope.eten.length;
            $scope.dranken.push(item);
            $scope.nieuw = [];
            $('#myTab').find('a[href="#dranken"]').tab('show')
        } else if (item.category === "Eten") {
            item.id = $scope.eten.length + $scope.eten.length;
            $scope.eten.push(item);
            $scope.nieuw = [];
            $('#myTab').find('a[href="#eten"]').tab('show')
        } else if(item.category === "favorieten"){
            item.id = $scope.favorieten.length + $scope.eten.length;
            $scope.favorieten.push(item);
            $scope.nieuw = [];
        }
    };

    $scope.submitComment = function (comment) {
        $scope.comments.push(comment);
        return $scope.comments;
    }

});