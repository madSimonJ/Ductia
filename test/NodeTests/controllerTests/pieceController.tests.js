'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();

var should = chai.should();

var stubbedPieceRepositoryModule = {
  getPieces: sandbox.stub()
};

var mockReq = {
  name: 'req',
  params: {pieceid: 'piece39'}
};

var mockRes = {
  name: "res"
};

var stubbedRouteResponsesModule = {
  SendDocumentIfFound: sandbox.stub()
}

var pieceControllerModule;

describe('the pieceController Module', function() {

  before(function() {
    mockery.enable();
    mockery.registerMock('../repositories/pieceRepository', stubbedPieceRepositoryModule);
    mockery.registerMock('../routes/routeResponses', stubbedRouteResponsesModule);
    mockery.registerAllowable('../../../server/controllers/pieceController', true);
    pieceControllerModule = require('../../../server/controllers/pieceController');
    console.log('mockreq = ' + JSON.stringify(mockReq));
    pieceControllerModule.handlePieceGetRequest(mockReq, mockRes);
  });

  after(function() {
    mockery.deregisterAll();
    mockery.disable();
  });

  afterEach(function() {
    sandbox.verifyAndRestore();
  });

  describe("handlePieceGetRequest function", function() {

    it("should forward the http Request object on to the RouteResponses module", function() {
      var callToRouteReponsesModule = stubbedRouteResponsesModule.SendDocumentIfFound.firstCall;
      var routeResponseReqParameter = callToRouteReponsesModule.args[0];
      routeResponseReqParameter.name.should.equal("req");
    });

    it('should forward the http response object to the RouteResponses module', function() {
      var callToRouteReponsesModule = stubbedRouteResponsesModule.SendDocumentIfFound.firstCall;
      var routeResponseResParameter = callToRouteReponsesModule.args[1];

      routeResponseResParameter.name.should.equal("res");
    });

    it('should call the bookRepository getPieces function', function() {
      stubbedPieceRepositoryModule.getPieces.callCount.should.equal(1);
    });

    it('should pass the "pieceid" req parameter to the pieceRepository getPieces function', function() {
      var callToPieceRepositoryModule = stubbedPieceRepositoryModule.getPieces.firstCall;
      var getPieceQueryParamter = callToPieceRepositoryModule.args[0];
      getPieceQueryParamter.pieceid.should.equal('piece39');
    });

  });

})
