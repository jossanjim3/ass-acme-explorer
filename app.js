require('dotenv').config()
var express = require('express'),
 app = express(),
 port = process.env.PORT || 8080,
 mongoose = require('mongoose'),
 Actor = require('./api/models/actorModel'),
 Application = require('./api/models/applicationModel'),
 Trip = require('./api/models/tripModel')

 bodyParser = require('body-parser');

mongoose.set('useFindAndModify', false);

// MongoDB URI building
var mongoDBUser = process.env.mongoDBUser || "myUser";
var mongoDBPass = process.env.mongoDBPass || "myUserPassword";
var mongoDBCredentials = (mongoDBUser && mongoDBPass) ? mongoDBUser + ":" + mongoDBPass + "@" : "";

var mongoDBHostname = process.env.mongoDBHostname || "localhost";
var mongoDBPort = process.env.mongoDBPort || "27017";
var mongoDBName = process.env.mongoDBName || "ACME-Explorer";

var mongoDBURI = "mongodb://" + mongoDBHostname + ":" + mongoDBPort + "/" + mongoDBName;
mongoose.set('useCreateIndex', true)

//var mongoDBURI = "mongodb://" + mongoDBCredentials + mongoDBHostname + ":" + mongoDBPort + "/" + mongoDBName;
 
//mongodb://localhost:27017/ACME-Explorer
mongoose.connect(mongoDBURI, {
 //reconnectTries: 10,
 //reconnectInterval: 500,
 poolSize: 10, // Up to 10 sockets
 connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
 socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
 family: 4, // skip trying IPv6
 useNewUrlParser: true,
 useFindAndModify: true,
 useUnifiedTopology: true
});
 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
var routesActors = require('./api/routes/actorRoutes');
var routesTrips = require('./api/routes/tripRoutes');
var routesApplications = require('./api/routes/applicationRoutes');
var routesSponsorships = require('./api/routes/sponsorshipRoutes');
var storageRoutes= require('./api/routes/storageRoutes')
var loginRoutes=require('./api/routes/loginRoutes')

routesActors(app);
routesApplications(app);
routesTrips(app);
routesSponsorships(app);
storageRoutes(app);
loginRoutes(app);

console.log("Connecting DB to: " + mongoDBURI);
mongoose.connection.on("open", function (err, conn) {
 app.listen(port, function () {
 console.log('ACME-Explorer RESTful API server started on: ' + port);
 });
});
 
mongoose.connection.on("error", function (err, conn) {
 console.error("DB init error " + err);
});