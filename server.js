var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

var xPool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'u1183p12847_cafepos',
    password : 'hboict',
    database : 'u1183p12847_cafe',
    debug    :  false
});

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'cafepos',
    debug    :  false
});

function handle_database(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from cafe",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
        });
  });
}

app.get("/",function(req,res){-
        handle_database(req,res);
});

app.post('/api/:_id', function (req,res){
    var postData = req.body;
    connection.query('insert into '.concat(req.params._id).concat(' SET ?'),postData,function(err,res){
        if(err) throw err;
    });
});

app.listen(3000);
