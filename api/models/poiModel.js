'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PoiSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    title:  {
        type: String,
        required: 'Kindly enter the the title of the POI!'
    },
    description:  {
        type: String,
        required: 'Kindly enter the description of the POI!',
    },
    coordinates: {
        type: String
    },
    type: {
        type: String,
        //enum: ['RESTAURANT','TOURIST ATRACTION','PUBS','PARKING']
        },
      
    trip: {
            type: Schema.Types.ObjectId,
            required: 'trip id required'
        },

    stage: {
        type: Schema.Types.ObjectId,
        required: 'stage id required'
    },
    
    numberVisits : {
        type : Number,
        default : 0
    }

}, {strict:false});

// Execute before each item.save() call
PoiSchema.pre('save', function(callback) {

    
    // do nothing at the moment
    callback();
});

module.exports = mongoose.model('Pois', PoiSchema)