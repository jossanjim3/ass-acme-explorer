'use strict';
/*---------------SPONSORSHIP----------------------*/

var mongoose = require('mongoose'),
    Sponsorship = require('../models/sponsorshipModel')

exports.list_all_sponsorships = function(req, res){
    //Check if the role param exist
    var roleName;

    if(req.query.role){
        roleName=req.query.role;
    }

    if(!roleName.contains('SPONSOR'))
        res.status(403).json({message: 'The actor must be a sponsor.'})

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
    new_sponsorship.save(function(err, sponsorship){
        if(err){
            res.sendStatus(500);
        } else {
            res.sendStatus(201).json(sponsorship);
        }
    });
};

exports.find_a_sponsorship = function(req, res){
    Sponsorship.findById({_id: req.params.sponsorshipId}, req.body, {new: true}, function(req, res){
        if(err){
            res.status(500).send(err);
        }
        else{
            if(res == null)
                res.sendStatus(404).json({message: 'Sponsorship not found.'});
            
            else
                res.sendStatus(200).json(actor);
        }
    });
}

exports.update_a_sponsorship = function(req, res){
    Sponsorship.findOneAndUpdate({_id: req.params.sponsorshipId}, req.body, {new: true}, function(req, res){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.sendStatus(204).json(actor);
        }
    });
}

exports.delete_a_sponsorship = function(req, res){
    Sponsorship.deleteOne({_id: req.params.sponsorshipId}, function(req, res) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.sendStatus(202).json(actor);
        }
    });
}

//Por terminar
exports.list_sponsorships_sponsor = function(req, res){
    Sponsorship.find({actor: req.params.sponsorId}, function(req, res) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json(actor);
        }
    });
}

//Por terminar.
exports.find_sponsorships_trip = function(req, res){
    Sponsorship.find({id: req.params.tripId}, function(req, res) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json(actor);
        }
    });
}

exports.pay_sponsorships_trip = function(req, res){
    var sponsorshipId = req.params.sponsorshipId;
    var tripId = req.params.tripId;

    Sponsorship.findOne({_id: sponsorshipId}, function(req, res){
        if(err){
            res.sendStatus(500);
        }
        else{
            if(res == null)
                res.sendStatus(404).json({message: 'Sponsorship not found.'});

            else{
                sponsorshipReceived = res;
                var indexOfTripToChange = sponsorshipReceived.tripSponsorships.indexOf(trip == tripId);
                
                if(indexOfTripToChange == -1)
                    res.sendStatus(404).json({message: 'Trip not found in this sponsorship.'});

                else{
                    if(sponsorshipReceived[indexOfTripToChange].paid == true){
                        res.sendStatus(422).json({message: 'Sponsorship already paid.'});
                    }
                    else{
                        sponsorshipReceived[indexOfTripToChange].paid = true;
                        Sponsorship.updateOne({_id: sponsorshipId}, sponsorshipReceived, function(req, res){
                            if(err){
                                res.sendStatus(500);
                            }
                            else{
                                res.sendStatus(204).json(sponsorshipReceived);
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