'use strict';
module.exports = function(app) {
	var storage = require('../controllers/storageController');

  // Data Storage routes

  /**
	 * Bad option: Put a large json with documents from a file into a collection of mongoDB
	 *
	 * @section storage
	 * @type post
	 * @url /v1/storage/insertMany
     * @param {string} mongooseModel  //mandatory
	 * @param {string} sourceFile   //mandatory
	 * Sample 1: http://localhost:8080/v1/storage/insertMany?dbURL=mongodb://myUser:myUserPassword@localhost:27017/ACME-Market&mongooseModel=Actors&sourceFile=c:/temp/Customer.json
	 * Sample 2: http://localhost:8080/v1/storage/insertMany?dbURL=mongodb://myUser:myUserPassword@localhost:27017/ACME-Market&mongooseModel=Test&sourceFile=c:/temp/many_npm.json
  */
  app.route('/v1/storage/insertMany')
 		.post(storage.store_json_insertMany);

  /**
	 * Put a large json with documents from a file into a collection of mongoDB
	 *
	 * @section storage
	 * @type post
	 * @url /v1/storage/fs
	 * @param {string} dbURL       //mandatory
     * @param {string} collection  //mandatory
	 * @param {string} sourceURL   //mandatory
	 * @param {string} batchSize   //optional
	 * @param {string} parseString //optional
	 * Sample 1: http://localhost:8080/v1/storage/fs?dbURL=mongodb://myUser:myUserPassword@localhost:27017/ACME-Market&collection=test&batchSize=100&parseString=rows.*&sourceFile=c:\temp\many_npm.json
	 * Sample 2: http://localhost:8080/v1/storage/fs?dbURL=mongodb://myUser:myUserPassword@localhost:27017/ACME-Market&collection=actors&batchSize=100&parseString=*&sourceFile=c:\temp\Customer.json
  */
  app.route('/v1/storage/fs')
		.post(storage.store_json_fs);
};