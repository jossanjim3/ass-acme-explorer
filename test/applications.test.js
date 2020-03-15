const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
var mongoose = require('mongoose'),
Application = mongoose.model('Applications');

const { expect } = chai;
chai.use(chaiHttp);
describe("API Testing for Applications", () => {

  // TODO hacer mock para que no interfiera los datos de BB.DD. con los de test...



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

  it("Get One Application", done => {
    chai
      .request(app)
      .get("/v1/applications/5e53fc6c751d483198be12d2")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        if (err) done(err);
        else done();
      });
  });


  it("Update One Application", done => {
    chai
      .request(app)
      .put("/v1/applications/5e53fc6c751d483198be12d2")
      .end((err, res) => {
        expect(res).to.have.status(201);
        //expect(res.body.status).to.equals("success");
        //expect(res.body.result).to.equals(10);
        if (err) done(err);
        else done();
      });
  }); 
  
  it("Delete One Application", done => {
    chai
      .request(app)
      .delete("/v1/applications/5e53fc6c751d483198be12d2")
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect('Content-Type', /json/);
        if (err) done(err);
        else done();
      });
  });

  it("Cancel One Application", done => {
    chai
      .request(app)
      .put("/v1/applications/5e53fc6c751d483198be12d2/cancel")
      .end((err, res) => {
        expect(res).to.have.status(201);
        //expect(res.body.status).to.equals("success");
        //expect(res.body.result).to.equals(10);
        if (err) done(err);
        else done();
      });
  });   

  it("Get Applications that explorer have made", done => {
    chai
      .request(app)
      .get("/v1/applications/users/5e4bb6ab6da69a2bdcd19e01")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        if (err) done(err);
        else done();
      });
  });

  it("Get Applications from a Trip", done => {
    chai
      .request(app)
      .get("/v1/applications/trips/5e53fc4a751d483198be12cf")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        if (err) done(err);
        else done();
      });
  });

});

