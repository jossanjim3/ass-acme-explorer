'use strict';

var mongoose = require('mongoose'),
Trip = mongoose.model('Trips')


exports.list_all_trips = function(req,res){
    Trip.find({},function(err, trips){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(trips);
        }
    });
}

exports.search_trips = function(req,res){
    res.send("Trips returned from the trips search");
}

exports.create_an_trip = function(req,res){
    var new_trip = new Trip(req.body);
    new_trip.save(function(err, trip){
        if(err){
            if(err.name=='ValidationError'){
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        } else {
            res.json(trip)
        }
    });
}

exports.update_an_trip_ticker = function(req,res){
    Trip.findOneAndUpdate({ticker:req.params.ticker}, req.body, {new:true} ,function(err, trip){
        if(err){
            if(err.name=='ValidationError'){
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        } else {
            res.json(trip)
        }
    })
}

exports.read_an_trip_ticker = function(req,res){
    Trip.findOne({ticker:req.params.ticker}, function(err, trip){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(trip)
        }
    })
}

exports.delete_an_trip_ticker = function(req,res){
    Trip.remove({ticker:req.params.ticker}, function(err, trip){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(trip)
        }
    })
}

exports.publish_an_trip = function(req,res){
    Trip.findOneAndUpdate({ticker:req.params.ticker}, {isPublished:true}, {new:true} ,function(err, trip){
        if(err){
            if(err.name=='ValidationError'){
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        } else {
            res.json(trip)
        }
    })
}

exports.cancel_an_trip = function(req,res){
    Trip.findOneAndUpdate({ticker:req.params.ticker}, {reasonCancel:req.body.reasonCancel}, {new:true} ,function(err, trip){
        if(err){
            if(err.name=='ValidationError'){
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        } else {
            res.json(trip)
        }
    })
}