/**
 * Created by Robert on 29-6-2017.
 */

var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var uri = "mongodb://project2-4:hboict@cluster0-shard-00-00-rgu4f.mongodb.net:27017,cluster0-shard-00-01-rgu4f.mongodb.net:27017,cluster0-shard-00-02-rgu4f.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
MongoClient.connect(uri, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

    insertProductLog(db, function() {
        insertOneUser(db,function () {
            findProduct(db, function () {
                updateProduct(db, function() {
                 removeProduct(db, function() {
                     db.close();
                 });
            });
            });
        });
        });
});

var insertProductLog= function(db, callback) {
    // Definieer hier de collection log, wanneer nieuw wordt hij auto aangemaakt "id": 1,
    var collection = db.collection('product-log');

    // Import meerdere values
    collection.insertMany([
        { productname: "RedBull",
            prijs: 109,
            date: new Date(),
            type: "sapjes",
            product_id: 2,
            subcategorieen_id: 1,
            cafe_id: 1},
        { productname: "Ranja",
            prijs: 50,
            date: new Date(),
            type: "sapjes",
            product_id: 6,
            subcategorieen_id: 1,
            cafe_id: 1}
    ], function(err, result) { //aantal staat nu nog hard op 2 achter .equal(
        assert.equal(err, null);
        assert.equal(2, result.result.n);
        assert.equal(2, result.ops.length);
        console.log("Inserted 2 products in the log");
        callback(result);
    });
}

var insertOneUser = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('user-log');

    collection.insertOne({
        // _id veld wordt automatisch aangemaakt
        username: "Braampje95",
        date: new Date(),
        naam: "Braam Melle",
        rechten: "cafeUser",
        cafe_id: 1
    }, function(err, result) {
        console.log("Inserted 1 user into the collection");
        callback(result);
    });
}


var findProduct= function(db, callback) {
    var collection = db.collection( 'product-log' );
    collection.find({ 'product_id' : 6 }).sort({ 'cafe_id': 1 }).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}


var updateProduct= function(db, callback) {
    // Get the documents collection
    var collection = db.collection('product-log');
    // Update document where status is Undefiend , set b equal to 1
    collection.updateOne({ productname : "Ranja"}
        , { $set: { productname : "AA-sportdrink" } }, function(err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            console.log("Updated the document with the field productname equal to Ranja");
            callback(result);
        });
}

var removeProduct = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('product-log');
    // Delete document where status is solved
    collection.deleteOne({ product_id : 6 }, function(err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log("Removed the document with the field product_id equal to 1");
        callback(result);
    });
}


// var uriTestDb = "mongodb://project2-4:hboict@cluster0-shard-00-00-rgu4f.mongodb.net:27017,cluster0-shard-00-01-rgu4f.mongodb.net:27017,cluster0-shard-00-02-rgu4f.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin";
// MongoClient.connect(uriTestDb, function(err, db) {
//     db.close();
// });
//
//