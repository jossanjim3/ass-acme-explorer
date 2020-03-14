const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
var mongoose = require('mongoose'),
Application = mongoose.model('Applications');

const { expect } = chai;
chai.use(chaiHttp);
describe("API Testing for Applications", () => {

  it("Get Applications", done => {
    chai
      .request(app)
      .get("/v1/applications")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        if (err) done(err);
        else done();
      });
  });


   it("Post Applications", done => {
    chai
      .request(app)
      .post("/v1/applications")
      .send({"explorer":"5e6cf4ef101524246076c60e","trip":"5e53fc4a751d483198be12cf"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        //expect(res.body.status).to.equals("success");
        //expect(res.body.result).to.equals(10);
        if (err) done(err);
        else done();
      });
  });  

});

