'use strict';

var chai = require('chai');
var expect = chai.expect;
var mockery = require('mockery');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();

var should = chai.should();

var databaseConfigModule;
var consoleLogSpy;

var stubbedMongoDb = {
  MongoClient: {
    connect: sandbox.stub()
  }
};

stubbedMongoDb.MongoClient.connect.withArgs(sinon.match('mongoDB connection string'), sinon.match.any).callsArgWith(1, undefined, {
  connection: "success"
});
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
    sandbox.verifyAndRestore();
    mockery.deregisterAll();
  });



  describe('connect function', function() {

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


  describe('DatabaseConnection function', function() {

  });

  describe('FindOne function', function() {

  });

  describe('Find function', function() {
    
  });

});
