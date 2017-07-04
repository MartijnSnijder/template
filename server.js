var express = require('express');
var app = express();
/*var MongoClient = require('mongodb').MongoClient;*/
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
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

app.post('/api/gebruikers', function (req, res) {
    console.log("ik word aangeroepen, post INLOGGEN");

    var username = req.body.username;
    var pw = req.body.password;

    console.log("username & pw " + username + " " + pw);

    var query = "select * from gebruikers where username = '" + username + "' AND password = '" + pw + "'";
     var queryResult = connection.query(query, function (err, response) {
         console.log("dit is de error message: " + JSON.stringify(err));
         console.log("dit is de succes message: " + JSON.stringify(response));
         if (err) throw err;

     });
});


app.post('/api/:_id', function (req, res) {
    console.log("gewone post aangeroepen..");
    var postData = req.body,
        query = 'INSERT INTO `'.concat(req.params._id).concat('` (');

    for (var key in postData) {
        console.log(key + " Dingen!");
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
    var queryResult = connection.query(query, data, function (err, res) {
        console.log("dit is de error message: " + JSON.stringify(err));
        console.log("dit is de succes message: " + JSON.stringify(res));
        if (err) throw err;
    });
});



app.put('/api/adv_order/:_id', function (req, res){
    connection.query('select * from  orders where id='.concat(req.params._id),function (err,rows,fields)
    {
        if (err) throw err;
        for(var i = 0; i < rows.length; i++) {
            var obj = rows[i];
        }
        var status;
        switch(obj.order_status) {
            case 'besteld':
                status = 'in behandeling';
                break;
            case 'in behandeling':
                status = 'staat klaar';
                break;
            case 'staat klaar':
                status = 'afgeleverd';
                break;
            case 'afgeleverd':
                status = 'betaald';
                break;
            case 'betaald':
                console.log('cant advance betaald');
                status = 'betaald';
                break;
            default:alert('status not regocnized');
        }
        var query = "UPDATE orders SET order_status = '".concat(status).concat("' WHERE id =").concat(req.params._id);
        console.log(query);
        connection.query(query,function(err){
            if(err) throw err;
            res.json(true)
        });
    });
});

app.put('/api/update/:_table/:_id', function (req, res){
    var postData = req.body,
        query = 'UPDATE '.concat(req.params._table).concat(' SET ');

    var data = [];
    for (var key in postData) {
        if (!postData.hasOwnProperty(key))
            continue;

        query = query.concat(key).concat('=');
        query = query.concat('?,');
        data.push(postData[key]);
    }

    query = query.slice(0, -1);
    query = query.concat(' WHERE id=').concat(req.params._id);
    connection.query(query, data, function (err, res2) {
        if (err) throw err;
        res.json(true);
    });
});


app.listen(3000, function () {
  console.log('Listening on port 3000!');
});