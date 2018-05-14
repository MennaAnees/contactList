var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
// var ProductsModel = mongoose.model("products");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({
  extended: true
});
var JSONParsermid = bodyParser.json();

var ContactsModel = require("../models/contacts");



router.get("/", function (request, response) {
  console.log(" / route " );
  response.send("Home");
});

//1st API "ADD NEW CONTACT"...
router.post("/addContact", JSONParsermid, function (req, resp) {
  ContactsModel.checkContact(req.body)
  .then((data)=>{
     if(data.length === 0){
       ContactsModel.addContact(req.body)
       .then((data)=>resp.send(data))
       .catch((error)=>resp.send(error));
        // resp.send("new")
      }
      else{
        return resp.status(403).send({
            success: false,
            message: 'The Contact is already exist.'
        })
      }
    })
  .catch((error)=>resp.send(error));
  // ContactsModel.addContact(req.body)
  // .then((data)=>resp.send(data))
  // .catch((error)=>resp.send(error));
})

//2nd API "LIST ALL CONTACTS"...
router.post("/getList", JSONParsermid, function (req, resp) {
  ContactsModel.listContacts(req.body)
  .then((data)=>resp.send(data))
  .catch((error)=>resp.send(error));
})

//3rd API "LIST RECENT 5 CONTACTS"...
router.post("/getRecentList", JSONParsermid, function (req, resp) {
  ContactsModel.getTopContacts(req.body)
  .then((data)=>resp.send(data))
  .catch((error)=>resp.send(error));
})

module.exports = router;
