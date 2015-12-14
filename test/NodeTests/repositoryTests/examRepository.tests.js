'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var q = require('q');
var sandbox = sinon.sandbox.create();
var should = chai.should();

var FindOneStub = sandbox.stub();

FindOneStub.withArgs(sinon.match("exam"), sinon.match.has("examBoard", "abrsm")).returns(q.resolve({valid: true}));
FindOneStub.withArgs(sinon.match("exam"), sinon.match.any).returns(q.reject(new Error("A nasty error occured.")));


var stubbedDatabaseConfigModule = {
  FindOne: FindOneStub
};
var stubbedRouteResponsesModule = {
  SendDocumentIfFound: sandbox.stub()
};

var examRepositoryModule;
var consoleLogSpy;

describe('the examRepositoryModule', function() {

  before(function() {
    mockery.enable();
  });

  after(function() {
    mockery.disable();
  });

  beforeEach(function() {
    mockery.registerMock('../config/databaseConfig', stubbedDatabaseConfigModule);
    mockery.registerMock('../routes/routeResponses', stubbedRouteResponsesModule);
    mockery.registerAllowable('q');
    mockery.registerAllowable('../../../server/repositories/examRepository', true);
    examRepositoryModule = require('../../../server/repositories/examRepository');
  });

  afterEach(function() {
    sandbox.reset();
    sandbox.verifyAndRestore();
    mockery.deregisterAll();
  });

  describe('getExamQuery function', function() {

    it('should call the dbConfigModule FindOne function once', function() {
      examRepositoryModule.getExamQuery("abrsm", "flute", 1);
      stubbedDatabaseConfigModule.FindOne.should.have.been.calledOnce;
    });

    it('should specify "exam" as the collection name when querying the database', function() {
      examRepositoryModule.getExamQuery("abrsm", "flute", 1);
      var callToTheDatabase = stubbedDatabaseConfigModule.FindOne.firstCall;
      var collectionNameQueryParameter = callToTheDatabase.args[0];
      collectionNameQueryParameter.should.equal('exam');
    });

    it('should pass the "board", "instrument", and "grade" parameters to the database in the correct format', function() {
      var expectedQuery = {
        examBoard: "abrsm",
        instrument: "flute",
        grade: 1
      };
      examRepositoryModule.getExamQuery("abrsm", "flute", 1);
      var callToTheDatabase = stubbedDatabaseConfigModule.FindOne.firstCall;
      var actualQuery = callToTheDatabase.args[1];
      expectedQuery.should.eql(actualQuery);
    });

    it('should return the data from the database in a promise', function() {

      return examRepositoryModule.getExamQuery("abrsm", "flute", 1)
        .then(function(data) {
          data.should.eql({
            valid: true
          });
        })
        .catch(function(error) {
          throw new Error("fail");
        });
    });

    it("should return a failing promise if there is an issue getting data from the database", function() {

      return examRepositoryModule.getExamQuery("value that will cause a failure", "flute", 1)
        .then(function(data) {
          throw new Error("fail");
        })
        .catch(function(error) {
          error.message.should.equal("There was an error getting the requested Exam data: A nasty error occured.");
        });
    });

  });

});
