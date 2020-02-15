'use strict';
module.exports = function(app) {
  var actors = require('../controllers/actorController');


  app.route('/v1/actors')
    //create an actor as an explorer or  as a manager (it must do it an admin)
    .post(actors.create_an_actor);
    
  app.route('/v1/actors/:actorId')

    //edit the personal data of the actor
	  .put(actors.update_an_actor);

  app.route('/v1/actors/:actorId/validated')
    //ban or unban an actor 
    .put(actors.modify_activate_an_actor);
  
 

};