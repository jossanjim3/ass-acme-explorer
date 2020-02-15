'use strict';
module.exports = function(app) {
  var actors = require('../controllers/actorController');


  app.route('/v1/actors')
    //list all trips
    .get(actors.list_all_trips)
    //create an actor as explorer or manager (it must do it an admin)
    .post(actors.create_an_actor);
    
  app.route('/v1/actors/:actorId')
    //read an actor
    .get(actors.read_an_actor)
    //edit the personal data of the actor
	  .put(actors.update_an_actor)

  app.route('/v1/actors/:actorId/validated')
  //Both methods can only be accessed by an admin
  //Deactivate an actor: validated set to false
  .put(actors.deactivate_an_actor)
  //Reactivate an actor: validated set to true
  .put(actors.reactivate_an_actor)
};