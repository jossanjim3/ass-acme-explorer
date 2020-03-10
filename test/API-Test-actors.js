const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
var mongoose = require('mongoose'),
Actor = mongoose.model('Actors');

const { expect } = chai;
chai.use(chaiHttp);

describe("API Testing actors", () => {

  it("Get Actor 1: request of an actor and  he/she exists", done => {
    var actorTest=new Actor({"id":"5e64e0cfe3de7324f8d46c97","role":"EXPLORER","validated":false,"name":"Miguel","surname":"Agudo","email":"esteMiguel@fakemail11.com","password":"abcdefghj","phone":"+34612345679","address":"myAddress"});
    chai
      .request(app)
      .get("/v1/actors/:"+actorTest.id).send(actorTest)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        if (err) done(err);
        else done();
      });
  });

  it("Get Actor 2: request of an actor but he/she does not exist", done => {
    chai
      .request(app)
      .get("/v1/actors/:actorId")
      .send({"actorId":"5e64e0cfe3de7324f8d46c97"})
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });


  it("Post Actor 1: request the post of an actor as an explorer", done => {
    chai
      .request(app)
      .post("/v1/actors")
      .send({"role":"EXPLORER","validated":false,"name":"Miguel","surname":"Agudo","email":"esteMiguel@fakemail11.com","password":"abcdefghj","phone":"+34612345679","address":"myAddress"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        //expect(res.body.status).to.equals("success");
        //expect(res.body.result).to.equals(10);
        if (err) done(err);
        else done();
      });
  });

  it("Post Actor 2: request the post of an actor as an administrator but it is not possible", done => {
    chai
      .request(app)
      .post("/v1/actors")
      .send({"preferredLanguage":"en","role":"ADMINISTRATOR","validated":false,"name":"Carlos","surname":"Agudo","email":"carlos@fakemail11.com","password":"$2b$05$fMPnmaTx6doE/ISNc/I1leKTQcwAegVmzMP6WtKZ2xKeFP89kOxvO","phone":"+34612345679","address":"myAddress"})
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
  
  it("Put Actor 1: request the modification of an actor", done => {
    chai
      .request(app)
      .put("/v1/actors/5e64e0cfe3de7324f8d46c97")
      .send({"name":"Fede"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        if (err) done(err);
        else done();
      });
    })

    it("Put Actor 2: request the modification of an actor,who is not the user", done => {
        chai
          .request(app)
          .put("/v1/actors/:5e64e0cfe3de7324f8d46c97")
          .send({"name":"Carlos"})
          .end((err, res) => {
            expect(res).to.have.status(403);
            done();
          });
      
      });


});