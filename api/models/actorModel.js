var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actorSchema = new Schema({
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
    validated: {
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
    }

}, {strict:false});

module.exports = mongoose.model('Actors', actorSchema)