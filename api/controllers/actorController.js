'use strict';
/*---------------ACTOR----------------------*/
var mongoose = require('mongoose'),
    Actor = mongoose.model('Actors');

exports.list_all_trips = function(req,res){

        Actor.find({},function(err, actors){
            if(err){
                res.status(500).send(err);
            } else {
                res.json(actors);
            }
        });

};

exports.create_an_actor = function(req,res){
    var new_actor = new Actor(req.body);

    //checks that the user can register as explorer, manager (only an admin can create it) or sponsor
    new_actor.save(function(err, actor) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
            res.status(500).send(err);
            }
        }
        else{
            res.json(actor);
        }
    });
    
};

exports.read_an_actor = function(req,res){
    Actor.findById({_id:req.params.actorId}, function(err, actor){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(actor)
        }
    })
};

exports.update_an_actor = function(req,res){
    //Check that the user is the proper actor and if not: res.status(403); "an access token is valid, but requires more privileges"
    Actor.findOneAndUpdate({_id: req.params.actorId}, req.body, {new: true}, function(err, actor) {
        if (err){
          if(err.name=='ValidationError') {
              res.status(422).send(err);
          }
          else{
            res.status(500).send(err);
          }
        }
        else{
            res.json(actor);
        }
      });
};

exports.reactivate_an_actor = function(req, res) {
    //Check that the user is an Administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
    console.log("Validating an actor with id: "+req.params.actorId)
    Actor.findOneAndUpdate({_id: req.params.actorId},  { $set: {"validated": "true" }}, {new: true}, function(err, actor) {
        if (err){
        res.status(500).send(err);
        }
        else{
        res.json(actor);
        }
    });
};

exports.deactivate_an_actor = function(req, res) {
    //Check that the user is an Administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
    console.log("Validating an actor with id: "+req.params.actorId)
    Actor.findOneAndUpdate({_id: req.params.actorId},  { $set: {"validated": "false" }}, {new: true}, function(err, actor) {
        if (err){
        res.status(500).send(err);
        }
        else{
        res.json(actor);
        }
    });
};


exports.delete_an_actor = function(req,res){

    console.log("It is not possible to delete an actor")
    
}
