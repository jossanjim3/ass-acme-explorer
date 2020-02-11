'use strict';

var mongoose = require('mongoose'),
    Application = mongoose.model('applications');

exports.list_all_applications = function(req,res){
    Application.find({},function(err, applis){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(applis);
        }
    });
}

exports.list_my_applications = function(req, res) {
    Application.find(function(err, appis) {
      if (err){
        res.status(500).send(err);
      }
      else{
        res.json(appis);
      }
    });
  };

exports.search_applications = function(req, res) {
    //check if explorerId param exists
    //check if tripId param exists
    //Search depending on params
    console.log('Searching applications depending on params');
    res.send('Applications returned from the applications search');
};

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

exports.read_an_application = function(req,res){
    Application.findById(req.params.applicationId, function(err, application){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(application);
        }
    })
}

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

exports.delete_an_application = function(req,res){
    // an application cannot be deleted
    res.status(403).send("An application cannot be deleted!");
}