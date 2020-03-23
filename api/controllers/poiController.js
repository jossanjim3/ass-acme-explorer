'use strict';

var mongoose = require('mongoose'),
    Poi = mongoose.model('Pois');

var authController = require('./authController');

//----------------------------
// /v3/pois
//----------------------------

exports.list_all_existing_pois = function(req,res){
    Poi.find({},function(err, pois){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(pois);
        }
    });
};

exports.create_a_poi = function(req,res){
    var new_poi = new Poi(req.body);
    new_poi.save(function(err, poi){
        if(err){
            if(err.name=='ValidationError'){
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        } else {
            res.json(poi)
        }
    });
};

//----------------------------
// /v3/pois/:poiId
//----------------------------

exports.read_a_poi = function(req,res){
    Poi.findOne({_id:req.params.poiId}, function(err, poi){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(poi)
        }
    })
}

exports.update_a_poi = function(req,res){
    Poi.findOneAndUpdate({_id:req.params.poiId}, req.body, {new:true} ,function(err, poi){
        if(err){
            if(err.name=='ValidationError'){
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        } else {
            res.json(poi)
        }
    })
}

exports.delete_a_poi = function(req,res){
    Poi.remove({_id:req.params.poiId}, function(err, poi){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(poi)
        }
    })
}

exports.updated_visit_poi = function(req,res){
    Poi.findOne({_id: req.params.poiId}, function(err, poi){
        if(err){
            //res.status(500).send(err);
            res.status(403);
            res.json("Poi cannot be updated. Poi does not exist!");
        } else {        

            if (poi != null){
                    poi.numberVisits = poi.numberVisits + 1;

                    poi.save(function(err, appli) {
                        if (err){
                            if(err.name=='ValidationError') {
                                res.status(422).send(err);
                            }
                            else{
                                res.status(500).send(err);
                            }
                        }
                        else{
                            res.json(poi);
                        }
                    });
            
            } else {
                res.status(403);
                res.json("Poi cannot be updated. Poi does not exist!");
            }
            
        }
    })      
}
