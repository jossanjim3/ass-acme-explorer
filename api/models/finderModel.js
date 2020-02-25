var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trips = require('./tripModel');

var trips_schema = trips.tripSchema;

var finderSchema = new Schema({
    explorer: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    keyword: {
        type: String,
        default: null
    },
    startingDate: {
        type: Date,
        default: null
    },
    endingDate: {
        type: Date,
        default: null
    },
    minPrice: {
        type: Number,
        default: null
    },
    maxPrice: {
        type: String,
        default: null
    },
    results: {
        type: [trips_schema]
    },
    timestamp: {
        type: Date
    }
}, {strict: false});

finderSchema.pre('save', function(callback){
    var timestamp = new Date();
    var newFinder = this;
    newFinder.timestamp = timestamp;

    callback();
});

module.exports = mongoose.model('Finders', finderSchema);