const app = require("../app");
const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const route = "/v1/finders"


chai.use(chaiHttp);
describe("Tests on finder", () => {
    describe("Tests on finder", () => {
        describe("Tests on GET", () => {
            it("Gets all finders", done => {
                chai
                .request(app)
                .get(route)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
            });
            it("Gets all finders", done => {
                chai
                .request(app)
                .get(route + "/")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
            });
        });
        describe("Tests on PUT or CREATE", () => {
            
        });
        describe("Tests on DELETE", () => {

        });
    });
});