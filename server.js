var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    next();

    /*res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header('Access-Control-Allow-Headers', 'Authorization');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();*/
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
    console.log(req.params._id);

    var username = req.post.username;
    var pw = req.post.password;

    console.log("username & pw" + username + " " + pw);

    /*console.log(connection.query);
    connection.query = 'SELECT * FROM gebruikers where '.concat(req.params._id).concat('` (');
    console.log(query);
        //if(err) throw err;
        //console.log(res);*/

    /*var postData = req.body,*/
        //query = 'SELECT * FROM gebruikers where '.concat(req.params._id).concat('` (');


    /*console.log("logdata: "+ postData);

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
    console.log(query);*/
        query = "SELECT * FROM gebruikers where id=1";
    var queryResult = connection.query(query, function (err, res) {
        //console.log("dit is de error message: " + JSON.stringify(err));
        //console.log("dit is de succes message: " + JSON.stringify(res));
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