var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());



app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
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

// GETS RESULT FROM TABLE
app.get('/api/:_id', function (req,res){
    connection.query('select * from  `'.concat(req.params._id).concat('`'),function (err,rows,fields) {
        if (err) throw err;
        res.json(rows);
    });
});

// LOGIN
app.post('/api/gebruikers/inloggen', function (req, res) {
    console.log("ik word aangeroepen, post INLOGGEN");

    var username = req.body.username;
    var pw = req.body.password;

    console.log("username & pw " + username + " " + pw);

    var query = "select * from gebruikers where username = '" + username + "' AND password = '" + pw + "'";
    connection.query(query, function (err, res2) {
         console.log("dit is de error message: " + err);
         console.log("dit is de succes message: " + JSON.stringify(res2));
         if (err) throw err;

         // Result will either be [] -> length 0 when no match is found or [...] (so length > 0) when match
         if(res2.length > 0) {
             res.json(true);
         } else res.json(false);
     });
});

// DELETE PRODUCT BASED ON PRODUCT ID
// @TODO WERKEND MAKEN

app.post('/api/producten/verwijderen', function (req, res) {
    console.log("ik word aangeroepen, post PRODUCT VERWIJDEREN");

    var product_id = req.body.id;

    console.log("product id : " + product_id );

    var query = "delete * from producten where id = '" + product_id;
    var queryResult = connection.query(query, function (err, res) {
        console.log("dit is de error message: " + JSON.stringify(err));
        console.log("dit is de succes message: " + JSON.stringify(res));
        if (err) throw err;
        res.json(true);
    });

    console.log("de response van product verwijderen  = " + res);
    return res;
});

// INSERT INTO USERS
app.post('/api/gebruikers/toevoegen', function (req, res) {
    console.log("POST - INSERT INTO GEBRUIKERS");
    var postData = req.body;
    console.log(req.body);
    console.log(JSON.stringify(req.body));

    var query = 'INSERT INTO GEBRUIKERS (';

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
    var queryResult = connection.query(query, data, function (err, res2) {
        console.log("dit is de error message: " + JSON.stringify(err));
        console.log("dit is de succes message: " + JSON.stringify(res2));
        if (err) throw err;
        res.json(res2);
    });
});

// INSERT INTO PRODUCTS
app.post('/api/producten/toevoegen', function (req, res) {
    console.log("POST -- INSERT INTO PRODUCTEN");

    var postData = req.body;
    console.log(req.body);
    console.log(JSON.stringify(req.body));



    var query = 'INSERT INTO PRODUCTEN (';

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

    console.log("dit is de query" + query + data);
    var queryResult = connection.query(query, data, function (err, res2) {
        console.log("dit is de error message: " + JSON.stringify(err));
        console.log("dit is de succes message: " + JSON.stringify(res2));
        if (err) throw err;
        res.json(res2);
    });
});

// USER RIGHTS & CAFE ID
app.post('/api/gebruikers/currentuser', function (req, res) {
    console.log("Current user rechten en cafe_id worden opgevraagd..");

    var data =  req.body.username;

    var query= "SELECT `id`, `rechten`, `cafe_id` FROM gebruikers WHERE username= '" + data + "'";
    console.log(query);
    connection.query(query, function (err, res2) {
        console.log(JSON.stringify(err));
        console.log(JSON.stringify(res2));

        if(err) throw err;
        res.json(res2);
    });



});

// ALL CAFE USERS
app.post('/api/gebruikers/getCafeUsers', function (req, res) {
    console.log("Cafe user worden ingeladen op basis van current user cafe_id");

    var data =  req.body.cafeID;

    var query= "SELECT * FROM gebruikers WHERE cafe_id= '" + data + "'";
    console.log(query);
    connection.query(query, function (err, res2) {
        console.log(JSON.stringify(err));
        console.log(JSON.stringify(res2));

        if(err) throw err;
        res.json(res2);
    });



});



// STATUS UPDATER
// @TODO KIJKEN OF DIT WERKT

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
        connection.query(query,function(err, res2){
            if(err) throw err;
            res.json(true)
        });
    });
});


app.post('/api/new/order', function (req,res){
    console.log("Ik word aangeroepen... ORDER TOEVOEGEN");
    //{"tafel_id":1,"order_status":"besteld","comment":"stuff","producten":[{"id":1,"aantal":2},{"id":3,"aantal":4}]}

    var postData= req.body;
    var query ='INSERT INTO orders (tijd,tafel_id,order_status,comment) VALUES(?,?,?,?)';
    var data=[new Date(),postData["tafel_id"],"besteld",postData["comment"]];
    var data=[new Date(),postData["tafel_id"],"in behandeling",postData["comment"]];

    console.log("query voor de product_orders start");
    connection.query(query,data,function(err,result){
        if (err) throw err;
        console.log("ben ik al bij de postdata in de buurt ??? zou mooi zijn");
        for(var key in postData["producten"]){
            console.log("ben ik hier ook al ?");
            var query ='INSERT INTO product_orders (order_id,product_id,aantal) VALUES (?,?,?)';
            var data = [result.insertId,postData["producten"][key]["id"],postData["producten"][key]["qty"]];
            console.log(JSON.stringify(data));
            connection.query(query,data,function(err,res2){
                console.log(JSON.stringify(err));
                console.log(JSON.stringify(res2));
                if (err) throw err;

            });
        }
    });
    res.json(true);
});


// ORDER UPDATE -- GEEN IDEE OF DIT WERKT
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

// ORDER NAAR BETAALD ZETTEN
app.post('/api/update/order/betaald', function (req, res){
    var data = req.body.tafelID;
    console.log(JSON.stringify(data));
    var query = "UPDATE orders SET order_status='betaald' WHERE order_status='in behandeling' AND tafel_id = '" + data + "'";

    connection.query(query,function (err, res2) {
        console.log(JSON.stringify(err));
        console.log(JSON.stringify(res2));
        if (err) throw err;
        res.json(res2);
    });
});

// ORDER NAAR GEANNULEERD ZETTEN
app.post('/api/update/order/annuleren', function (req, res){
    var data = req.body.tafelID;
    console.log(JSON.stringify(data));
    var query = "UPDATE orders SET order_status='geannuleerd' WHERE order_status='in behandeling' AND tafel_id = '" + data + "'";

    connection.query(query,function (err, res2) {
        console.log(JSON.stringify(err));
        console.log(JSON.stringify(res2));
        if (err) throw err;
        res.json(res2);
    });
});

// DO NOT TOUCH
app.listen(3000, function () {
  console.log('Listening on port 3000!');
});