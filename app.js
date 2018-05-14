var express = require('express')
var fs = require("fs")
var server = express()
var path = require('path')
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/contactList")
// require all models
fs.readdirSync(path.join(__dirname, "models")).forEach(function (model) {
  require(path.join(__dirname, "models", model))
})
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({
  extended: true
});
var JSONParsermid = bodyParser.json();

var validArray=[{
  userId:1,
  auth:1,
  deviceToken:11,
  fingerPrint:111
},
{
  userId:2,
  auth:2,
  deviceToken:22,
  fingerPrint:222
}]

server.use(JSONParsermid,(req,resp,next)=>{
  var flag=0;
  if(req.body.auth && req.body.deviceToken &&  req.body.fingerPrint){
    console.log("hii");
    validArray.forEach(function(value){
      if(req.body.auth === value.auth &&
         req.body.deviceToken === value.deviceToken
         && req.body.fingerPrint === value.fingerPrint){
         next()
        }
        else{
          flag++
        }

    })
    if (flag === validArray.length){
      return resp.status(403).send({
          success: false,
          message: 'The User is not Authorized.'
      })
      ;}
  }
  else{
    return resp.status(403).send({
        success: false,
        message: 'Not Authorized.'
    });
  }
})

var contactsRouter = require("./controllers/contacts")
server.use("/contacts", contactsRouter)


server.listen(3000,function(){
  console.log("start server in http at port 3000");
});
