var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trips = require('./tripModel');

var trips_schema = trips.tripSchema;

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
}, {strict: false});

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
        required: 'Kindly enter the email of the actor',
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        minlength: 5,
        required: true
    },
    
    //address, language and phone are not mandatory therefore, they are not required
    address:  {
        type: String,
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
        contentType: String,
        default : ''
    },
    photo:  {
        data: Buffer,
        contentType: String
    },
    //all actors are validated initially, only an admin can modify this property an ban or unban an actor
    validated: {
        type: Boolean,
        default:true
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



/*
ActorSchema.pre('save', function(callback) {
    var actor = this;
  // Break out if the password hasn't changed
  if (!actor.isModified('password')) return callback();

  // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(actor.password, salt, function(err, hash) {
      if (err) return callback(err);
      actor.password = hash;
      //callback();
  
    });
  });
});
/*
  ActorSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
    console.log('verifying password in actorModel: '+password);
    if (err) return cb(err);
    console.log('iMatch: '+isMatch);
    cb(null, isMatch);
  });
};


});
*/

module.exports = mongoose.model('Actors', ActorSchema)
