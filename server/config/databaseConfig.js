var MongoClient = require('mongodb').MongoClient;
var testDataSeeder = require('./testDataSeeder');
var databaseConnection = undefined;
var Q = require('q');

exports.connect = function(config) {

  if (!!config) {
    if(!!config.db) {
      MongoClient.connect(config.db, function(err, db) {
        if (!!err) {
          console.log("error connecting to database: " + err);
        } else {
          databaseConnection = db;
          console.log("database connected");
          if (config.reseedDBOnServerRestart === true) {
            testDataSeeder.reseedDatabase(databaseConnection);
          }
        }
      });
    }
    else {
      throw new Error('The provided Configuration parameter object did not contain the required "db" property')
    }
  } else {
    throw new Error("No configuration parameter object was provided");
  }
}

exports.disconnect = function() {
  if(!!databaseConnection) {
    MongoClient.close();
    databaseConnection = undefined;
   }
}

exports.DatabaseConnection = function() {
  if (!!databaseConnection) {
    return databaseConnection;
  } else {
    throw new Error("the database is not connected");
  }
}

exports.FindOne = function(collectionName, query) {
  var deferred = Q.defer();

  if(!collectionName && !query) {
    throw new Error("No parameters have been specified");
  } else if(!!collectionName && !query) {
    throw new Error("No query was passed as a parameter");
  } else if(!collectionName && !!query) {
    throw new Error("A query has been defined, but there is no collection name");
  } else if(typeof collectionName !== "string") {
    throw new Error("The collectionName parameter was not a valid String");
  }

  databaseConnection.collection(collectionName).findOne(query, function(err, record) {
    if (!!err) {
      deferred.reject(new Error("error getting record from database: " + err));
    } else {
      deferred.resolve(record);
    }
  });
  return deferred.promise;
}


exports.Find = function(collectionName, query) {
  var deferred = Q.defer();
  var returnDocs = new Array();
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
