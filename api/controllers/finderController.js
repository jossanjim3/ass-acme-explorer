'use strict';
/*---------------FINDER----------------------*/
var mongoose = require('mongoose'),
    Finder = require('../models/finderModel');

const tripController = require('./tripController')


function transformToFinderTripSchema(trip){
    tripForFinder = new Finder.TripsSchemaFinder();
    for(attr of Object.keys(Finder.TripsSchemaFinder.paths)){
        tripForFinder.attr = trip.attr;
    }
    
    return tripForFinder;
}

exports.all_finders = function(req, res){
    Finder.FinderModel.find({}, function(err, finders){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(finders);
        }
    });
}

exports.remove_finder = function(req, res){
    Finder.FinderModel.remove({_id: req.params.id}, function(err, finder){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(finder);
        }
    })
}

exports.finder_of_actor = function(req, res){
    Finder.FinderModel.find({actor: req.params.explorer}, function(err, finder){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(finder);
        }
    });
}

exports.update_finder = function(req, res) {
    Finder.FinderModel.findOne({explorer: req.params.actorId}, function(err, finder){

        /*if(!req.params.actorId.role.includes('EXPLORER')){
            res.status(422).json({message: 'The actor must be an explorer.'})
        }

        else*/ if(err){
            res.status(500).send(err);
        }
        else{
            req.query = req.body;
            tripController.search_trips(req, res).then((trips)=> {
                trips_results_finder = [];
                trips.array.forEach(element => {
                    trips_results_finder.append(transformToFinderTripSchema(element));
                });
                if(finder === null){
                    var newFinder = new Finder(req.body);
                    newFinder.explorer = req.params.actorId;
                    newFinder.results = trips_results_finder;
                    newFinder.save(function(err, finder){
                        if(err){
                            res.status(500).send(err);
                        }
                        else{
                            res.status(201).send(finder);
                        }
                    });
                }
                else {
                    finder.results = trips_results_finder;
                    Finder.FinderModel.findOneAndUpdate({explorer: req.params.actorId}, finder, {new: true}, function(err, finderToUpdate){
                        if(err){
                            res.status(500).send(err);
                        }
                        res.status(202).json(finderToUpdate);
                    });
                }
            });
        }   
    });
}