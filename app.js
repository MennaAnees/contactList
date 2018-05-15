const express = require('express')
const fs = require("fs")
const server = express()
const path = require('path')

const bodyParser = require("body-parser");
const urlEncodedMid = bodyParser.urlencoded({
  extended: true
});
const JSONParsermid = bodyParser.json();


//connect database..
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/contactList")

//require auth file
const validUsers = require('./auth');

// require all models
fs.readdirSync(path.join(__dirname, "models")).forEach(function (model) {
  require(path.join(__dirname, "models", model))
})

//middleware for authorization..
server.use(JSONParsermid,(req,resp,next)=>{
  var flag=0;
  if(req.body.auth && req.body.deviceToken &&  req.body.fingerPrint){
    console.log("hii");
    validUsers.forEach(function(value){
      if(req.body.auth === value.auth &&
         req.body.deviceToken === value.deviceToken
         && req.body.fingerPrint === value.fingerPrint){
        req.body.userId = value.userId
         next()
        }
        else{
          flag++
        }

    })
    if (flag === validUsers.length){
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

//route to 3 APIS
var contactsRouter = require("./controllers/contacts")
server.use("/contacts", contactsRouter)

//middleware to catch error URLS
server.use((req,resp,next)=>{
  resp.status(404).send({
        statusCode : 404,
        message : 'The page you requested does not exist'
    });
})

server.listen(3000,function(){
  console.log("start server in http at port 3000");
});
