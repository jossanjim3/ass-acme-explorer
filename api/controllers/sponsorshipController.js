'use strict';
/*---------------SPONSORSHIP----------------------*/

var mongoose = require('mongoose');
    Sponsorship = mongoose.model('Sponsorships');

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
            res.send(err)
        } else {
            res.json(sponsorship)
        }
    });
};

exports.find_a_sponsorship = function(req, res){
    Sponsorship.findById({_id: req.params.sponsorshipId}, req.body, {new: true}, function(req, res){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json(actor);
        }
    });
}

exports.update_a_sponsorship = function(req, res){
    Sponsorship.findOneAndUpdate({_id: req.params.sponsorshipId}, req.body, {new: true}, function(req, res){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json(actor);
        }
    });
}

exports.delete_a_sponsorship = function(req, res){
    Sponsorship.deleteOne({_id: req.params.sponsorshipId}, function(req, res) {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.json(actor);
        }
    });
}