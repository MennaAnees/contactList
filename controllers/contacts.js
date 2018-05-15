var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var ContactsModel = require("../models/contacts");


//1st API "ADD NEW CONTACT"...
router.post("/addContact",function (req, resp) {
  ContactsModel.checkContact(req.body)
  .then((data)=>{
     if(data.length === 0){
       ContactsModel.addContact(req.body)
       .then((contact)=>resp.send({
             statusCode : 200,
             message : "Contact added successfuly.",
             data : contact
         }))
       .catch((error)=>resp.send(error));
      }
      else{
        return resp.status(403).send({
            success: false,
            message: 'The Contact is already exist.'
        })
      }
    })
  .catch((error)=>resp.send(error));
})

//2nd API "LIST ALL CONTACTS"...
router.post("/getList",function (req, resp) {
  const pageNum = req.body.pageNum;
    const character = req.body.character;

  ContactsModel.listContacts(req.body.userId, pageNum , character)
  .then((contacts)=>resp.send({
        statusCode : 200,
        message : "List Contacts successfully.",
        data : contacts
    }))
  .catch((error)=>resp.send(error));
})

//3rd API "LIST RECENT 5 CONTACTS"...
router.post("/getRecentList",function (req, resp) {
  ContactsModel.getTopContacts(req.body)
  .then((contacts)=>resp.send({
        statusCode : 200,
        message : "List Recent Contacts successfully.",
        data : contacts
    }))
  .catch((error)=>resp.send(error));
})

module.exports = router;
