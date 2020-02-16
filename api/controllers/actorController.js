'use strict';
/*---------------ACTOR----------------------*/
var mongoose = require('mongoose'),
    Actor = mongoose.model('Actors');


exports.create_an_actor = function(req,res){
    var new_actor = new Actor(req.body);

    //checks that the user can register as explorer, manager (only an admin can create it) or sponsor
    if(new_actor.role.includes('ADMINISTRATOR')){
        res.status(422).send("No se puede crear un administrador")
    }else if (new_actor.role.includes('MANAGER')){
        /*
        if(auth admin){
            new_actor.save(function(err, actor){
                if (err){
                    res.status(500).send(err);
                }else{
                    res.json(actor)
                }
            }
        }
        */  
    }else{
        new_actor.save(function(err, actor) {
            if (err){

                res.status(500).send(err);
            }
            else{
                res.json(actor);
            }
        });
    }
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

exports.modify_activate_an_actor = function(req, res) {
    
    if (req.body.validated.includes("true")){
        console.log("Unbanning an actor with id: "+req.params.actorId)
    }else{
        console.log("Banning an actor with id: "+req.params.actorId)
    }
    
    //Check that the user is an Administrator and if not: res.status(403); "an access token is valid, but requires more privileges"
    //if(auth admin){
    Actor.findOneAndUpdate({_id: req.params.actorId},  { $set: {"validated":req.body.validated }}, {new: true}, function(err, actor) {
        if (err){
        res.status(500).send(err);
        }
        else{
        res.json(actor);
        }
    });
    //}else{: res.status(403).send("You are not authenticated as an administrator therefore this operation is invalid")}
};




