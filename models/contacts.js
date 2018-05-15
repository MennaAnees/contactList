const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const validator = require('validator');

// contacts schema
const contacts = new Schema(
{
  email:{
    type:String,
    required:true,
    validate: {
            validator : (email) => validator.isEmail(email),
            message : "NOT VALID EMAIL."
        }
  },
  mobile:{
    type:String,
    validate: {
            validator: (mobile) => validator.isMobilePhone(mobile, 'any'),
            message : "NOT VALID MOBILE NUMBER."
        },
  },
  firstName:{
    type:String,
    validate: {
            validator: (firstName) => validator.isAlpha(firstName),
            message : "ONLY ALPHABETICAL ALLOWED."
        },
    required:true
  },
  lastName:{
    type:String,
    required:true,
    validate: {
            validator: (firstName) => validator.isAlpha(firstName),
            message : "ONLY ALPHABETICAL ALLOWED."
        },
  },
  userId:{
    type:Number,
    enum:[1,2],
    required:true,
  },
   createdAt: { type: Date,
            default: Date.now
  }

});

// contacts plugins
// contacts.plugin(autoIncrement.plugin, 'contacts');


contacts.plugin(mongoosePaginate);


// ContactsModel.model = mongoose.model("contacts");

contacts.statics.checkContact = function(contact){
  return ContactsModel.find({email:contact.email,userId:contact.userId})
}

contacts.statics.addContact = function(contact){
  var contact = new ContactsModel({
        email:contact.email,
        mobile:contact.mobile,
        firstName:contact.firstName,
        lastName:contact.lastName,
        userId:contact.userId
    });
  return contact.save()
}

contacts.statics.listContacts = function(userId, pageNum, character){
  // const Contact = mongoose.model('contact');
  const startWith = new RegExp("^" + character, "i");

  return ContactsModel.paginate(
        {userId:userId, firstName:startWith},
        {sort:{firstName:1}, page: pageNum, limit: 5}
    );
  // return ContactsModel.find({});
}

contacts.statics.getTopContacts = function(data){
  return ContactsModel.find({}).sort({date:-1}).limit(5)
}

const ContactsModel = mongoose.model("contacts", contacts);

module.exports = ContactsModel;
