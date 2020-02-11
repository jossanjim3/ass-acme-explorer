var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    status:  {
        type: String,
        enum: ['PENDING','REJECTED','DUE','ACCEPTED','CANCELLED'],
        required: 'Kindly enter the status of the application'
    },
    comment:  {
        type: String,
    },

}, {strict:false});

module.exports = mongoose.model('Applications', applicationSchema)