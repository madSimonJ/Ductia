'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var q = require('q');
var sandbox = sinon.sandbox.create();
var should = chai.should();

var FindStub = sandbox.stub();
FindStub.withArgs(sinon.match("piece"), sinon.match.has("_id", "piece39")).returns(q.resolve({valid: true}));
FindStub.withArgs(sinon.match("piece"), sinon.match.any).returns(q.reject(new Error("A nasty error occured.")));

var stubbedDatabaseConfigModule = {
  Find: FindStub
};

var stubbedRouteResponsesModule = {
  SendDocumentIfFound: sandbox.stub()
};

var pieceRepositoryModule;

describe('the pieceRepository module', function() {

  before(function() {
    mockery.enable();
    mockery.registerMock('../config/databaseConfig', stubbedDatabaseConfigModule);
    mockery.registerMock('../routes/routeResponses', stubbedRouteResponsesModule);
    mockery.registerAllowable('q');
    mockery.registerAllowable('../../../server/repositories/pieceRepository', true);
    pieceRepositoryModule = require('../../../server/repositories/pieceRepository');
  });

  after(function() {
    mockery.deregisterAll();
    mockery.disable();
  });

  afterEach(function() {
    sandbox.verifyAndRestore();
  });

  describe('getPieceList function', function() {

    describe('given a list of valid pieceIds', function() {
      var expectedQuery = { _id: { $in: ['piece39', 'piece40', 'piece41'] } };
      var validPieceIds = ['piece39', 'piece40', 'piece41'];
      var getPieceResults;
      var dbFindFunctionStub;
      var firstCallToFindFunction;

      before(function() {
        getPieceResults = pieceRepositoryModule.getPieceList({pieceIdList: validPieceIds});
        dbFindFunctionStub = stubbedDatabaseConfigModule.Find;
        firstCallToFindFunction = dbFindFunctionStub.firstCall;
      });

      after(function() {
        sandbox.reset();
        stubbedDatabaseConfigModule.Find.reset();
      });

      it('should call the dbConfigModule Find function once', function() {
        dbFindFunctionStub.callCount.should.equal(1);
      });

      it('should make a call to the "piece" collection', function() {
        firstCallToFindFunction.args[0].should.equal('piece');
      });

      it('should create the expected query to pass to the dbConfigMoudule', function() {
        firstCallToFindFunction.args[1].should.eql(expectedQuery);
      });

    });

  });

  describe('getPieces function', function() {

    describe('given a valid piece id', function() {

      var expectedQuery = {_id: 'piece39'};
      var validPieceId = 'piece39';
      var getPieceResults;
      var dbFindFunctionStub;
      var firstCallToFindFunction;

      before(function() {
        getPieceResults = pieceRepositoryModule.getPieces({pieceid: validPieceId});
        dbFindFunctionStub = stubbedDatabaseConfigModule.Find;
        firstCallToFindFunction = dbFindFunctionStub.firstCall;
      });

      after(function() {
        sandbox.reset();
        stubbedDatabaseConfigModule.Find.reset();
        dbFindFunctionStub.reset();
      });

      it('should call the dbConfigModule Find function once', function() {
        dbFindFunctionStub.callCount.should.equal(1);
      });

      it('should make a call to the "piece" collection', function() {
        firstCallToFindFunction.args[0].should.equal('piece');
      });

      it('should create the expected query to pass to the dbConfigMoudule', function() {
        firstCallToFindFunction.args[1].should.eql(expectedQuery);
      });
    });

    describe('given a request containing no search parametsrs', function() {

      var expectedQuery = {};
      var getPieceResults;
      var dbFindFunctionStub;
      var firstCallToFindFunction;

      before(function() {
        getPieceResults = pieceRepositoryModule.getPieces();
        dbFindFunctionStub = stubbedDatabaseConfigModule.Find;
        firstCallToFindFunction = dbFindFunctionStub.firstCall;
      });

      it('should call the dbConfigModule with a query that would return all records in the "book" collection', function() {
        firstCallToFindFunction.args[1].should.eql(expectedQuery);
      });

    });

    describe('given a request containing a non-string value of pieceid', function() {

      var queryContainingNonStringValue = {pieceid: 12345};

      it('should throw an error rejecting the parameter as invalid', function() {

        (function() {
          pieceRepositoryModule.getPieces(queryContainingNonStringValue);
        }).should.throw('The Piece Id provided was not a valid string');

      });

    });

    describe('given a request containing a query that would cause an error in the database', function() {

      var queryContainingErrorInducingData = {isbn: "12345"};

      it('should throw an error rejecting the parameter as invalid', function() {
          return pieceRepositoryModule.getPieces(queryContainingErrorInducingData)
          .then(function(data) {
            throw new Error("fail");
          })
          .catch(function(error) {
            error.message.should.equal("There was an error getting the requested Piece data: A nasty error occured.");
          });
        });
      });
  });
});
