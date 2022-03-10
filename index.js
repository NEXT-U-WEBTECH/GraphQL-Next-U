var express = require('express');  
var app = express();  
var fs = require("fs");  
var bodyParser = require('body-parser');  
  
//enable CORS for request verbs
app.use(function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
  res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");  
  next();  
});  
  
app.use(bodyParser.urlencoded({  
    extended: true  
}));  
  
app.use(bodyParser.json());  
  
//Handle GET method for listing all users
app.get('/students', function (req, res) {  
   fs.readFile( __dirname + "/" + "data/students.json", 'utf8', function (err, data) {  
       console.log( data );  
       res.end( data );  
   });  
})  
  
//Handle GET method to get only one record
app.get('/students/:id', function (req, res) {  
   // First read existing users.  
    fs.readFile( __dirname + "/" + "data/students.json", 'utf8', function (err, data) {  
       students = JSON.parse( data );  
       console.log(req.params.id);
     var studentResp =  students.filter(function(student) {
                      return student.id == req.params.id;
              });     
       console.log(studentResp);  
       res.end( JSON.stringify(studentResp));  
   });  
}) 

app.get('/colleges', function (req, res) {  
   fs.readFile( __dirname + "/" + "data/colleges.json", 'utf8', function (err, data) {  
       console.log( data );  
       res.end( data );  
   });  
}) 

app.get('/colleges/:id', function (req, res) {  
   // First read existing users.  
    fs.readFile( __dirname + "/" + "data/colleges.json", 'utf8', function (err, data) {  
       colleges = JSON.parse( data );  
       console.log(req.params.id);
     var collegeResp =  colleges.filter(function(college) {
                      return college.id == req.params.id;
              });     
       console.log(collegeResp);  
       res.end( JSON.stringify(collegeResp));  
   });  
})
  

/* 
  
  app.post('/addUser', function (req, res) {  

       fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {  
       var obj = JSON.parse('[' + data + ']' );  
       obj.push(req.body);  
       console.log(obj);  
         
       res.end( JSON.stringify(obj)  );  
   });  
})  
  

app.delete('/deleteUser/:id', function (req, res) {  
  
   // First read existing users.  
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {  
       data = JSON.parse( data );  
         
       delete data["user" + req.params.id];  
         
       console.log( data );  
       res.end( JSON.stringify(data));  
   });  
})  
  

app.put('/updateUser/:id', function(req,res){  
      
    // First read existing users.  
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {  
       //var obj = JSON.parse('[' + data + ']' );  
       data = JSON.parse( data );  
       var arr={};  
       arr=req.body;  
         
        data["user" + req.params.id]= arr[Object.keys(arr)[0]] ; //  req.body;   //obj[Object.keys(obj)[0]]  
          
        res.end( JSON.stringify( data ));  
         
    });  
} ); 

*/
  
var server = app.listen(8081, function () {  
  
  var host = server.address().address  
  var port = server.address().port  
  
  console.log("Example app listening at http://%s:%s", host, port)  
  
})  