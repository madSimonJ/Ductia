'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();
var q = require('q');
var should = chai.should();

var mockReq = {};

var sendStub = {
  send: sandbox.stub()
}

var mockRes = {
  sendStatus: sandbox.stub(),
  render: sandbox.stub(),
  status: sandbox.stub().returns(sendStub)
}

var routeResponsesModule;

describe('the routeResponses module', function() {

  before(function() {
    routeResponsesModule = require('../../../server/routes/routeResponses');
  });

  describe('SendDocumentIfFound function', function() {

    describe('given a successful request', function() {

      before(function() {
          routeResponsesModule.SendDocumentIfFound(mockReq, mockRes, q.resolve({dataWasPassed: true}));
      });

      after(function() {
        sandbox.reset();
        mockRes.status.reset();
        sendStub.send.reset();
      });

      afterEach(function() {
        sandbox.verifyAndRestore();
      });

      it('should return an HTTP "Success" code', function() {
        var firstCallToStatus = mockRes.status.firstCall;
        firstCallToStatus.args[0].should.equal(200);
      });

      it('should return the data received in the promise as part of the HTTP response', function() {
        var firstCallToSendStub = sendStub.send.firstCall;
        firstCallToSendStub.args[0].dataWasPassed.should.be.true;
      });
    });

    describe('given a failing request', function() {
      before(function() {
          routeResponsesModule.SendDocumentIfFound(mockReq, mockRes, q.reject(new Error("A nasty error occured.")));
      });

      after(function() {
        sandbox.reset();
        mockRes.status.reset();
        sendStub.send.reset();
      });

      afterEach(function() {
        sandbox.verifyAndRestore();
      });

      it('should return an Error code in the HTTP response', function() {
        var firstCallToStatus = mockRes.status.firstCall;
        firstCallToStatus.args[0].should.equal(500);
      });

      it('should return the error details in the HTTP response', function() {
        var firstCallToSendStub = sendStub.send.firstCall;
        firstCallToSendStub.args[0].error.should.equal('A nasty error occured.');
      });

    });

  });


  describe('SendFileNotFoundResponse function', function() {

    var firstCallToSendStatus;

    before(function() {
      routeResponsesModule.SendFileNotFoundResponse(mockReq, mockRes);
      firstCallToSendStatus = mockRes.sendStatus.firstCall;
    });

    afterEach(function() {
      sandbox.verifyAndRestore();
    });

      it('should return a File Not Found HTTP status', function() {
        firstCallToSendStatus.args[0].should.equal(404);
      });
  });

  describe('redirectToIndex function', function() {

    var firstCallToRender;

    before(function() {
      routeResponsesModule.redirectToIndex(mockReq, mockRes);
      firstCallToRender = mockRes.render.firstCall;
    });

    it('should render the index page', function() {
      firstCallToRender.args[0].should.equal('index');
    });

  });
});
