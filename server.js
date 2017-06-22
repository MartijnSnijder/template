var express = require('express');
var app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());

var mysql      = require('mysql');  
var connection = mysql.createConnection({  
  host     : 'localhost',  
  user     : 'root',  
  password : 'root',
  database : 'cafepos'  
});

//  GEGEVENS VAN DE DB ONLINE
var connectionReal = mysql.createConnection({
    host     : 'localhost',
    user     : 'u1183p12847_cafepos',
    password : 'hboict',
    database : 'u1183p12847_cafe'
});

connection.connect();

app.get('/api/:_id', function (req,res){
	connection.query('select * from  `'.concat(req.params._id).concat('`'),function (err,rows,fields)
	{
		if (err) throw err;
		res.json(rows);
	});
});

app.post('/api/:_id', function (req,res){
	var postData = req.body;
connection.query('insert into `'.concat(req.params._id).concat('` SET ?'),postData,function(err,res){
if(err) throw err;
});
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});