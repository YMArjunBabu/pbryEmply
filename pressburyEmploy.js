var express = require('express');
var app = express();
// postgress
var pg = require("pg");
var conString = "pg://postgres:post@localhost:5432/empy";
var client = new pg.Client(conString);
 client.connect();


var resp = {};
var aryRec = [];

var bodyParser = require('body-parser');

var path = require('path');

app.use(express.static(path.normalize(__dirname+'/')));
app.use(express.static(path.normalize(__dirname+'/app')));
app.use(bodyParser.json());
var urlEncodedParser = bodyParser.urlencoded({ extended : false});
var query;

// html pages
app.get('/',function(req,res){
 res.sendFile(__dirname+"/app/index.html");

});
app.post('/reg',urlEncodedParser,function(request,response){
  client.query("INSERT INTO empinfo(firstname, lastname) values($1, $2)", [request.body.firstname, request.body.lastname]);
   query = client.query("SELECT firstname, lastname FROM empinfo ORDER BY lastname, firstname");
   query.on("row", function (row, result) {
      result.addRow(row);
  });
  query.on("end", function (result) {
      aryRec = [];
       aryRec = JSON.stringify(result.rows, null, "    ");
      console.log(JSON.stringify(result.rows, null, "    "));
         // client.end();
    response.send(aryRec);
  });

});
app.get('/details',function(request,response){
   query = client.query("SELECT firstname, lastname FROM empinfo ORDER BY lastname, firstname");
   query.on("row", function (row, result) {
      result.addRow(row);
  });
  query.on("end", function (result) {
      aryRec = [];
       aryRec = JSON.stringify(result.rows, null, "    ");
      console.log(JSON.stringify(result.rows, null, "    "));
         // client.end();
    response.send(aryRec);
  });

});
app.listen('5678',function(){
    var port = 5678;
    var host = "localhost"
    console.log("Pressbury Employe Enrollment Application is running on  http://%s:%s",host,port);
});
