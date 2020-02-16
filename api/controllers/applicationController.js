'use strict';

var mongoose = require('mongoose'),
    Application = mongoose.model('Applications');

    // list all the applications
exports.list_all_applications = function(req,res){
    Application.find({},function(err, applis){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(applis);
        }
    });
}

// create an applicaction
exports.create_an_application = function(req,res){
    //Check that user is a Explorer and if not: res.status(403); "an access token is valid, but requires more privileges"
    
    var new_appli = new Application(req.body);

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
}

// list applications that explorers made
exports.list_my_applications = function(req, res) {
    // retieve the id from the explorer
    var user_id = req.params.userId;
    // TODO find by user_id
    Application.find(function(err, appis) {
      if (err){
        res.status(500).send(err);
      }
      else{
        res.json(appis);
      }
    });
  };

// read an application  
exports.read_an_application = function(req,res){
    Application.findById(req.params.applicationId, function(err, application){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(application);
        }
    })
}

// update an application status
exports.update_an_application = function(req,res){
    //Check if the appliction has been previously assigned or not to a trip
    //Check if the trip has a manager assigned
    //Check the current status of the application
    //Update the apllication depending on the status
    Application.findById(req.params.applicationId, function(err, appli) {
        if (err){
            if(err.name=='ValidationError') {
                res.status(422).send(err);
            }
            else{
                res.status(500).send(err);
            }
        }
        else{
            Application.findOneAndUpdate({_id: req.params.applicationId}, req.body, {new: true}, function(err, appli) {
            if (err){
                res.status(500).send(err);
            }
            else{
                // do the check
                res.json(appli);
            }
            });
        }
    });
}

// delete an application. Currently an application cannot be deleted!
exports.delete_an_application = function(req,res){
    // an application cannot be deleted
    res.status(403).send("An application cannot be deleted!");
}

// list application that manager manages
exports.list_all_manager_applications = function(req,res){
    // check the manager_id
    var manager_id = req.params.applicationId;

    res.send('Retrieve all the manager applicactions');
}

// read an applicaction that manager manages
exports.read_an_application_by_manager = function(req,res){
    // check the manager_id
    var manager_id = req.params.applicationId;
    // check the application id
    var app_id = req.params.applicationId;

    res.send('Retrieve an applicaction that manager manages');
}

// update an applicaction status that manager manages
exports.update_an_application_by_manager = function(req,res){
    // check the manager_id
    var manager_id = req.params.applicationId;
    // check the application id
    var app_id = req.params.applicationId;

    res.send('Retrieve and update an applicaction status that manager manages');
}
