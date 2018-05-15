contactList
  3 APIS to add and view contacts using:
   -NodeJs express framework
   -mongodb

Getting started
to run the project on your local machine follow the steps:

  1-Prerequisites:  
    -node v8.10.0
    -mongodb v3.2.19

  2-To Install:
    -clone the repo
    -inside the project run : npm install
    -create a database named : contactList
    -run the mongod server with --auth option : mongod --auth


  3- To Run server :
     npm start

Description of 3 APIS:

    -1st API: ADD NEW CONTACT

    route :/contacts/addContact
    method : post
    body : { email : String,
             mobileNumber : String,
             firstName : String,
             lastName : String,
             auth : String,
             deviceToken : String,
             fingerPrint : String }

    -2nd API : LIST CONTACTS

    route :/contacts/getList
    method : post
    body : { pageNum : Number,
             character : String,
             auth : String,
             deviceToken : String,
             fingerPrint : String }

     -3rd API : LIST RECENT Contacts

    route: /contacts/getRecentList
    method : post
    body : { auth : String,
             deviceToken : String,
             fingerPrint : String }

  auth.json file contains (auth,deviceToken,fingerPrint) used for authorizations           
