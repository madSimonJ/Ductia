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

var stubbedBookControllerModule = {
    handleBookGetRequest: "handleBookGetRequest"
}

var stubbedPieceControllerModule = {
  handlePieceGetRequest: "handlePieceGetRequest"
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
    mockery.registerMock('../controllers/examController', stubbedExamControllerModule);
    mockery.registerMock('../controllers/bookController', stubbedBookControllerModule);
    mockery.registerMock('../controllers/pieceController', stubbedPieceControllerModule);
    mockery.registerMock('./routeResponses', stubbedRouteResponsesModule);
    mockery.registerAllowable('../../../server/routes/apiRoutes', true);
    routeTestConfigModule = require('../../../server/routes/apiRoutes');
    routeTestConfigModule.ConfigureApiRoutes(stubbedAppParameter);
  });

  after(function() {
    mockery.deregisterAll();
    mockery.disable();
  });

  afterEach(function() {
    sandbox.verifyAndRestore();
  });

  describe('ConfigureApiRoutes', function() {

    it('should configure the exam API Get URL and call the examController "handleExamGetRequest" function', function() {

      var appFirstCall = stubbedAppParameter.get.firstCall;
      appFirstCall.args[0].should.equal('/api/exams/:board?/:instrument?/:grade?');
      appFirstCall.args[1].should.equal('handleExamGetRequest');

    });

    it('should configure the book API Get URL and call the bookController "handleBookGetRequest" function', function() {

      var appSecondCall = stubbedAppParameter.get.secondCall;
      appSecondCall.args[0].should.equal('/api/books/:isbn?');
      appSecondCall.args[1].should.equal('handleBookGetRequest');
    });

    it('should configure the piece API Get URL and call the pieceController "handlePieceGetRequest" function', function() {

      var appThirdCall = stubbedAppParameter.get.thirdCall;
      appThirdCall.args[0].should.equal('/api/pieces/:pieceId?');
      appThirdCall.args[1].should.equal('handlePieceGetRequest');
    });

    it('should make a last default route, which returns a "file not found" response', function() {

      var appLastCall = stubbedAppParameter.all.lastCall;
      appLastCall.args[0].should.equal('/api/*');
      appLastCall.args[1].should.equal("SendFileNotFoundResponse");

    });

  });

});
