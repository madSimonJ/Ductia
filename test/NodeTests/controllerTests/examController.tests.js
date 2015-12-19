'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();

var should = chai.should();

var stubbedExamRepositoryModule = {
  getExams: sandbox.stub()
};

var mockReq = {
  name: "req",
  params: {
    board: 'abrsm',
    instrument: 'flute',
    grade: 1
  }
};

var mockRes = {
  name: "res"
};

var stubbedRouteResponsesModule = {
  SendDocumentIfFound: sandbox.stub()
}

var examControllerModule;

describe('the examRepository Module', function() {

  before(function() {
    mockery.enable();
  });

  after(function() {
    mockery.disable();
  });

  beforeEach(function() {
    mockery.registerMock('../repositories/examRepository', stubbedExamRepositoryModule);
    mockery.registerMock('../routes/routeResponses', stubbedRouteResponsesModule);
    mockery.registerAllowable('../../../server/controllers/examController', true);
    examControllerModule = require('../../../server/controllers/examController');
  });

  afterEach(function() {
    sandbox.verifyAndRestore();
    sandbox.reset();
    stubbedExamRepositoryModule.getExams.reset();
    mockery.deregisterAll();
  });

  describe("handleExamGetRequest function", function() {

    it("should forward the http Request object on to the RouteResponses module", function() {

      examControllerModule.handleExamGetRequest(mockReq, mockRes);

      var callToRouteReponsesModule = stubbedRouteResponsesModule.SendDocumentIfFound.firstCall;
      var routeResponseReqParameter = callToRouteReponsesModule.args[0];

      routeResponseReqParameter.name.should.equal("req");
    });

    it('should forward the http response object to the RouteResponses module', function() {
      examControllerModule.handleExamGetRequest(mockReq, mockRes);

      var callToRouteReponsesModule = stubbedRouteResponsesModule.SendDocumentIfFound.firstCall;
      var routeResponseResParameter = callToRouteReponsesModule.args[1];

      routeResponseResParameter.name.should.equal("res");
    });

    it('should call the examRepository getExam function', function() {
      examControllerModule.handleExamGetRequest(mockReq, mockRes);
      stubbedExamRepositoryModule.getExams.callCount.should.equal(1);
    });

    it('should pass the "board" req parameter to the examRepository getExam function', function() {
      examControllerModule.handleExamGetRequest(mockReq, mockRes);
      var callToExamRepositoryModule = stubbedExamRepositoryModule.getExams.firstCall;
      var getExamQueryParamter = callToExamRepositoryModule.args[0];
      getExamQueryParamter.board.should.equal('abrsm');
    });

    it('should pass the "instrument" req parameter to the examRepository getExam function', function() {
      examControllerModule.handleExamGetRequest(mockReq, mockRes);
      var callToExamRepositoryModule = stubbedExamRepositoryModule.getExams.firstCall;
      var getExamQueryParamter = callToExamRepositoryModule.args[0];
      getExamQueryParamter.instrument.should.equal('flute');
    });

    it('should pass the "grade" req parameter to the examRepository getExam function', function() {
      examControllerModule.handleExamGetRequest(mockReq, mockRes);
      var callToExamRepositoryModule = stubbedExamRepositoryModule.getExams.firstCall;
      var getExamQueryParamter = callToExamRepositoryModule.args[0];
      getExamQueryParamter.grade.should.equal(1);
    });

  });

})
