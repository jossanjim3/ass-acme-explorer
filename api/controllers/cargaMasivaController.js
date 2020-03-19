'use strict';

var mongoose = require('mongoose'),
    Actor = mongoose.model('Actors'),
    Trip = mongoose.model('Trips'),
    Application = mongoose.model('Applications');

//----------------------------
// /v1/cargaMasiva/:numActors/:numTrips/:numApplis
//----------------------------

async function countActors() {
    let number = 0;
    number = await Actor.find({});
    return number.length;
}

async function countTrips() {
    let number = 0;
    number = await Trip.find({});
    return number.length;
}

async function countApplications() {
    let number = 0;
    number = await Application.find({});
    return number.length;
}

async function agregarNuevosActores(countAct,numNewActors){

    var contador = countAct + 1;
    var roleArray = [
        'EXPLORER',
        'MANAGER'
    ];

    var newActorsArray = [];

    for (var i = 0; i <= numNewActors-1; i++) {

        var randomNumber = Math.floor(Math.random()*roleArray.length);

        var newActor = new Actor({
            "name": "nameActor" + contador,
            "surname": "surnameActor" + contador,
            "email": "emailActor" + contador + "@gmail.com",
            "password": "nameActor" + contador,
            "phone": Math.floor(Math.random() * 100000000) + 1,
            "role": roleArray[randomNumber]
        });

        var actor = await newActor.save();
        if (actor == undefined){
            i = i - 1;
            contador = contador - 1;
        }
        //console.log("Actor saved! : " + actor._id);
        newActorsArray.push(actor);

        contador += 1;
        
     }

     return newActorsArray;

}

// list all the applications
exports.loadData = async (req,res) => {

    const numNewActors = req.params.numActors;
    const numNewTrips  = req.params.numTrips;
    const numNewApplis = req.params.numApplis;

    console.log("numNewActors: " + numNewActors + ", numNewTrips: " + numNewTrips + ", numNewApplis: " + numNewApplis);
    
    var countAct = await countActors();
    //console.log("countAct:" + countAct);

    var countTri = await countTrips();
    //console.log("countTri:" + countTri);

    var countAppli= await countApplications();
    //console.log("countAppli:" + countAppli);

    var totalInicio = "ActorIni: " + countAct + ", TripsIni: " + countTri + ", ApplicationsIni: " + countAppli;

    // si se quieren crear nuevos actores
    if (numNewActors > 0 ) {      
        
        // creo nuevos actores, le paso cuando actores hay en bbdd para contador de nombres y cuantos nuevos quiero
        await agregarNuevosActores(countAct,numNewActors);

    }

    // print result operations
    countAct = await countActors();
    countTri = await countTrips();
    countAppli= await countApplications();

    var resultadoTotal = "ActorsTotal: " + countAct + ", TripsTotal: " + countTri + ", ApplicationsTotal: " + countAppli;

    await res.status(200).json(totalInicio + " ----- " + resultadoTotal);


};
