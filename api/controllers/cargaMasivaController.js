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

// list all the applications
exports.loadData = async (req,res) => {

    var countAct = await countActors();

    if (countAct > 0 ) {
        res.status(200);
        res.json(countAct);
    } else {
        res.status(200);
        res.json("No hay usuarios");
    }

};
