const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
var mongoose = require('mongoose'),
Actor = mongoose.model('Actors');

const { expect } = chai;
chai.use(chaiHttp);

describe("API Testing actors", () => {



  it("Get Actor 1: request of an actor and  he/she exists", done => {
    chai
      .request(app)
      .get("/v1/actors/:actorId")
      .send({"_id":"5e64e0cfe3de7324f8d46c97"})
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
      .send({"_id":"5e64e0cfe3de7324f8d46c"})
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });


  it("Post Actor 1: request the post of an actor as an explorer", done => {
    chai
      .request(app)
      .post("/v1/actors")
      .send({"preferredLanguage":"en","role":["EXPLORER"],"validated":false,"name":"Carlos","surname":"Agudo","email":"carlos@fakemail11.com","password":"$2b$05$fMPnmaTx6doE/ISNc/I1leKTQcwAegVmzMP6WtKZ2xKeFP89kOxvO","phone":"+34612345679","address":"myAddress"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        //expect(res.body.status).to.equals("success");
        //expect(res.body.result).to.equals(10);
        if (err) done(err);
        else done();
      });
  });

  it("Post Actor 2: request the post of an actor as a manager but the user is not authorized", done => {
    chai
      .request(app)
      .post("/v1/actors")
      .send({"preferredLanguage":"en","role":["MANAGER"],"validated":false,"name":"Carlos","surname":"Agudo","email":"carlos@fakemail11.com","password":"$2b$05$fMPnmaTx6doE/ISNc/I1leKTQcwAegVmzMP6WtKZ2xKeFP89kOxvO","phone":"+34612345679","address":"myAddress"})
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it("Put Actor 1: request the modification of an actor", done => {
    chai
      .request(app)
      .put("/v1/actors/:actorId")
      .send({"_id":"5e64e0cfe3de7324f8d46c97","name":"Carlos"})
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
          .post("/v1/actors/:actorId")
          .send({"_id":"5e5b9d48ca84490728e4a1c1","name":"Carlos"})
          .end((err, res) => {
            expect(res).to.have.status(403);
            done();
          });
      });


});