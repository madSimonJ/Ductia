'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var path = require('path');
var sandbox = sinon.sandbox.create();

var should = chai.should();

var middlewareConfigModule;

var stubbedAppParameter = {
  name: "stubbedAppParameter",
  set: sandbox.stub(),
  use: sandbox.stub()
}

var stubbedExpressModule = {

};

var stubbedSandboxSetModule = sandbox.stub();

var stubbedStylusMiddlewareSet = sandbox.stub();

var stubbedStylusModule = sandbox.stub().returns({
  set: stubbedStylusMiddlewareSet
});

stubbedStylusModule.middleware = sandbox.stub().returns({
  name: 'stylus.middleware',
});

var stubbedMorganModule = sandbox.stub().returns('morgan');

var stubbedBodyParserModule = {
  urlencoded: sandbox.stub().returns('urlencoded'),
  json: sandbox.stub().returns('json')
};

var stubbedFalcorRoutesModule = {
  GetRouter: sandbox.stub().returns('GetRouter'),
  GetDataSourceRoute: sandbox.stub().returns('GetDataSourceRoute')
};

var stubbedExpressSessionModule = {

};

var expectedRootPath;

describe('the middlewareConfig module', function() {

  before(function() {
    mockery.enable();
  });

  after(function() {
    mockery.disable();
  });

  beforeEach(function() {
    mockery.registerMock('express', stubbedExpressModule);
    mockery.registerMock('stylus', stubbedStylusModule);
    mockery.registerMock('morgan', stubbedMorganModule);
    mockery.registerMock('body-parser', stubbedBodyParserModule);
    mockery.registerMock('express-session', stubbedExpressSessionModule);
    mockery.registerMock('../falcor/falcorRoutes', stubbedFalcorRoutesModule);
    mockery.registerAllowable('../../../server/config/middlewareConfig', true);
    mockery.registerAllowable('../../../server/config/environmentVariables', true);
    middlewareConfigModule = require('../../../server/config/middlewareConfig');
    var config = require('../../../server/config/environmentVariables')['test'];
    expectedRootPath = config.rootPath;
    middlewareConfigModule(stubbedAppParameter, config);
  });

  afterEach(function() {
    sandbox.verifyAndRestore();
    sandbox.reset();
    stubbedAppParameter.set.reset();
    stubbedAppParameter.use.reset();
    stubbedStylusModule.middleware.reset();
    stubbedBodyParserModule.urlencoded.reset();
    stubbedBodyParserModule.json.reset();
    stubbedFalcorRoutesModule.GetRouter.reset();
    stubbedFalcorRoutesModule.GetDataSourceRoute.reset();
    stubbedSandboxSetModule.reset();
    stubbedStylusMiddlewareSet.reset();
    mockery.deregisterAll();
  });

  it('should set "/server/views" as the Express Views directory', function() {
    var expectedViewsDirectory = expectedRootPath + '/server/views';
    var callToAppSet = stubbedAppParameter.set.firstCall;
    callToAppSet.args[0].should.equal('views');
    callToAppSet.args[1].should.equal(expectedViewsDirectory);
  });

  it('should set the Express View Engine as "Jade"', function() {
    var callToAppSet = stubbedAppParameter.set.secondCall;
    callToAppSet.args[0].should.equal('view engine');
    callToAppSet.args[1].should.equal('jade');
  });

  it('should set Stylus as an Express middleware', function() {
    var callToAppUse = stubbedAppParameter.use.firstCall;
    callToAppUse.args[0].name.should.equal('stylus.middleware');
  });

  it('should configure Stylus to use the "public" folder as a root path', function() {
    var expectedSrcDirectory = expectedRootPath + '/public';
    var callToStylusMiddleware = stubbedStylusModule.middleware.firstCall;
    callToStylusMiddleware.args[0].src.should.equal(expectedSrcDirectory);
  });

  it('should pass Stylus a compile function', function() {
    var callToStylusMiddleware = stubbedStylusModule.middleware.firstCall;
    var compileFunctionType = typeof callToStylusMiddleware.args[0].compile;
    compileFunctionType.should.equal("function");
  });

  describe('Stylus Compile function', function() {

    it('should pass the string parameter to the Stylus function', function() {
      var callToStylusMiddleware = stubbedStylusModule.middleware.firstCall;
      var compileFunction = callToStylusMiddleware.args[0].compile;
      compileFunction('this is a string', 'this is a path');
      var callToStylusModule = stubbedStylusModule.firstCall;
      callToStylusModule.args[0].should.equal('this is a string');
    });

    it('should pass the second parameter as the filename', function() {
      var callToStylusMiddleware = stubbedStylusModule.middleware.firstCall;
      var compileFunction = callToStylusMiddleware.args[0].compile;
      compileFunction('this is a string', 'this is a path');
      var callToStylusModule = stubbedStylusMiddlewareSet.firstCall;
      callToStylusModule.args[0].should.equal('filename');
      callToStylusModule.args[1].should.equal('this is a path');
    });

  });

  it('should set Morgan as a Middleware', function() {
    var callToAppUse = stubbedAppParameter.use.secondCall;
    callToAppUse.args[0].should.equal('morgan');
    stubbedMorganModule.should.be.calledOnce;
  });

  it('should configure Morgan to use the "Dev" formatter', function() {
    var callToMorgan = stubbedMorganModule.firstCall;
    callToMorgan.args[0].should.equal("dev");
  });

  it('should configure body-parser to process url encoded form data', function() {
    var callToAppUse = stubbedAppParameter.use.thirdCall;
    callToAppUse.args[0].should.equal('urlencoded');
    stubbedBodyParserModule.urlencoded.should.be.calledOnce;
  });

  it('should configure body-parser\'s url encoded middleware to also allow JSON-like objects', function() {
    var callToUrlEncoded = stubbedBodyParserModule.urlencoded.firstCall;
    callToUrlEncoded.args[0].extended.should.be.true;
  });

  it('should configure body-parser to process JSON data', function() {
    var callToAppUse = stubbedAppParameter.use.getCall(3);
    callToAppUse.args[0].should.equal('json');
    stubbedBodyParserModule.json.should.be.calledOnce;
  });

});
