'use strict';

var mongoose = require('mongoose'),
application = mongoose.model('applications')

exports.list_all_applications = function(req,res){
    application.find({},function(err, applications){
        if(err){
            res.send(err);
        } else {
            res.json(applications);
        }
    });
}

exports.create_an_application = function(req,res){
    var new_application = new application(req.body);
    new_application.save(function(err, application){
        if(err){
            res.send(err)
        } else {
            res.json(application)
        }
    });
}

exports.update_an_application = function(req,res){
    application.findOneAndUpdate({_id:req.params.applicationId}, req.body, {new:true} ,function(err, application){
        if(err){
            res.send(err)
        } else {
            res.json(application)
        }
    })
}

exports.read_an_application = function(req,res){
    application.findById(req.params.applicationId, function(err, application){
        if(err){
            res.send(err)
        } else {
            res.json(application)
        }
    })
}

exports.delete_an_application = function(req,res){
    application.remove({_id:req.params.applicationId}, function(err, application){
        if(err){
            res.send(err)
        } else {
            res.json(application)
        }
    })
}