/**
 * Created by Martijn on 31-5-2017.
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$rootScope'];
    function AdminController($rootScope) {
        var vm = this;

        $rootScope.addNewItem = function (item) {
            if (item.category === "Dranken") {
                item.id = $rootScope.dranken.length + $rootScope.eten.length;
                $rootScope.dranken.push(item);
                $rootScope.nieuw = [];
                $('#myTab').find('a[href="#dranken"]').tab('show')
            } else if (item.category === "Eten") {
                item.id = $rootScope.eten.length + $rootScope.eten.length;
                $rootScope.eten.push(item);
                $rootScope.nieuw = [];
                $('#myTab').find('a[href="#eten"]').tab('show')
            } else if(item.category === "favorieten"){
                item.id = $rootScope.favorieten.length + $rootScope.eten.length;
                $rootScope.favorieten.push(item);
                $rootScope.nieuw = [];
            }
        };

        function initController() {
            // todo init
        }
    }
})();