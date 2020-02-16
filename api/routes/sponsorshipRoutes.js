'use strict';
module.exports = function(app) {
    var sponsorship = require('../controllers/sponsorshipController');

    /**
     * Get all the sponsorships belonging to a sponsor.
     *    Required role: Sponsor
     * Create a sponsorship.
     *    Required role: Sponsor
     * 
     * @section sponsorships
     * @type get, post
     * @url /v1/sponsorships
     */
    app.route('/v1/sponsorships')
        .get(sponsorships.list_all_sponsorships)
        .post(sponsorships.create_a_sponsorship);


    /**
     * Get a sponsorship by id.
     *     Required role: Sponsor
     * Update a sponsorship:
     *     Required role: Sponsor.
     * Remove a sponsorship:
     *     Required role: Sponsor.
     * 
     * @section sponsorships
     * @type get, put, delete
     * @url /v1/sponsorship/:sponsorshipId
     */
    app.route('/v1/sponsorship/:sponsorshipId')
        .get(sponsorships.get_sponsorship)
        .put(sponsorships.update_sponsorship)
        .delete(sponsorships.remove_sponsorship);
};