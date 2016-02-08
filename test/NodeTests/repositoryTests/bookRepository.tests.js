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
    sandbox.reset();
    sandbox.verifyAndRestore();
  });

  describe('getExams function', function() {

    describe('given a valid isbn', function() {

      var expectedQuery = {_id: '9781848494923'};
      var validIsbn = "9781848494923";
      var getBookResults;

      before(function() {
        getBookResults = bookRepositoryModule.getBook(validIsbn);
      });

      it('should call the dbConfigModule Find function once', function() {
        stubbedDatabaseConfigModule.Find.should.have.been.calledOnce;
      });

      it('should create the expected query to pass to the dbConfigMoudule', function() {
        
      });
    });
  });
});
