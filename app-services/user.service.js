(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            console.log("getAll wordt wel aangeroepen maar...");
            return $http.get('/api/gebruikers').then(handleSuccess, handleError('Error bij het ophalen van alle gebruikers'));
        }

        function GetById(id) {
            return $http.get('/api/gebruikers/' + id).then(handleSuccess, handleError('Error bij het ophalen van gebruiker bij id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/gebruikers/' + username).then(handleSuccess, handleError('Error bij het ophalen van gebruiker bij username'));
        }

        function Create(user) {
            return $http.post('/api/gebruikers', user).then(handleSuccess, handleError('Error bij het aanmaken van gebruiker'));
        }

        function Update(user) {
            return $http.put('/api/gebruikers/' + user.id, user).then(handleSuccess, handleError('Error bij het updaten van gebruiker'));
        }

        function Delete(id) {
            return $http.delete('/api/gebruikers/' + id).then(handleSuccess, handleError('Error bij het verwijderen van gebruiker'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
