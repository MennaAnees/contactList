const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const contactModel = require('../models/contacts');

describe("Contacts Controller", () => {

    beforeEach((done) => {
        contactModel.remove({email:"test@gmail.com"}).then(() => done());
    });

    it("test: /contacts/addContact ", (done) => {
        request(app)
          .post('/contacts/addContact')
          .send({
              email:"test@gmail.com",
              firstName:"test",
              lastName:"test",
              mobile:"01111111111",
              userId:1,
              auth:"a",
              deviceToken:"aa",
              fingerPrint:"aaa"
          })
          .end((err, res) => {
              assert(res.body.statusCode === 200);
              contactModel.findOne({email:"test@gmail.com"}).then(contact => {
                  assert(contact.mobile === "01111111111");
                  done();
              });
          });
    });

    it(" test /contacts/getList", (done) => {
        request(app)
          .post('/contacts/getList')
          .send({
              pageNum:1,
              character:"m",
              auth:"a",
              deviceToken:"aa",
              fingerPrint:"aaa"
          })
          .end((err, res) => {
              assert(res.body.data.docs[0].firstName == "menna");
              done();
          })
    });

    it("test: /contacts/getRecentList", (done) => {
        request(app)
          .post('/contacts/getRecentList')
          .send({
            auth:"a",
            deviceToken:"aa",
            fingerPrint:"aaa"
          })
          .end((err, res) => {
              done();
          });
    });
});
