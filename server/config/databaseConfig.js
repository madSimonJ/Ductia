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
  var returnDocs = new Array();
  console.log("query2 = " + JSON.stringify(query));
  var cursor = databaseConnection.collection(collectionName).find(query);
  cursor.each(function(err, doc) {
    if (!!err) {
      console.log("error reading record: " + err);
      deferred.reject("error reading record: " + err);
    } else {
      if (doc !== null) {
        returnDocs.push(doc);
      } else {
        deferred.resolve(returnDocs);
      }
    }

  });

  return deferred.promise;
}