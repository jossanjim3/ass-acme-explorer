'use strict';
/*---------------ACTOR----------------------*/
var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
Actor = mongoose.model('Actors');


exports.create_an_actor = function(req,res){
    var new_actor = new Actor(req.body);

    //checks that the user can register as explorer, manager (only an admin can create it) or sponsor
    if(new_actor.role.includes('ADMINISTRATOR')){
        res.status(422).send("No se puede crear un administrador")
    }else if (new_actor.role.includes('MANAGER')){
        /* implementar manager por ahora sin restriccion
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
       new_actor.save(function(err, actor) {
        if (err){

            res.status(500).send(err);
        }
        else{
            res.json(actor);
        }
    });
       
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

exports.read_an_actor=function(req,res){
    
    Actor.findById(req.body.id, function(err,actor){

        if(err){
            res.status(500).send(err);

        }else if(actor === null){

            res.status(404).send("No existe ese actor");

        }else{
            res.json(actor);
        }
    })
}

exports.delete_an_actor = function(req, res) {
    Actor.deleteOne({_id: req.params.actorId}, function(err, actor) {
        if (err){
            res.status(500).send(err);
        }
        else{
            res.json({ message: 'This actor  was successfully deleted' });
            //res.json(actor); the actor deleted is sent just in case that he/she didn't want to delete that actor and he/she can see what it is being deleted.
        }
    });
};


exports.update_an_actor = function(req,res){
    //Check that the user is the proper actor and if not: res.status(403); "an access token is valid, but requires more privileges"
    var actor_body=req.body;
    var promise_hash = new Promise((resolve,reject)=>{
        if(actor_body.password!=undefined){
            bcrypt.genSalt(5, function(err, salt) {
                if (err) reject(err);
            
                bcrypt.hash(actor_body.password, salt, function(err, hash) {
                  if (err) reject(err);
                  actor_body.password = hash;
                  resolve(actor_body)
                });
              });
         }else{
             resolve(actor_body)
         }
    })
    
    promise_hash.then((actor_body)=>{

        Actor.findOneAndUpdate({_id: req.params.actorId}, actor_body, {new: true}, function(err, actor) {
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
    }).catch(function(err){
        res.status(err).send(err);
    })

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


exports.updateFinder = function(req, res) {
    if(!req.params.role.contains('EXPLORER')){
        res.status(422).json({message: 'The actor must be an explorer.'})
    }
    else{
        var newFinder = req.body;
        newFinder.timestamp = new Date();
    }
}