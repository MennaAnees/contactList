var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// contacts schema
var contacts = new Schema(
{
  email:{
    type:String,
    required:true,
    unique:true
  },
  mobile:{
    type:String,
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  userId:{
    type:Number,
    required:true,
  },
   date: { type: Date,
            default: Date.now
  }

});

// contacts plugins
// contacts.plugin(autoIncrement.plugin, 'contacts');

// register contacts model
mongoose.model("contacts",contacts);


var ContactsModel = {};

ContactsModel.model = mongoose.model("contacts");

ContactsModel.checkContact = function(contact){
  return ContactsModel.model.find({email:contact.email})
}

ContactsModel.addContact = function(contact){
  var contact = new ContactsModel.model(contact);
  return contact.save()
}

ContactsModel.listContacts = function(data){
  return ContactsModel.model.find({});
}

ContactsModel.getTopContacts = function(data){
  return ContactsModel.model.find({}).sort({date:-1}).limit(5)
}
module.exports = ContactsModel;
