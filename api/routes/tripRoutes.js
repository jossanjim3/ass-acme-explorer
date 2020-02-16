'use strict';

module.exports = function (app){
    var trips = require('../controllers/tripController');
    /** 
     * Post an trip
     *   RequiredRoles: to be a Manager
     *
     * @section trips
     * @type post
     * @url /v1/trips
     */
    app.route('/v1/trips')
        .post(trips.create_an_trip);

    /** 
    * Search trips
     *   
     * @section trips
     * @type get
     * @url /v1/trips/search
     * @param {string} keyword
     */
    app.route('/v1/trips/search')
        .get(trips.search_trips);

    /**
     * Read, modify and delete a trip
     *   RequiredRoles: to be a Manager for modify and delete
     * @section trips
     * @type get put delete
     * @url /v1/trips/:ticker
     */
    app.route('/v1/trips/:ticker')
        .get(trips.read_an_trip_ticker)
        .put(trips.update_an_trip_ticker)
        .delete(trips.delete_an_trip_ticker);

    /**
     * Publish an trip
     *   RequiredRoles: to be a Manager
     * 
     * @section trips
     * @type put
     * @url /v1/trips/:ticker
     */
    app.route('/v1/trips/:ticker/publish')
        .put(trips.publish_an_trip);
    
    /** 
     * Cancel an trip
     *   RequiredRoles: to be a Manager
     *
     * @section trips
     * @type put
     * @url /v1/trips/:ticker/cancel
     */
    app.route('/v1/trips/:ticker/cancel')
        .put(trips.cancel_an_trip);

}