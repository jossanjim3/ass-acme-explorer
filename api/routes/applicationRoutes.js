'use strict';

module.exports = function (app){
    var applications = require('../controllers/applicationController');

    app.route('/v1/applications')
        // list all the applications
        .get(applications.list_all_applications)        
        // create an applicaction
        .post(applications.create_an_application);
    
    /**
     * Search engine for applications
     * Get applications depending on params
     *    RequiredRoles: Explorer o Manager
     */
    app.route('/v1/applications/search')
        // get application depends on parameters of search
        .get(applications.search_applications);

    app.route('/v1/applications/:applicationId')
        // read an application
        .get(applications.read_an_application)
        // update an application status
        .put(applications.update_an_application)
        // delete an application. Currently an application cannot be deleted!
        .delete(applications.delete_an_application);  

    app.route('/v1/applications/:applicationId/cancel')
        // update an application status to rejected by manager or cancelled by explorer
        .put(applications.cancel_an_application);

    app.route('/v1/applications/users/:userId')
        // list applications that explorers have made
        .get(applications.list_all_my_applications);

    app.route('/v1/applications/trips/:tripId')
        // list applications from a trip
        .get(applications.list_all_trip_applications);
   
}