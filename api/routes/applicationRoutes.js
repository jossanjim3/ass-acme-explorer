'use strict';

module.exports = function (app){
    var applications = require('../controllers/applicationController');

     app.route('/v1/applications')
        // list all the applications
        .get(applications.list_all_applications)        
        // create an applicaction
        .post(applications.create_an_application);
    
    app.route('/v1/applications/:applicationId')
        // read an application
        .get(applications.read_an_application)
        // update an application status
        .put(applications.update_an_application)
        // delete an application. Currently an application cannot be deleted!
        .delete(applications.delete_an_application);
    
    app.route('/v1/applications/user/:userId')
        // list applications that explorers/manager have made
        .get(applications.list_all_my_applications);

    // TODO revisar si se podria incluir en otras rutas con foreach    
    app.route('/v1/applications/user/:userId/appli/:applicationId')
        // read an applications that explorer/manager manages
        .get(applications.read_an_application_by)
        // update an applications status that explorer/manager manages
        .put(applications.update_an_application_by);

    /**
     * Search engine for applications
     * Get applications depending on params
     *    RequiredRoles: Explorer o Manager
     */
    app.route('/v1/applications/search')
        // get application depends on parameters of search
        .get(applications.search_applications);

    
}