var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actorSchema = require('./actorModel');
var tripSchema = require('./tripModel');

var sponsorshipSchema = new Schema({
    banner: {
        type: Buffer,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});