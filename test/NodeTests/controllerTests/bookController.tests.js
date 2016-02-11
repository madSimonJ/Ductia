'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();

var should = chai.should();

var stubbedBookRepositoryModule = {
  getBooks: sandbox.stub()
};

var mockReq = {
  name: 'req',
  params:   {isbn: '9781848494923'}
};

var mockRes = {
  name: "res"
};

var stubbedRouteResponsesModule = {
  SendDocumentIfFound: sandbox.stub()
}

var bookControllerModule;

describe('the bookController Module', function() {

  before(function() {
    mockery.enable();
    mockery.registerMock('../repositories/bookRepository', stubbedBookRepositoryModule);
    mockery.registerMock('../routes/routeResponses', stubbedRouteResponsesModule);
    mockery.registerAllowable('../../../server/controllers/bookController', true);
    bookControllerModule = require('../../../server/controllers/bookController');
    bookControllerModule.handleBookGetRequest(mockReq, mockRes);
  });

  after(function() {
    mockery.deregisterAll();
    mockery.disable();
  });

  afterEach(function() {
    sandbox.verifyAndRestore();
  });

  describe("handleBookGetRequest function", function() {

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

    it('should call the bookRepository getBooks function', function() {
      stubbedBookRepositoryModule.getBooks.callCount.should.equal(1);
    });

    it('should pass the "isbn" req parameter to the bookRepository getBooks function', function() {
      var callTobookRepositoryModule = stubbedBookRepositoryModule.getBooks.firstCall;
      var getExamQueryParamter = callTobookRepositoryModule.args[0];
      getExamQueryParamter.isbn.should.equal('9781848494923');
    });

  });

})
