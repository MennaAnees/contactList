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


//require middlewares..
const authMid = require('./mid/auth')
const urlMid = require ('./mid/url')

// require all models
fs.readdirSync(path.join(__dirname, "models")).forEach(function (model) {
  require(path.join(__dirname, "models", model))
})

//middleware for authorization..
server.use(JSONParsermid,authMid)


//route to 3 APIS
var contactsRouter = require("./controllers/contacts")
server.use("/contacts", contactsRouter)

//middleware to catch error URLS
server.use(urlMid)


module.exports = server
