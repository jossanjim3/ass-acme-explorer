const app = require("../app");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");

const route = "/v1/sponsorships"
const idSponsor = "5e4d890645dd27745b5f6e81";
const sponsorship = ""

chai.use(chaiHttp);
describe("Tests on Sponsorships", () => {
    describe("Tests on GET", () => {
        it("Gets all Sponsorships", done => {
            chai
            .request(app)
            .get(route)
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
        it("Gets sponsorship by ID", done => {
            chai
            .request(app)
            .get(route + "/")
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    });
    describe("POST", () => {
        it("Create Sponsorship", done =>{
            chai
            .request(app)
            .put(route + explorers + "/" + idSponsor)
            .send({
                keyword: "Hawai",
                startDate: "2021"
            })
            .end((err, res) => {
                expect(res).to.have.any.status(200, 201);
                done();
            });
        });
    });
    describe("PUT", done => {
        it("Update sponsorship", done =>{
            
        });
    });
    describe("DELETE", () => {
        it("Delete finder by sponsor ID", done =>{
            chai
            .request(app)
            .delete(route + explorers + "/" + idSponsor)
            .end((err, res) => {
                expect(res).to.have.status(200);
                //expect(res).to.have({message: "Finder eliminado."});
                done();
            });
        });
    });
});