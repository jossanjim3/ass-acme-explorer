'use strict';

var mongoose = require('mongoose'),
    Actor = mongoose.model('Actors'),
    Trip = mongoose.model('Trips'),
    Application = mongoose.model('Applications');

//----------------------------
// /v1/cargaMasiva
//----------------------------

// list all the applications
exports.loadData = function(req,res){
    Actor.find({},function(err, actors){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(actors.length);
        }
    });
};
