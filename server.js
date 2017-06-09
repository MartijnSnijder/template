var express = require('express');
var app = express();

app.use(express.static('public'))

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'cafepos'
});
connection.connect();

app.get('/api/:_id', function (req,res){
    connection.query('select * from  '.concat(req.params._id),function (err,rows,fields)
    {
        if (err) throw err;
        res.json(rows);
    });
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});