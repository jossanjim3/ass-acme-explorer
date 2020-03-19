'use strict';

var mongoose = require('mongoose'),
    Actor = mongoose.model('Actors'),
    Trip = mongoose.model('Trips'),
    Application = mongoose.model('Applications');

//----------------------------
// /v1/cargaMasiva
//----------------------------

async function countActors() {
    let number = 0;
    await Actor.find({}, async (err, actors) => {
        if(err){
            return 0;
        } else {
            console.log("countActors: " + actors.length);
            number = actors.length;
        }
    });
    return number;
}


async function countTrips() {
    let number = 0;
    await Trip.find({}, async (err, trips) => {
        if(err){
            return 0;
        } else {
            console.log("countTrips: " + trips.length);
            number = trips.length;
        }
    });
    return number;
}

async function countApplications() {
    let number = 0;
    await Application.find({}, async (err, appli) => {
        if(err){
            return 0;
        } else {
            console.log("countApplications: " + appli.length);
            number = appli.length;
        }
    });
    return number;
}

// list all the applications
exports.loadData = async (req,res) => {

    var countAct = await countActors();
    var countTri = await countTrips();
    var countAppli= await countApplications();

    

    res.status(200).json("Actors: " + countAct + ", countTrips: " + countTri + ", countApplications: " + countAppli);


};
