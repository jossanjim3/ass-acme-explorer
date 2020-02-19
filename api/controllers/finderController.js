'use strict';
/*---------------FINDER----------------------*/
var mongoose = require('mongoose'),
    Finder = mongoose.model('Finders');


exports.all_finders

exports.create_finder

exports.remove_finder

exports.finder_of_actor

exports.update_finder = function(req, res) {
    if(!req.params.role.contains('EXPLORER')){
        res.status(422).json({message: 'The actor must be an explorer.'})
    }
    else{
        var newFinder = req.body;
        newFinder.timestamp = new Date();

        Finder.findOneAndUpdate({explorer: req.params.actorId}, newFinder, {new: true}, function(err, finder){
            if(err){
                res.status(500).send(err);
            }
            else{
                res.status(200).json(finder);
            }
        });
    }
}