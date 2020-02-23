'use strict';
/*---------------FINDER----------------------*/
var mongoose = require('mongoose'),
    Finder = mongoose.model('Finders');

exports.all_finders = function(req, res){
    Finder.find({}, function(err, finders){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(finders);
        }
    });
}

exports.remove_finder = function(req, res){
    Finder.remove({_id: req.params.id}, function(err, finder){
        if(err){
            res.status(500).send(err);
        } else {
            res.json(finder);
        }
    })
}

exports.finder_of_actor = function(req, res){
    Finder.find({actor: req.params.explorer}, function(err, finder){
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).json(finder);
        }
    });
}

exports.update_finder = function(req, res) {
    Finder.find({actor: req.params.actorId}, function(err, finder){

        if(!req.params.actorId.role.includes('EXPLORER')){
            res.status(422).json({message: 'The actor must be an explorer.'})
        }

        else if(err){
            res.status(500).send(err);
        }
        else{
            var newFinder = req.body;
            newFinder.timestamp = new Date();
            
            finder.trips = 

            if(finder.length < 1){
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
                Finder.findOneAndUpdate({_id: finder._id}, newFinder, {new: true}, function(err, finderToUpdate){
                    if(err){
                        res.status(500).send(err);
                    }
                    res.status(204).json(finderToUpdate);
                });
            }
        }   
    });
}