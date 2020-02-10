var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Status =  {
    PENDING : 'PENDING',
    REJECTED : 'REJECTED',
    DUE : 'DUE',
    ACCEPTED : 'ACCEPTED',
    CANCELLED : 'CANCELLED'
}

var applicationSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    status:  {
        type: Status,
        required: 'Kindly enter the status of the application'
    },
    comment:  {
        type: String,
    },

}, {strict:false});

module.exports = mongoose.model('Application', applicationSchema)