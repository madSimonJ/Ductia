'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var q = require('q');
var sandbox = sinon.sandbox.create();
var should = chai.should();

var FindStub = sandbox.stub();
FindStub.withArgs(sinon.match("book"), sinon.match.has("_id", "9781848494923")).returns(q.resolve({valid: true}));
FindStub.withArgs(sinon.match("book"), sinon.match.any).returns(q.reject(new Error("A nasty error occured.")));

var stubbedDatabaseConfigModule = {
  Find: FindStub
};

var stubbedRouteResponsesModule = {
  SendDocumentIfFound: sandbox.stub()
};

var bookRepositoryModule;

describe('the bookRepository module', function() {

  before(function() {
    mockery.enable();
    mockery.registerMock('../config/databaseConfig', stubbedDatabaseConfigModule);
    mockery.registerMock('../routes/routeResponses', stubbedRouteResponsesModule);
    mockery.registerAllowable('q');
    mockery.registerAllowable('../../../server/repositories/bookRepository', true);
    bookRepositoryModule = require('../../../server/repositories/bookRepository');
  });

  after(function() {
    mockery.deregisterAll();
    mockery.disable();
  });

  afterEach(function() {
    sandbox.verifyAndRestore();
  });

    describe('getExams function', function() {

    describe('given a valid isbn', function() {

      var expectedQuery = {_id: '9781848494923'};
      var validIsbn = "9781848494923";
      var getBookResults;
      var dbFindFunctionStub;
      var firstCallToFindFunction;

      before(function() {
        getBookResults = bookRepositoryModule.getBooks({isbn: validIsbn});
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

      it('should make a call to the "book" collection', function() {
        firstCallToFindFunction.args[0].should.equal('book');
      });

      it('should create the expected query to pass to the dbConfigMoudule', function() {
        firstCallToFindFunction.args[1].should.eql(expectedQuery);
      });
    });

    describe('given a request containing no search parametsrs', function() {

      var expectedQuery = {};
      var getBookResults;
      var dbFindFunctionStub;
      var firstCallToFindFunction;

      before(function() {
        getBookResults = bookRepositoryModule.getBooks();
        dbFindFunctionStub = stubbedDatabaseConfigModule.Find;
        firstCallToFindFunction = dbFindFunctionStub.firstCall;
      });

      it('should call the dbConfigModule with a query that would return all records in the "book" collection', function() {
        firstCallToFindFunction.args[1].should.eql(expectedQuery);
      });

    });

    describe('given a request containing a non-string value of isbn', function() {

      var queryContainingNonStringValue = {isbn: 12345};

      it('should throw an error rejecting the parameter as invalid', function() {

        (function() {
          bookRepositoryModule.getBooks(queryContainingNonStringValue);
        }).should.throw('The ISBN number provided was not a valid string');

      });

    });

    describe('given a request containing a query that would cause an error in the database', function() {

      var queryContainingErrorInducingData = {isbn: "12345"};

      it('should throw an error rejecting the parameter as invalid', function() {
          return bookRepositoryModule.getBooks(queryContainingErrorInducingData)
          .then(function(data) {
            throw new Error("fail");
          })
          .catch(function(error) {
            error.message.should.equal("There was an error getting the requested Exam data: A nasty error occured.");
          });
        });
      });
  });
});
