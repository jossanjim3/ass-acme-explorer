// hecho con Studio 3T for MongoDB

// List of trips from a manager
/*
select *
from trips
where manager = ObjectId("5e5168e68e31de26b8d16933")
--*/
use ACME-Explorer;
db.getCollection("trips").aggregate(
    [
        { 
            "$match" : { 
                "manager" : ObjectId("5e5168d58e31de26b8d16932")
            }
        }
    ], 
    { 
        "allowDiskUse" : false
    }
);


// List the applications for the trips that a manager manage
/*
select actors._id, actors.name, trips._id, trips.name, applications._id, applications.status
from actors
    inner join trips
        on actors._id = trips.manager
    inner join applications
            on applications.trip = trips._id            
where actors.role = "MANAGER"
--*/
use ACME-Explorer;
db.getCollection("actors").aggregate(
    [
        { 
            "$project" : { 
                "_id" : NumberInt(0), 
                "actors" : "$$ROOT"
            }
        }, 
        { 
            "$lookup" : { 
                "localField" : "actors._id", 
                "from" : "trips", 
                "foreignField" : "manager", 
                "as" : "trips"
            }
        }, 
        { 
            "$unwind" : { 
                "path" : "$trips", 
                "preserveNullAndEmptyArrays" : false
            }
        }, 
        { 
            "$lookup" : { 
                "localField" : "trips._id", 
                "from" : "applications", 
                "foreignField" : "trip", 
                "as" : "applications"
            }
        }, 
        { 
            "$unwind" : { 
                "path" : "$applications", 
                "preserveNullAndEmptyArrays" : false
            }
        }, 
        { 
            "$match" : { 
                "actors.role" : "MANAGER"
            }
        }, 
        { 
            "$project" : { 
                "actors._id" : "$actors._id", 
                "actors.name" : "$actors.name", 
                "trips._id" : "$trips._id", 
                "trips.title" : "$trips.title", 
                "applications._id" : "$applications._id", 
                "applications.status" : "$applications.status", 
                "_id" : NumberInt(0)
            }
        }
    ], 
    { 
        "allowDiskUse" : true
    }
);


// Search for trips using a single key word that must be contained in either their tickers, titles, or descriptions

// Explorer can list the applications that he or she’s made, grouped by status
/*
select *
from applications
order by status
--*/
use ACME-Explorer;
db.getCollection("applications").find({}).sort(
    { 
        "status" : NumberInt(1)
    }
);



// The average, the minimum, the maximum, and the standard deviation of the number of trips managed per manager
/*
select manager, count(*)
from trips
group by manager
--*/
use ACME-Explorer;
db.getCollection("trips").aggregate(
    [
        { 
            "$group" : { 
                "_id" : { 
                    "manager" : "$manager"
                }, 
                "COUNT(*)" : { 
                    "$sum" : NumberInt(1)
                }
            }
        }, 
        { 
            "$project" : { 
                "manager" : "$_id.manager", 
                "COUNT(*)" : "$COUNT(*)", 
                "_id" : NumberInt(0)
            }
        }
    ], 
    { 
        "allowDiskUse" : true
    }
);

// The average, the minimum, the maximum, and the standard deviation of the number of applications per trip
/*
select trip, count(*)
from applications
group by trip
--*/
use ACME-Explorer;
db.getCollection("applications").aggregate(
    [
        { 
            "$group" : { 
                "_id" : { 
                    "trip" : "$trip"
                }, 
                "COUNT(*)" : { 
                    "$sum" : NumberInt(1)
                }
            }
        }, 
        { 
            "$project" : { 
                "trip" : "$_id.trip", 
                "COUNT(*)" : "$COUNT(*)", 
                "_id" : NumberInt(0)
            }
        }
    ], 
    { 
        "allowDiskUse" : true
    }
);


// The average, the minimum, the maximum, and the standard deviation of the price of the trips
/*
select manager, count(*), min(price), max(price), avg(price), stdev(price)
from trips
group by manager
--*/
use ACME-Explorer;
db.getCollection("trips").aggregate(
    [
        { 
            "$group" : { 
                "_id" : { 
                    "manager" : "$manager"
                }, 
                "COUNT(*)" : { 
                    "$sum" : NumberInt(1)
                }, 
                "MIN(price)" : { 
                    "$min" : "$price"
                }, 
                "MAX(price)" : { 
                    "$max" : "$price"
                }, 
                "AVG(price)" : { 
                    "$avg" : "$price"
                }, 
                "STDEV(price)" : { 
                    "$stdDevSamp" : "$price"
                }
            }
        }, 
        { 
            "$project" : { 
                "manager" : "$_id.manager", 
                "COUNT(*)" : "$COUNT(*)", 
                "MIN(price)" : "$MIN(price)", 
                "MAX(price)" : "$MAX(price)", 
                "AVG(price)" : "$AVG(price)", 
                "STDEV(price)" : "$STDEV(price)", 
                "_id" : NumberInt(0)
            }
        }
    ], 
    { 
        "allowDiskUse" : true
    }
);

// The ratio of applications grouped by status

/*Explorers have a finder in which they can specify some search criteria regarding trips, namely:
a key word, a price range, and a date range. The key word must be contained in the ticker,
the title, or the description of the trips returned, which must not exceed the price range
and must be organised within the date range specified. Initially, every search criterion must
be null; it is assumed that every trip satisfies a null search criterion*/

/*The maximum number of results that a finder returns is 10 by default. The administrator
should be able to change this parameter in order to adjust the performance of the system.
The absolute maximum is 100 results*/

// The average price range that explorers indicate in their finders.

// The top 10 key words that the explorers indicate in their finders.

/*Launch a process to compute a cube of the form M[e, p] that returns the amount of
money that explorer e has spent on trips during period p, which can be M01-M36 to
denote any of the last 1-36 months or Y01-Y03 to denote any of the last three years.*/

// Consult the cube by means of the following queries:
// Given e and p, return M[e, p].
/* Given p, return the explorers e such that M[e, p] q v, where v denotes an arbitrary
amount of money and q is a comparison operator (that is, “equal”,
“not equal”, “greater than”, “greater than or equal”, “smaller than”, or
“smaller than or equal”)*/

