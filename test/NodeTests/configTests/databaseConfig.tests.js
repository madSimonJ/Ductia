'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();

var should = chai.should();

var databaseConfigModule;
var consoleLogSpy;

var stubbedMongoDb = {
  MongoClient: {
    connect: sandbox.stub(),
    close: sandbox.stub()
  }
};

var findOneStub = sandbox.stub();
findOneStub.withArgs(sinon.match({
  valid: true
}), sinon.match.any).callsArgWith(1, undefined, {
  valid: true
});
findOneStub.withArgs(sinon.match({
  valid: false
}), sinon.match.any).callsArgWith(1, "A nasty error occured", undefined);

var findStub = sandbox.spy(function(query) {
  var validDatacCursorStub = {
    each: function(callback) {
      callback(undefined, {valid: true});
      callback(undefined, {valid: true});
      callback(undefined, null);
    }
  };

  var invalidDataCursorStub = {
    each: function(callback) {
      callback("A nasty error occured", null);
    }
  }

  return query.valid ? validDatacCursorStub : invalidDataCursorStub;
});



var stubbedMongoDbConnectionObject = {
  connection: "success",
  collection: function(collectionName) {
    return {
      findOne: findOneStub,
      find: findStub
    };
  }
};

stubbedMongoDb.MongoClient.connect.withArgs(sinon.match('mongoDB connection string'), sinon.match.any).callsArgWith(1, undefined, stubbedMongoDbConnectionObject);
stubbedMongoDb.MongoClient.connect.withArgs(sinon.match('invalid connection string'), sinon.match.any).callsArgWith(1, "A nasty error occured", {});


var stubbedTestDataSeeder = {
  reseedDatabase: sandbox.stub()
}



var testConfig = {
  db: 'mongoDB connection string',
  reseedDBOnServerRestart: false
};


describe('the databaseConfig module', function() {

  before(function() {
    mockery.enable();
  });

  after(function() {
    mockery.disable();
  });

  beforeEach(function() {
    mockery.registerMock('mongodb', stubbedMongoDb);
    mockery.registerMock('./testDataSeeder', stubbedTestDataSeeder);
    mockery.registerAllowable('q');
    mockery.registerAllowable('../../../server/config/databaseConfig', true);
    databaseConfigModule = require('../../../server/config/databaseConfig');
    consoleLogSpy = sandbox.stub(console, 'log');
  });

  afterEach(function() {
    databaseConfigModule.disconnect();
    sandbox.verifyAndRestore();
    stubbedMongoDb.MongoClient.connect.reset();
    stubbedMongoDb.MongoClient.close.reset();
    sandbox.reset();
    mockery.deregisterAll();
  });



  describe('connect function', function() {

    it('should throw an error if no Config parameter is passed in', function() {

      (function() {
        databaseConfigModule.connect();
      }).should.throw('No configuration parameter object was provided');

    });

    it('should throw an error if a Config parameter is passed in that does not contain the "db" property', function() {

      (function() {
        databaseConfigModule.connect({});
      }).should.throw('The provided Configuration parameter object did not contain the required "db" property');

    });

    it('should call the MongoDB Client "connect" function', function() {

      databaseConfigModule.connect(testConfig);

      var mongoClientConnectMethodHasBeenCalled = stubbedMongoDb.MongoClient.connect.calledOnce;
      mongoClientConnectMethodHasBeenCalled.should.be.true;
    });

    it('should pass the "db" parameter of the config object parameter to MongoDB as the connection string', function() {
      databaseConfigModule.connect(testConfig);
      stubbedMongoDb.MongoClient.connect.firstCall.args[0].should.equal("mongoDB connection string");
    });

    it('should write a message to the console if no errors occur connecting to the database', function() {

      databaseConfigModule.connect(testConfig);

      consoleLogSpy.callCount.should.equal(1);
      consoleLogSpy.firstCall.args[0].should.equal("database connected");
    });

    it('should write a message to the console if an error occured connecting to the database, which includes details of the error', function() {

      databaseConfigModule.connect({
        db: 'invalid connection string'
      });

      consoleLogSpy.callCount.should.equal(1);
      consoleLogSpy.firstCall.args[0].should.equal("error connecting to database: A nasty error occured");
    });

    it("should save the connection object returned by MongoDB after a sucessful connection and make it available via the DatabaseConnection method", function() {

      databaseConfigModule.connect(testConfig);
      var databaseConnectionObject = databaseConfigModule.DatabaseConnection();
      var databseConnectionObjectWasStored = databaseConnectionObject.connection === "success";

      databseConnectionObjectWasStored.should.be.true;

    });

    it('should not call the test data seeder if the property "reseedDBOnServerRestart" is False', function() {

      databaseConfigModule.connect(testConfig);

      var testDataSeederWaCalled = stubbedTestDataSeeder.reseedDatabase.called;

      testDataSeederWaCalled.should.not.be.true;
    });

    it('should call the test data seeder if the property "reseedDBOnServerRestart" is true', function() {

      databaseConfigModule.connect({
        db: 'mongoDB connection string',
        reseedDBOnServerRestart: true
      });

      var testDataSeederWaCalled = stubbedTestDataSeeder.reseedDatabase.called;

      testDataSeederWaCalled.should.be.true;

    });

    it('should not call the test data seeder if the property "reseedDBOnServerRestart" is truthy, but not true', function() {

      databaseConfigModule.connect({
        db: 'mongoDB connection string',
        reseedDBOnServerRestart: 'true'
      });

    });

  });

  describe('disconnect function', function() {

    it('should call the MongoDb "close" function if the database has been connected to', function() {

      databaseConfigModule.connect(testConfig);
      databaseConfigModule.disconnect();

      var mongoDbCloseFunctionWasCalled = stubbedMongoDb.MongoClient.close.called;

      mongoDbCloseFunctionWasCalled.should.be.true;

    });

    it('should not call the MongoDb "close" function if the database has not been connected to', function() {

      databaseConfigModule.disconnect();

      var mongoDbCloseFunctionWasCalled = stubbedMongoDb.MongoClient.close.called;

      mongoDbCloseFunctionWasCalled.should.be.false;
    });

    it('should cause the "DatabaseConnection()" function to thrown an error, because the database is no longer connected', function() {

      databaseConfigModule.connect(testConfig);
      databaseConfigModule.disconnect();

      (function() {
        databaseConfigModule.DatabaseConnection();
      }).should.throw('the database is not connected');
    });
  });

  describe('DatabaseConnection function', function() {

    it('should return an error if the DatabaseConnection is requested before a connection has been established', function() {

      (function() {
        databaseConfigModule.DatabaseConnection()
      }).should.throw("the database is not connected");
    });

    it('should return the database connection object if a connection has been established', function() {

      databaseConfigModule.connect(testConfig);

      var dbConnectionObjectReceived = databaseConfigModule.DatabaseConnection();
      var correctDbConnectionObjectWasReceived = dbConnectionObjectReceived.connection === "success";

      correctDbConnectionObjectWasReceived.should.be.true;
    });

  });

  describe('FindOne function', function() {

    it('should call the MongoDB "findOne" function', function() {

      databaseConfigModule.connect(testConfig);
      databaseConfigModule.FindOne('collection', {
        valid: true
      });
      findOneStub.should.be.calledOnce;

    });

    it('should return a promise that resolves to a data set if a valid query was passed in', function(done) {
      databaseConfigModule.connect(testConfig);
      return databaseConfigModule.FindOne('collection', {
          valid: true
        })
        .then(function(data) {
          data.valid.should.be.true;
          done();
        });
    });

    it('should return a promise that fails if an invalid query is passed in', function() {
      databaseConfigModule.connect(testConfig);
      return databaseConfigModule.FindOne('collection', {valid: false})
        .then(function(data) {
          throw new Error("fail");
        })
        .catch(function(err) {
          err.message.should.equal("error getting record from database: A nasty error occured");
        });
    });

    it('should throw an error if no query is passed in as a paramter', function() {

      databaseConfigModule.connect(testConfig);

      (function() {
        databaseConfigModule.FindOne('collection');
      }).should.throw("No query was passed as a parameter");

    });

    it('should throw an error message if no parameters are passed in', function() {

      databaseConfigModule.connect(testConfig);

      (function() {
        databaseConfigModule.FindOne();
      }).should.throw("No parameters have been specified");

    });

    it("should throw an error message if a query is passed, but the collection name is undefined", function() {

      databaseConfigModule.connect(testConfig);

      (function() {
        databaseConfigModule.FindOne(undefined, {valid: true})
      }).should.throw("A query has been defined, but there is no collection name");

    });

    it("should throw an error message if the collection name provided is not a string", function() {

      databaseConfigModule.connect(testConfig);

      (function() {
        databaseConfigModule.FindOne({value: "not a string"}, {valid: true});
      }).should.throw("The collectionName parameter was not a valid String");
    });

  });

  describe('Find function', function() {

    it('should call the MongoDb "Find" method', function() {
      databaseConfigModule.connect(testConfig);
      databaseConfigModule.Find('collection', {valid: true});

      var mongoDbFindFunctionWasCalled = findStub.calledOnce;

      mongoDbFindFunctionWasCalled.should.be.true;

    });

    it('should return a promise that resolves and returns data if the query parameters were valid', function() {
      databaseConfigModule.connect(testConfig);
      return databaseConfigModule.Find('collection', {valid: true})
      .then(function(data) {
        data.length.should.equal(2);
        data[0].valid.should.be.true;
        data[1].valid.should.be.true;
      });

    });

    it('should return a promise that fails if there is a problem reading the data', function() {
      databaseConfigModule.connect(testConfig);
      return databaseConfigModule.Find('collection', {valid: false})
      .then(function(data) {
        throw new Error("fail");
      })
      .catch(function(err) {
        err.message.should.equal("error reading record: A nasty error occured");
      });
    });

    it('Should raise an error if no query parameter is provided', function() {

      databaseConfigModule.connect(testConfig);

      (function() {databaseConfigModule.Find('collection');}).should.throw('No query was passed as a parameter');

    });

    it('Should raise an error if no parameters are provided', function() {

      databaseConfigModule.connect(testConfig);

      (function() {databaseConfigModule.Find();}).should.throw('No parameters have been specified');

    });

    it('Should raise an error if a query is provided, but the collectionName is undefined', function() {

      databaseConfigModule.connect(testConfig);

      (function() {databaseConfigModule.Find(undefined, {valid: true});}).should.throw('A query has been defined, but there is no collection name');

    });

    it('Should raise an error if the collectionName parameter is not a valid String', function() {

      databaseConfigModule.connect(testConfig);

      (function() {databaseConfigModule.Find({value: "not a string"}, {valid: true});}).should.throw('The collectionName parameter was not a valid String');

    });


  });

});
