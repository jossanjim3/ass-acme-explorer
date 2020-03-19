'use strict';
/*---------------FINDER----------------------*/
var mongoose = require('mongoose'),
    Finder = require('../models/finderModel');

var fetch = require('node-fetch');

const authController = require('./authController');

var maxNumberTrips = 10;
var maxTimeAResultIsStored = 1;

/*---------------Funciones auxiliares----------------------*/
function extractUrl(body){
    var url = "http://localhost:" + (process.env.PORT || 8080) + "/v1/trips/search";
    var firstAttr = true;
    var jsonBody = Object.keys(body);
    var jsonBodyFiltered = jsonBody.filter((element) => jsonBody[element] !== null);
    var attr;

    for (attr of jsonBodyFiltered){
        if(firstAttr){
            url += "?";
        }
        else if(!firstAttr){
            url += "&";
        }
        url += attr + "=" + body[attr];
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

const attrToCheck = ["keyword", "minDate", "maxDate", "minPrice", "maxPrice"];

var timestampUnderLimit = function(finder){
    var currentTime = new Date();
    var timeToCompare = new Date(finder.timestamp);
    
    timeToCompare = timeToCompare.setHours(timeToCompare.getHours() + maxTimeAResultIsStored);
    console.log("Comparacion: " + timeToCompare + " y " + currentTime.getTime());

    return (timeToCompare > currentTime.getTime());
}

var checkEquality = function(finder, body){
    return function(attr){
        if(body[attr] === undefined && finder[attr] === null){
            return true
            
        }
        else{
            if(attr === "minDate" || attr === "maxDate"){
                console.log("Comparacion fechas: " + new Date(finder[attr]) + " y " + new Date(body[attr]));
                return ((new Date(finder[attr])).getTime() === (new Date(body[attr])).getTime());
            }
            else{
                console.log("Comparacion atributos: " + finder[attr] + " y " + body[attr]);
                return finder[attr] === body[attr];
            }
        }
    }
}

function fetchOperation(service){
    return function(operation, parameters = []){
        for(element in parameters){
            service += "/" + element;
        }
        console.log(service);
        fetch(service,{
            method: operation,
        }).then(response => {
            return response.json();  
        }).then(json => {
            return json;
        });
    }
}

var actorService = fetchOperation("http://localhost:" + (process.env.PORT || 8080) + "/v1/actors");

/*-----------------Metodos para V1------------------------*/
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
    Finder.FinderModel.remove({explorer: req.params.actorId}, function(err, finder){
        if(err){
            res.status(500).send(err);
        } else {
            res.status(200).json({message: "Finder eliminado."});
        }
    })
}

exports.finder_of_actor = function(req, res){
    Finder.FinderModel.findOne({explorer: req.params.actorId}, function(err, finder){
        if(err){
            res.status(500).send(err);
        }
        else{
            if(finder !== null && timestampUnderLimit(finder)) {
                res.status(200).json(finder);
            }
            else{
                console.log("No se encuentra resultado");
                res.status(200).json([]);
            }
        }
    });
}

exports.update_finder = function(req, res) {
    var url = "http://localhost:" + (process.env.PORT || 8080) + "/v1/finders/explorers/" + req.params.actorId;
    fetch(url,{
        method: 'GET',
    }).then(response => {
        return response.json();
    }).then(finder => {
        var equalityBetweenFinderAndBody = checkEquality(finder, req.body);
        console.log("Tercera comparacion: " + attrToCheck.every(equalityBetweenFinderAndBody))
        if(timestampUnderLimit(finder) && 
            attrToCheck.every(equalityBetweenFinderAndBody)){
            
            console.log("Devolviendo finder almacenado.");
            res.status(200).json(finder);
        }
        else{
            var urlForFinder = extractUrl(req.body);
            fetch(urlForFinder,{
                method: 'GET',
            }).then(response => {
                return response.json();
            }).then(trips =>{
                if(trips.hasOwnProperty("name")){
                    res.status(400).send(trips);
                }
                else{
                    var trips_results_finder = trips.slice(0, maxNumberTrips)
                    .map((trip)=>transformToFinderTripSchema(trip));

                    var newFinder = new Finder.FinderModel(req.body);
                    newFinder.explorer = req.params.actorId;
                    newFinder.results = trips_results_finder;
                    Finder.FinderModel.deleteOne({explorer: req.params.actorId}, function(err, finder){
                        if(err){
                            res.status(500).send(err);
                        }
                        else{
                            newFinder.save(function(err, finder){
                                if(err){
                                    res.status(500).send(err);
                                }
                                else{
                                    res.status(201).send(finder);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

exports.set_max_results = function(req, res){
    var promise = new Promise(function(resolve, reject){
        if(req.params.number > 0 && req.params.number < 101) {
            maxNumberTrips = req.params.number;
            resolve({message: "Operacion successful. Max number of results available per search updated."});
        }
        else{
            reject({message: "Operation not allowed. The number must be one between 1 and 100."});
        }
    });
    promise.then((message)=>{
        res.status(200).send(message);
    })
    .catch((err) => {
        res.status(403).send(err);
    });
}

exports.set_time_results_saved = function(req, res){
    var promise = new Promise(function(resolve, reject){
        if(req.params.time > 0 && req.params.time <= 24) {
            maxTimeAResultIsStored = req.params.time;
            resolve({message: "Operacion successful. Max time the search is stored updated."});
        }
        else{
            reject({message: "Operation not allowed. The number of hours must be between 1 and 24, latter included."});
        }
    });
    promise.then((message)=>{
        res.status(200).send(message);
    })
    .catch((err) => {
        res.status(403).send(err);
    });
}


/*-----------------Metodos para V2------------------------*/

/*exports.all_finders = function(req, res){
    Finder.FinderModel.find({}, function(err, finders){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(finders);
        }
    });
}*/

exports.remove_finder_auth = function(req, res){
    Finder.FinderModel.remove({_id: req.params.id}, function(err, finder){
        if(err){
            res.status(500).send(err);
        } else {
            res.json({message:"Finder removed"});
        }
    });
}

exports.finder_of_actor_auth = function(req, res){
    Finder.FinderModel.findOne({explorer: req.params.actorId}, function(err, finder){
        if(err){
            res.status(500).send(err);
        }
        else{
            if(timestampUnderLimit(finder)) {
                res.status(200).json(finder);
            }
            else{
                console.log("No se encuentra resultado");
                res.status(200).json([]);
            }
        }
    });
}

exports.update_finder_auth = function(req, res) {
    var url = "http://localhost:" + (process.env.PORT || 8080) + "/v1/finders/explorers/" + req.params.actorId;
    fetch(url,{
        method: 'GET',
    }).then(response => {
        console.log("Primer then");
        if(response.json.hasOwnProperty('message')){
            console.log("Json es nulo");
            return null;
        }
        else{
            console.log("Devuelvo json");
            return response.json();
        }     
    }).then(finder => {
        var equalityBetweenFinderAndBody = checkEquality(finder, req.body);
        console.log("Tercera comparacion: " + attrToCheck.every(equalityBetweenFinderAndBody))
        if(finder !== null &&
            timestampUnderLimit(finder) && 
            attrToCheck.every(equalityBetweenFinderAndBody)){

            console.log("Finder: " + finder);
            console.log("Llego a devolver el anterior");
            res.status(200).json(finder);
        }
        else{
            var urlForFinder = extractUrl(req.body);
            fetch(urlForFinder,{
                method: 'GET',
            }).then(response => {
                return response.json();
            }).then(trips =>{
                var trips_results_finder = trips.slice(0, maxNumberTrips)
                    .map((trip)=>transformToFinderTripSchema(trip));

                var newFinder = new Finder.FinderModel(req.body);
                newFinder.explorer = req.params.actorId;
                newFinder.results = trips_results_finder;
                Finder.FinderModel.deleteOne({explorer: req.params.actorId}, function(err, finder){
                    if(err){
                        res.status(500).send(err);
                    }
                    else{
                        newFinder.save(function(err, finder){
                            if(err){
                                res.status(500).send(err);
                            }
                            else{
                                res.status(201).send(finder);
                            }
                        });
                    }
                });
            });
        }
    });
}

exports.set_max_results_auth = function(req, res){
    Actor.findById(req.params.actorId, async function(err, actor) {
        if (err){
            res.send(err);
        }
        else{
            console.log('actor: '+actor);
            var idToken = req.headers['idtoken'];//WE NEED the FireBase custom token in the req.header['idToken']... it is created by FireBase!!
            if (actor.role.includes('ADMINISTRATOR')){
                var promise = new Promise(function(resolve, reject){
                    if(req.params.number > 0 && req.params.number < 100) {
                        maxNumberTrips = req.params.number;
                        resolve({message: "Operacion successful. Max number of results available per search updated."});
                    }
                    else
                        reject({message: "Operation not allowed. The number must be one between 1 and 100."});
                });
                promise.then((message)=>{
                    res.status(200).send(message);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
            }
            else{
                res.status(403).json({message: "The user is not an administrator."})
            }
        }
    });
}

exports.set_time_results_saved_auth = function(req, res){
    var idToken = req.headers['idtoken'];
    var userId = authController.getUserId(idToken);
    
            console.log('actor: '+actor);
            var idToken = req.headers['idtoken'];//WE NEED the FireBase custom token in the req.header['idToken']... it is created by FireBase!!
            if (actor.role.includes('ADMINISTRATOR')){
                var promise = new Promise(function(resolve, reject){
                    if(req.params.time > 0 && req.params.time <= 24) {
                        maxTimeAResultIsStored = req.params.time;
                        resolve({message: "Operacion successful. Max time the search is stored updated."});
                    }
                    else
                        reject({message: "Operation not allowed. The number of hours must be between 1 and 24, latter included."});
                });
                promise.then((message)=>{
                    res.status(200).send(message);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
            }
            else{
                res.status(403).json({message: "The user is not an administrator."})
            }
}
