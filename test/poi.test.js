const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
var mongoose = require('mongoose'),
Actor = mongoose.model('Actors'),
Trip = mongoose.model('Trips'),
Poi = mongoose.model('Pois');

const { expect } = chai;
chai.use(chaiHttp);

describe("API Testing for Pois", () => {

  // hacer mock para que no interfiera los datos de BB.DD. con los de test...
  let explorerTest;
  let managerTest;
  let tripTest;
  let poiIdTmp;
  let applicationTest;     
    
  // este bloque se ejecuta antes de todo
  before( (done) => {

    explorerTest = new Actor(
      {
        "name": "testExplorer",
        "surname": "testExplorer",
        "email": "testExplorer@gmail.com",
        "password": "testExplorer",
        "phone": "+34666555987",
        "role": "EXPLORER"
      }
    );
    explorerTest.save(function (err) {
      if (err) return handleError(err);
      // saved!
      console.log("Explorer test saved! : " + explorerTest._id);
    });  

    managerTest = new Actor(
      {
        "name": "testManager",
        "surname": "testManager",
        "email": "testManager@gmail.com",
        "password": "testManager",
        "phone": "+34666555987",
        "role": "MANAGER"
      }
    );
    managerTest.save(function (err,res) {
      if (err) return handleError(err);
      // saved!
      console.log("Manager test saved! : " + managerTest._id);
    }); 

    tripTest = new Trip(
      {
        "title": "Trip Test",
        "description": "Trip Test Description",
        "price": 200,
        "requeriments": ["Ser mayor de edad", "No se permite fumar"],
        "startDate": "2020-03-28",
        "endDate": "2020-03-31",
        "stages": [
            {
              "title": "Viaje Test stages",
              "description": "Viaje Test stages description",
              "price": 200
            }
          ],
        "isPublished" : true,
        "manager": managerTest._id
      }
    );
    tripTest.save(function (err) {
      if (err) return handleError(err);
      // saved!
      console.log("Trip test saved! : " + tripTest._id);
    }); 

    done();
  });

  it("Get all pois",  function (done) {
    
    chai
      .request(app)
      .get("/v3/pois")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        if (err) {
          done(err);
        } else {         
          done();
          
        }
      });
  });

  it("Post Poi", (done) => {
    chai
      .request(app)
      .post("/v3/pois")
      .send({
        "title" : "Poi title test",
        "description" : "Poi description test",
        "coordinates" : "41°24'12.2N - 2°10'26.5E",
        "type" : "Restaurant",
        "trip": tripTest._id,
        "stage": tripTest.stages[0]._id
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        //expect(res.body.status).to.equals("success");
        //expect(res.body.result).to.equals(10);
        if (err) {
          done(err);
        } else {
          poiIdTmp = res.body._id;
          //console.log(poiIdTmp);          
          done();
          
        }
      });          
  });     
  
  it("Get One Poi", done => {
    chai
      .request(app)
      .get("/v3/pois/" + poiIdTmp)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        if (err) done(err);
        else done();
      });
  });


  it("Update One poi", done => {
    chai
      .request(app)
      .put("/v3/pois/" + poiIdTmp)
      .end((err, res) => {
        expect(res).to.have.status(200);
        //expect(res.body.status).to.equals("success");
        //expect(res.body.result).to.equals(10);
        if (err) done(err);
        else done();
      });
  }); 

  it("Update One poi visit", done => {
    chai
      .request(app)
      .put("/v3/pois/" + poiIdTmp + "/visited")
      .end((err, res) => {
        expect(res).to.have.status(200);
        //expect(res.body.status).to.equals("success");
        //expect(res.body.result).to.equals(10);
        if (err) done(err);
        else done();
      });
  }); 
 

  it("Delete One poi", done => {
    chai
      .request(app)
      .delete("/v3/pois/" + poiIdTmp)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect('Content-Type', /json/);
        if (err) done(err);
        else done();
      });
  });
  

  // este bloque se ejecuta despues de todo
  after( (done) => {
    //console.log(applicationTest._id);

    Trip.deleteOne({ _id: tripTest._id }, function (err) {
      if (err) return handleError(err);
      else "Trip Test deleted!";
    });

    Actor.deleteOne({ _id: explorerTest._id }, function (err) {
      if (err) return handleError(err);
      else "Explorer Test deleted!";
    });

    Actor.deleteOne({ _id: managerTest._id }, function (err) {
      if (err) return handleError(err);
      else "Manager Test deleted!";
    });

    done();
  });

});

