var express = require('express');
var app = express();
app.get('/',function(request,response){
    response.send("Hello we are placing Pressbury Employee Enrollment Application here");
});
app.listen('5678',function(){
    var port = 5678;
    var host = "localhost"
    console.log("Pressbury Employe Enrollment Application is running on  http://%s:%s",host,port);
});
