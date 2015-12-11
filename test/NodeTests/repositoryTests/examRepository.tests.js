'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();
var should = chai.should();

var stubbedDatabaseConfigModule = {
  FindOne: sandbox.stub()
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
    consoleLogSpy = sandbox.stub(console, 'log');
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
  });

});
