var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trips_schema = require('./tripModel')

var FinderSchema = new Schema({
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
})

var ActorSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the actor'
    },
    surname:  {
        type: String,
        required: 'Kindly enter the surname of the actor'
    },
    email:  {
        type: String,
        required: 'Kindly enter the email of the actor'
    },
    password:{
        type: String,
        minlength: 5,
        required: true
    },
    address:  {
        type: String,
        required: 'Kindly enter the adress of the actor'
    },
    language:  {
        type: String,
        default: 'en'
    },
    phone:  {
        type: String,
        required: 'Kindly enter the phone of the actor'
    },
    photo:  {
        data: Buffer,
        contentType: String
    },
    activated: {
        type: Boolean,
        default: false
    },
    role:[{
        type: String,
        required: 'Kindly enter the role(s) of the actor',
        enum: ['EXPLORER', 'MANAGER', 'ADMINISTRATOR', 'SPONSOR']
    }],
    createdAt:{
        type: Date,
        default: Date.now
    },
    finder: {
        type: FinderSchema,
        default: null
    }

}, {strict:false});

// Execute before each item.save() call
ActorSchema.pre('save', function(callback) {
    callback();
});

module.exports = mongoose.model('Actors', ActorSchema)