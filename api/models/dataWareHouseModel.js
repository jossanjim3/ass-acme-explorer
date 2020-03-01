'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataWareHouseSchema = new mongoose.Schema({
    //The average, the minimun, the maximum, and the standard deviation of the number of trips managed per manager
    averageNumberTripsManager: Number,
    minimumNumberTripsManager: Number,
    maximumNumberTripsManager: Number,
    stdevNumberTripsManager: Number,
    //The average, the minimum, the maximum, and the standard deviation of the number of applications per trip
    averageNumberApplicationsTrip: Number,
    minimumNumberApplicationsTrip: Number,
    maximumNumberApplicationsTrip: Number,
    stdevNumberApplicationsTrip: Number,
    //The average, the minimum, the maximum, and the standard deviation of the price of the trip
    averagePriceTrip: Number,
    minimumPriceTrip: Number,
    maximumPriceTrip: Number,
    stdevPriceTrip: Number,
    //The ratio of applications grouped by status
    ratioApplications: {},
    //The average price range that explorers indicate in their finders
    averagePriceRangeExplorers: Number

})