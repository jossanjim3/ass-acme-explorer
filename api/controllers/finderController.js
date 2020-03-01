'use strict';
/*---------------FINDER----------------------*/
var mongoose = require('mongoose'),
    Finder = require('../models/finderModel');

var fetch = require('node-fetch');

const tripController = require('./tripController')


function extractUrl(body){
    var url = "http://localhost:" + (process.env.PORT || 8080) + "/v1/trips/search";
    var firstAttr = true;
    var jsonBody = Object.keys(body);
    var jsonBodyFiltered = jsonBody.filter((element) => jsonBody[element] != null);
    var attr;

    for (attr of jsonBodyFiltered){
        if(!firstAttr){
            url += "&";   
        }
        url += "?" + attr + "=" + jsonBody[attr];
        firstAttr = false;
    }

    return url;
}

function transformToFinderTripSchema(trip){
    var tripForFinder = new Finder.TripsSchemaFinder();
    var attr;

    var attributesToCopy = Object.keys(Finder.TripsSchemaFinder.schema.paths).filter((element) => 
        String(element) != "__v" || String(element) != "_id"
    );

    for(attr of attributesToCopy){
        tripForFinder[attr] = trip[attr];
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
            var urlForFinder = extractUrl(req.body);

            fetch(urlForFinder,{
                method: 'GET',
            }).then(response => {
                return response.json();
            }).then(trips =>{
                var trips_results_finder = [];
                var trip;
                for(trip of trips){
                    trips_results_finder.push(transformToFinderTripSchema(trip));
                }

                if(finder === null){
                    console.log("Create");
                    var newFinder = new Finder.FinderModel(req.body);
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
                    console.log("Update");
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