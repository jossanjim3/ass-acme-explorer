'use strict';

module.exports = function (app){
    var trips = require('../controllers/tripController');

    app.route('/trips')
        .get(trips.list_all_trips)
        .post(trips.create_an_trip);
    
    app.route('/trips/:tripId')
        .get(trips.read_an_trip)
        .put(trips.update_an_trip)
        .delete(trips.delete_an_trip);

}