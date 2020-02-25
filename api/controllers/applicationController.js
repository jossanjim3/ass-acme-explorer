'use strict';

var mongoose = require('mongoose'),
    Application = mongoose.model('Applications');

var Actor = mongoose.model('Actors');
var Trip = mongoose.model('Trips');

//----------------------------
// /v1/applications
//----------------------------

// list all the applications
exports.list_all_applications = function(req,res){
    Application.find({},function(err, applis){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(applis);
        }
    });
};

// create an applicaction
exports.create_an_application = function(req,res){
    var new_appli = new Application(req.body);
    var explorer = undefined;
    var trip = undefined;
    
    // check if the actor exists
    Actor.findById(req.body.explorer, function(err, actor){
        if(err){
            //res.status(500).send(err);
            res.status(403);
            res.json("Application cannot be created. Actor does not exist!");
        } else {
            explorer = actor;
            //console.log(explorer);
            
            // Check if the actor is an Explorer  
            if (explorer.role.includes("EXPLORER")) {

                // check if the trip exists
                Trip.findById(req.body.trip, function(err, tripp){
                    if(err){
                        //res.status(500).send(err);
                        res.status(403);
                        res.json("Application cannot be created. Trips does not exist!");

                    } else {
                        trip = tripp;
                        //console.log(trip);

                        // Check if the trip has been published and is not started or cancelled
                        if (trip.isPublished && trip.reasonCancel == undefined && trip.startDate > new Date()){

                            // create the application
                            new_appli.save(function(err, appli) {
                                if (err){
                                    if(err.name=='ValidationError') {
                                        res.status(422).send(err);
                                    }
                                    else{
                                        res.status(500).send(err);
                                    }
                                }
                                else{
                                    res.json(appli);
                                }
                            });
                        } else if (!trip.isPublished) {
                            res.status(403);
                            res.json("Application cannot be created. The trip is not published yet!");
                        } else if (trip.reasonCancel != undefined){
                            res.status(403);
                            res.json("Application cannot be created. The trip has been cancelled!");
                        } else if (trip.startDate <= new Date()){
                            res.status(403);
                            res.json("Application cannot be created. The trip has already started!");
                        }

                    }
                })

            } else {
                res.status(403);
                res.json("Application cannot be created. The actor is not an explorer!");
            }
        }
    })        
};

//----------------------------
// /v1/applications/:applicationId
//----------------------------

// read an application  
exports.read_an_application = function(req,res){
    Application.findById(req.params.applicationId, function(err, application){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(application);
        }
    })
};

// update an application status
exports.update_an_application = function(req,res){

    console.log(req.params.applicationId);
    Application.findById({_id : req.params.applicationId}, function(err, appli) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(403); 
                res.send("Application cannot be updated. Application does not exist!");
            }

        } else {
            var statusApp = appli.status;
            // if the application status is Pending -> DUE 
            // if the application status is Due -> Accepted
            // en el frontend se controla si es la vista de manager o de explorer
            
            if (statusApp == "PENDING") {
                appli.status = "DUE";

                // save the new status
                appli.save(function(err, appli) {
                    if (err){
                        if(err.name=='ValidationError') {
                            res.status(422).send(err);
                        }
                        else{
                            res.status(500).send(err);
                        }
                    }
                    else{
                        res.status(201);
                        res.json(appli);
                    }
                });  
                
            } else if (statusApp == "DUE"){
                appli.status = "ACCEPTED";

                // save the new status
                appli.save(function(err, appli) {
                    if (err){
                        if(err.name=='ValidationError') {
                            res.status(422).send(err);
                        }
                        else{
                            res.status(500).send(err);
                        }
                    }
                    else{
                        res.status(201);
                        res.json(appli);
                    }
                });  
                
            } else {
                res.status(403);
                res.json("It is not possible to update the application status!");
                
            } 
        }
    });
};

// delete an application. Currently an application cannot be deleted!
exports.delete_an_application = function(req,res){
    // an application cannot be deleted
    res.status(403).send("An application cannot be deleted!");
};

//----------------------------
// /v1/applications/:applicationId/cancel
//----------------------------
// update an application status to rejected by manager or cancelled by explorer
exports.cancel_an_application = function(req, res) {    

    // check the application status
    Application.findById(req.params.applicationId, function(err, appli) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(403); 
                res.send("Application cannot be rejected/cancelled. Application does not exist!");
            }

        } else {
            var statusApp = appli.status;
            // if the application status is Accepted -> Cancelled 
            // if the application status is Pending -> Rejected
            // en el frontend se controla si es la vista de manager o de explorer
            
            if (statusApp == "ACCEPTED") {
                appli.status = "CANCELLED";

                // save the new status
                appli.save(function(err, appli) {
                    if (err){
                        if(err.name=='ValidationError') {
                            res.status(422).send(err);
                        }
                        else{
                            res.status(500).send(err);
                        }
                    }
                    else{
                        res.status(201);
                        res.json(appli);
                    }
                });  
                
            } else if (statusApp == "PENDING"){
                appli.status = "REJECTED";

                if(req.body.comment != undefined && req.body.comment != ""){
                    appli.comment = req.body.comment;
                    // save the new status
                    appli.save(function(err, appli) {
                        if (err){
                            if(err.name=='ValidationError') {
                                res.status(422).send(err);
                            }
                            else{
                                res.status(500).send(err);
                            }
                        }
                        else{
                            res.status(201);
                            res.json(appli);
                        }
                    });  
                    
                } else {
                    res.status(403);
                    res.json("Sorry, you must include the reason why!");
                }
                
            } else {
                res.status(403);
                res.json("It is not possible to reject or cancel the application!");
                
            }               
        }       
    });
};

//----------------------------
// /v1/applications/users/:userId
//----------------------------

// list applications that explorers have made
exports.list_all_my_applications = function(req, res) {
    var user_id = req.params.userId;

    Application.find({explorer : user_id}, function(err, appis) {
      if (err){
        res.status(500).send(err);
      }
      else{
        res.json(appis);
      }
    });
};

//----------------------------
// /v1/applications/trips/:tripId
//----------------------------
// list applications from a trip
exports.list_all_trip_applications = function(req, res) {
    var trip_id = req.params.tripId;

    Application.find({trip : trip_id}, function(err, appis) {
      if (err){
        res.status(500).send(err);
      }
      else{
        res.json(appis);
      }
    });
};

//----------------------------
// /v1/applications/search
//----------------------------
exports.search_applications = function(req, res) {
    //check if explorer or manager param exists
    //Search depending on params
    //console.log('Searching applications depending on params');
    res.send('applications returned from the applications search');
};

