'use strict';
/*---------------SPONSORSHIP----------------------*/

var mongoose = require('mongoose'),
    Sponsorship = require('../models/sponsorshipModel');

exports.list_all_sponsorships = function(req, res){
    //Check if the role param exist
    /*var roleName;

    if(req.query.role){
        roleName=req.query.role;
    }

    if(!roleName.contains('SPONSOR'))
        res.status(403).json({message: 'The actor must be a sponsor.'})
    */
    Sponsorship.find({},function(err, sponsorships){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(sponsorships);
        }
    });
}

exports.create_a_sponsorship = function(req, res){
    var new_sponsorship = new Sponsorship(req.body);

    

    /*if(!new_sponsorship.actor.role.includes("SPONSOR")){
        res.status(422).json({message: "In order to manage a sponsorship, the actor needs to be a sponsor."})
    }*/
    //else{
        new_sponsorship.save(function(err, sponsorship){
            if(err){
                res.status(500);
            } else {
                res.status(201).json(sponsorship);
            }
        });
    //}
};

exports.find_a_sponsorship = function(req, res){
    Sponsorship.findById(req.params.sponsorshipId, function(err, sponsorship){
        if(err){
            res.status(500).send(err);
        }
        else{
            if(res === null)
                res.status(404).send({message: 'Sponsorship not found.'});
            
            else
                res.status(200).send(sponsorship);
        }
    });
}

exports.update_a_sponsorship = function(req, res){
    Sponsorship.findOneAndUpdate({_id: req.params.sponsorshipId}, req.body, {new: true}, function(err, sponsorship){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(204).json({message: "Sponsorship Updated"});
        }
    });
}

exports.delete_a_sponsorship = function(req, res){
    Sponsorship.deleteOne({_id: req.params.sponsorshipId}, function(err, sponsorship) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(202).json({message: "Sponsorship Deleted"});
        }
    });
}

//Por terminar
exports.list_sponsorships_sponsor = function(req, res){
    Sponsorship.find({actor: req.params.sponsorId}, function(err, actor) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(actor);
        }
    });
}

//Por terminar.
exports.find_sponsorships_trip = function(req, res){
    Sponsorship.find({id: req.params.tripId}, function(err, actor) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(actor);
        }
    });
}

exports.pay_sponsorships_trip = function(req, res){
    var sponsorshipId = req.params.sponsorshipId;
    var tripId = req.params.tripId;

    Sponsorship.findOne({_id: sponsorshipId}, function(err, sponsorship){
        if(err){
            res.sendStatus(500);
        }
        else{
            if(sponsorship === null)
                res.status(404).json({message: 'Sponsorship not found.'});

            else{
                var sponsorshipReceived = sponsorship;
                var tripToChange = sponsorshipReceived.tripSponsorships.filter((obj) => {
                    return obj.trip == tripId;
                });
                if(tripToChange.length < 1)
                    res.status(404).json({message: 'Trip not found in this sponsorship.'});

                else{
                    var indexOfChange = sponsorshipReceived.tripSponsorships.indexOf(tripToChange[0]);
                    if(sponsorshipReceived.tripSponsorships[indexOfChange].paid == true){
                        res.status(422).json({message: 'Sponsorship already paid.'});
                    }
                    else{
                        sponsorshipReceived.tripSponsorships[indexOfChange].paid = true;
                        Sponsorship.updateOne({_id: sponsorshipId}, sponsorshipReceived, function(err, sponsorship){
                            if(err){
                                res.status(500);
                            }
                            else{
                                res.status(204).json({message: "Sponsorship paid."});
                            }
                        });
                    }
                }
            }
        }
    });
}

exports.cancel_sponsorships_trip = function(req, res){
    res.send("Sponsorship, canceled");
}