var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trips = require('./tripModel');

var trips_schema = trips.tripSchema;

var FinderSchema = new Schema({
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
        type: [trips_schema],
        default: null
    },
    timestamp: {
        type: Date
    }
}, {strict: false});


module.exports = mongoose.model('Finders', FinderSchema)