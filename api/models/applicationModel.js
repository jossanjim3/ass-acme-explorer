'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ApplicationSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    status:  {
        type: String,
        enum: ['PENDING','REJECTED','DUE','ACCEPTED','CANCELLED'],
        required: 'Kindly enter the status of the application',
        default : 'PENDING' // initial status always PENDING
    },
    comment:  {
        type: String,
    },
    explorer: {
        type: Schema.Types.ObjectId,
        required: 'explorer id required'
    },
    trip: {
        type: Schema.Types.ObjectId,
        required: 'trip id required'
    },

}, {strict:false});

// Execute before each item.save() call
ApplicationSchema.pre('save', function(callback) {
    // do nothing at the moment
    callback();
});

module.exports = mongoose.model('Applications', ApplicationSchema)