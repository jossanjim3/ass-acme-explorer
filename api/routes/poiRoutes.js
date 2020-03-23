'use strict';

module.exports = function (app){
    var pois = require('../controllers/poiController');
    var authController = require('../controllers/authController');

    app.route('/v3/pois')
        // list all the pois
        .get(pois.list_all_existing_pois) 
        .post(pois.create_a_poi)  
    
    app.route('/v3/pois/:poiId')
        // list all the pois
        .get(pois.read_a_poi)
        .put(pois.update_a_poi)
        .delete(pois.delete_a_poi)
        
    app.route('/v3/pois/:poiId/visited')
        // list all the pois
        .put(pois.updated_visit_poi)
        
    //authorized

    app.route('/v4/pois')
        .post(authController.verifyUser(["MANAGER","ADMINISTRATOR"]),pois.create_a_poi)  

    app.route('/v4/pois/:poiId')
        // list all the pois
        .get(authController.verifyUser(["ADMINISTRATOR"]),pois.read_a_poi)
        .put(authController.verifyUser(["ADMINISTRATOR"]),pois.update_a_poi)
        .delete(authController.verifyUser(["ADMINISTRATOR"]),pois.delete_a_poi)

}