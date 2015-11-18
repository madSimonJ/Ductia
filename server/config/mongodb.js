var MongoClient = require('mongodb').MongoClient;
var testDataSeeder = require('./testDataSeeder');
var databaseConnection;
var Q = require('q');

exports.connect = function(config) {
  MongoClient.connect(config.db, function(err, db) {
    if (!!err) {
      console.log("error connecting to database:" + err);
    } else {
      databaseConnection = db;
      console.log("database connected");
      if (!!config.reseedDBOnServerRestart) {
        testDataSeeder.reseedDatabase(databaseConnection);
      }
    }
  });
}

exports.DatabaseConnection = function() {
  console.log("getting database connection.  dbconn = " + typeof databaseConnection.collection("exam"));
  if (!!databaseConnection) {
    return databaseConnection;
  } else {
    throw "the database is not connected";
  }
}

exports.FindOne = function(collectionName, query) {
  var deferred = Q.defer();

  databaseConnection.collection(collectionName).findOne(query, function(err, record) {
    if (!!err) {
      deferred.reject("error getting record from database: " + err);
    } else {
      deferred.resolve(record);
    }
  });
  console.log("deferred.promise = " + deferred.promise);
  return deferred.promise;
}


exports.Find = function(collectionName, query) {
  var deferred = Q.defer();
  console.log("c = " + collectionName + ", q = " + JSON.stringify(query));
  var returnDocs = new Array();
  var cursor = databaseConnection.collection(collectionName).find();
  cursor.each(function(err, doc) {
    if (!!err) {
      console.log("error reading record: " + err);
      deferred.reject("error reading record: " + err);
    } else {
      if (doc !== null) {
        returnDocs.push(doc);
      } else {
        console.log("resolved query");
        console.log("doc = " + JSON.stringify(returnDocs));
        deferred.resolve(returnDocs);
      }

    }

  });


  // databaseConnection.collection(collectionName).find({}, {} , function(err, data) {
  //   if(!!err) {
  //     deferred.reject("error getting records from database: " + err);
  //   } else {
  //     console.log("data = " + JSON.stringify(data));
  //     deferred.resolve(data);
  //   }
  // });

  return deferred.promise;
}
