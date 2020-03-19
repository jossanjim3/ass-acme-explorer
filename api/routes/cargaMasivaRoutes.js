'use strict';

module.exports = function (app){
    var cargaMasiva = require('../controllers/cargaMasivaController');

    app.route('/v1/cargaMasiva')
        // load all the data example
        .get(cargaMasiva.loadData)        

}