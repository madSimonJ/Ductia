'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var q = require('q');
var sandbox = sinon.sandbox.create();
var should = chai.should();

var FindStub = sandbox.stub();

FindStub.withArgs(sinon.match("exam"), sinon.match.has("examBoard", "abrsm")).returns(q.resolve({valid: true}));
FindStub.withArgs(sinon.match("exam"), sinon.match.any).returns(q.reject(new Error("A nasty error occured.")));


var stubbedDatabaseConfigModule = {
  Find: FindStub
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
    stubbedDatabaseConfigModule.Find.reset();
    mockery.deregisterAll();
  });

  describe('getExams function', function() {

    it('should call the dbConfigModule Find function once', function() {
      examRepositoryModule.getExams("abrsm", "flute", 1);
      stubbedDatabaseConfigModule.Find.should.have.been.calledOnce;
    });

    it('should specify "exam" as the collection name when querying the database', function() {
      examRepositoryModule.getExams("abrsm", "flute", 1);
      var callToTheDatabase = stubbedDatabaseConfigModule.Find.firstCall;
      var collectionNameQueryParameter = callToTheDatabase.args[0];
      collectionNameQueryParameter.should.equal('exam');
    });

    it('should pass the "board", "instrument", and "grade" parameters to the database in the correct format', function() {
      var expectedQuery = {
        examBoard: "abrsm",
        instrument: "flute",
        grade: 1
      };
      examRepositoryModule.getExams("abrsm", "flute", 1);
      var callToTheDatabase = stubbedDatabaseConfigModule.Find.firstCall;
      var actualQuery = callToTheDatabase.args[1];
      expectedQuery.should.eql(actualQuery);
    });

    it('should assemble a query missing the "examBoard" property if no value is passed for it', function() {
      var expectedQuery = {
        instrument: "flute",
        grade: 1
      };
      examRepositoryModule.getExams(undefined, "flute", 1);
      var callToTheDatabase = stubbedDatabaseConfigModule.Find.firstCall;
      var actualQuery = callToTheDatabase.args[1];
      expectedQuery.should.eql(actualQuery);
    });

    it('should assemble a query missing the "instrument" property if no value is passed for it', function() {
      var expectedQuery = {
        examBoard: "abrsm",
        grade: 1
      }

      examRepositoryModule.getExams("abrsm", undefined, 1);
      var callToTheDatabase = stubbedDatabaseConfigModule.Find.firstCall;
      var actualQuery = callToTheDatabase.args[1];
      expectedQuery.should.eql(actualQuery);

    });

    it('should assemble a query missing the "grade" property if no value is passed for it', function() {
      var expectedQuery = {
        examBoard: "abrsm",
        instrument: "flute"
      }

      examRepositoryModule.getExams("abrsm", "flute");
      var callToTheDatabase = stubbedDatabaseConfigModule.Find.firstCall;
      var actualQuery = callToTheDatabase.args[1];
      expectedQuery.should.eql(actualQuery);

    });

    it('should correctly assemble a query if provided only the examBoard', function() {
      var expectedQuery = {
        examBoard: "abrsm"
      }

      examRepositoryModule.getExams("abrsm");
      var callToTheDatabase = stubbedDatabaseConfigModule.Find.firstCall;
      var actualQuery = callToTheDatabase.args[1];
      expectedQuery.should.eql(actualQuery);
    });

    it('should correctly assemble a query if provided only the instrument', function() {
      var expectedQuery = {
        instrument: "flute"
      }

      examRepositoryModule.getExams(undefined, "flute");
      var callToTheDatabase = stubbedDatabaseConfigModule.Find.firstCall;
      var actualQuery = callToTheDatabase.args[1];
      expectedQuery.should.eql(actualQuery);
    });

    it('should correctly assemble a query if provided only the grade', function() {
      var expectedQuery = {
        grade: 1
      }

      examRepositoryModule.getExams(undefined, undefined, 1);
      var callToTheDatabase = stubbedDatabaseConfigModule.Find.firstCall;
      var actualQuery = callToTheDatabase.args[1];
      expectedQuery.should.eql(actualQuery);
    });

    it('should send an empty query if no parameters are passed', function() {
      var expectedQuery = {}

      examRepositoryModule.getExams();
      var callToTheDatabase = stubbedDatabaseConfigModule.Find.firstCall;
      var actualQuery = callToTheDatabase.args[1];
      expectedQuery.should.eql(actualQuery);
    });


    it('should return the data from the database in a promise', function() {

      return examRepositoryModule.getExams("abrsm", "flute", 1)
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

      return examRepositoryModule.getExams("value that will cause a failure", "flute", 1)
        .then(function(data) {
          throw new Error("fail");
        })
        .catch(function(error) {
          error.message.should.equal("There was an error getting the requested Exam data: A nasty error occured.");
        });
    });

    it("should throw an error if an examBoard parameter is passed that isn't a string", function() {

      (function() {
        examRepositoryModule.getExams({examBoard: "abrsm"}, "flute", 1);
      }).should.throw.error("the examBoard provided was not a valid string");

    });

    it("should throw an error if an instrument parameter is passed that isn't a string", function() {

      (function() {
        examRepositoryModule.getExams("abrsm", {instrument: "flute"}, 1);
      }).should.throw.error("the grade provided was not a valid string");

    });

    it("should throw an error if a grade parameter is passed that isn't an integer", function() {

      (function() {
        examRepositoryModule.getExams("abrsm", "flute", "1");
      }).should.throw.error("the grade provided was not a valid integer");

    });

  });

});
