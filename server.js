var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization')
    next();
});
var mysql      = require('mysql');  
var connection = mysql.createConnection({  
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'cafepos'
});

//  GEGEVENS VAN DE DB ONLINE
/*var connectionReal = mysql.createConnection({
    host     : 'localhost',
    user     : 'u1183p12847_cafepos',
    password : 'hboict',
    database : 'u1183p12847_cafe'
});*/

connection.connect();

app.get('/api/:_id', function (req,res){
    connection.query('select * from  `'.concat(req.params._id).concat('`'),function (err,rows,fields) {
        if (err) throw err;
        res.json(rows);
    });
});

app.post('/api/:_id', function (req, res) {
    var postData = req.body,
        query = 'INSERT INTO `'.concat(req.params._id).concat('` (');

    for (var key in postData) {
        if (!postData.hasOwnProperty(key))
            continue;

        query = query.concat('`').concat(key).concat('`,');
    }

    var data = [];
    query = query.slice(0, -1);
    query = query.concat(') VALUES(');
    for ( key in postData) {
        if (!postData.hasOwnProperty(key))
            continue;

        query = query.concat('?,');
        data.push(postData[key]);
    }

    query = query.slice(0, -1);
    query = query.concat(')');
    var queryResult = connection.query(query, data, function (err, res2) {
        if (err) throw err;
        res.json(true);
    });
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});