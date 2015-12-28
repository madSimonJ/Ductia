'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();

var should = chai.should();

var routeTestConfigModule;

var stubbedExamControllerModule = {
  handleExamGetRequest: 'handleExamGetRequest'
}

var stubbedBookRepositoryModule = {
    getAllBooks: "getAllBooks",
    getBook: "getBook"
}

var stubbedPieceRepositoryModule = {
  getAllPieces: "getAllPieces",
  getPiece: "getPiece"
}

var stubbedRouteResponsesModule = {
  SendFileNotFoundResponse: "SendFileNotFoundResponse",
}

var stubbedAppParameter = {
  get: sandbox.stub(),
  all: sandbox.stub()
}

describe('the apiRoute config module', function() {

  before(function() {
    mockery.enable();
  });

  after(function() {
    mockery.disable();
  });

  beforeEach(function() {
    mockery.registerMock('../controllers/examController', stubbedExamControllerModule);
    mockery.registerMock('../repositories/bookRepository', stubbedBookRepositoryModule);
    mockery.registerMock('../repositories/pieceRepository', stubbedPieceRepositoryModule);
    mockery.registerMock('./routeResponses', stubbedRouteResponsesModule);
        mockery.registerAllowable('../../../server/routes/apiRoutes', true);
    routeTestConfigModule = require('../../../server/routes/apiRoutes');
  });

  afterEach(function() {
    sandbox.verifyAndRestore();
    sandbox.reset();
    mockery.deregisterAll();
  });

  describe('ConfigureApiRoutes', function() {

    it('should send a "file not found" response if no parameters are added after the "api" URL parameter', function() {

      routeTestConfigModule.ConfigureApiRoutes(stubbedAppParameter);

      var appFirstCall = stubbedAppParameter.get.firstCall;
      appFirstCall.args[0].should.equal("/api");
      appFirstCall.args[1].should.equal("SendFileNotFoundResponse");
    });

    it('should configure the exam API Get URL and call the examController "handleExamGetRequest" function', function() {

      routeTestConfigModule.ConfigureApiRoutes(stubbedAppParameter);

      var appSecondCall = stubbedAppParameter.get.secondCall;
      appSecondCall.args[0].should.equal('/api/exams/:board?/:instrument?/:grade?');
      appSecondCall.args[1].should.equal('handleExamGetRequest');

    });

    it('should make a last default route, which returns a "file not found" response', function() {

      routeTestConfigModule.ConfigureApiRoutes(stubbedAppParameter);
      var appLastCall = stubbedAppParameter.all.lastCall;
      appLastCall.args[0].should.equal('/api/*');
      appLastCall.args[1].should.equal("SendFileNotFoundResponse");

    });

  });

});
