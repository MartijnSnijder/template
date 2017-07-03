(function () {
    'use strict';

    angular
        .module('app')
        .factory('Mongo', Mongo);


    Mongo.$inject = ['UserService', $rootScope];
    function Mongo(UserService, $rootScope) {

        var MongoClient = require('mongodb').MongoClient
            , assert = require('assert');

        var uri = "mongodb://project2-4:hboict@cluster0-shard-00-00-rgu4f.mongodb.net:27017,cluster0-shard-00-01-rgu4f.mongodb.net:27017,cluster0-shard-00-02-rgu4f.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
        MongoClient.connect(uri, function (err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");

            insertLogFiles(db, function () {
                insertOneLogFile(db, function () {
                    findLogs(db, function () {
                        updateLog(db, function () {
                            removeLog(db, function () {
                                db.close();
                            });
                        });
                    });
                });
            });
        });

        $rootScope.insertLogFiles = function (db, callback) {
            // Definieer hier de collection log, wanneer nieuw wordt hij auto aangemaakt
            var collection = db.collection('log');

            // Import meerdere values
            collection.insertMany([
                {
                    errorname: "Boot failure",
                    date: new Date(),
                    description: "Omschrijving error",
                    errorNumber: 2,
                    status: "Undefiend"
                },
                {
                    errorname: "broken screen",
                    date: new Date(),
                    description: "scherm stuk",
                    errorNumber: 3,
                    status: "solved"
                }
            ], function (err, result) { //aantal staat nu nog hard op 2 achter .equal(
                assert.equal(err, null);
                assert.equal(2, result.result.n);
                assert.equal(2, result.ops.length);
                console.log("Inserted 2 errors into the collection");
                callback(result);
            });
        };

        $rootScope.insertOneLogFile = function (db, callback) {
            // Get the documents collection
            var collection = db.collection('log');

            collection.insertOne({
                // _id veld wordt automatisch aangemaakt
                errorname: "bluescreen",
                date: new Date(),
                description: "Omschrijving error",
                errorNumber: 1,
                status: "Undefiend"
            }, function (err, result) {
                console.log("Inserted 1 errors into the collection");
                callback(result);
            });
        };

        $rootScope.insertProduct = function (product) {
            console.log("Dit is mongo aan het werk.. : ");
            console.log(JSON.stringify(product));
        };


        $rootScope.findLogs = function (db, callback) {
            var collection = db.collection('log');
            collection.find({'errorname': 'bluescreen'}).sort({'errorNumber': 1}).toArray(function (err, docs) {
                assert.equal(err, null);
                console.log("Found the following records");
                console.log(docs);
                callback(docs);
            });
        };


        $rootScope.updateLog = function (db, callback) {
            // Get the documents collection
            var collection = db.collection('log');
            // Update document where status is Undefiend , set b equal to 1
            collection.updateOne({status: "Undefiend"}
                , {$set: {status: "undefined"}}, function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    console.log("Updated the document with the field status equal to undefined");
                    callback(result);
                });
        };

        $rootScope.removeLog = function (db, callback) {
            // Get the documents collection
            var collection = db.collection('log');
            // Delete document where status is solved
            collection.deleteOne({status: "solved"}, function (err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                console.log("Removed the document with the field status equal to solved");
                callback(result);
            });
        };
    }
});


// var uriTestDb = "mongodb://project2-4:hboict@cluster0-shard-00-00-rgu4f.mongodb.net:27017,cluster0-shard-00-01-rgu4f.mongodb.net:27017,cluster0-shard-00-02-rgu4f.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
// MongoClient.connect(uriTestDb, function(err, db) {
//     db.close();
// });
//
//