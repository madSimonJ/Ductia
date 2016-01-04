'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();

var should = chai.should();

var routeConfigModule;

var stubbedAppParameter = {
  name: "stubbedAppParameter",
  get: sandbox.stub(),
  all: sandbox.stub()
}

var stubbedApiRoutesModule = {
  ConfigureApiRoutes: sandbox.stub()
}

var stubbedStaticContentRoutesModule = {
  configureStaticContentRoutes: sandbox.stub()
}

var stubbedRouteResponsesModule = {
  redirectToIndex: "redirectToIndex"
}


describe('the routeConfig config module', function() {

  before(function() {
    mockery.enable();
  });

  after(function() {
    mockery.disable();
  });

  beforeEach(function() {
    mockery.registerMock('../routes/apiRoutes', stubbedApiRoutesModule);
    mockery.registerMock('../routes/staticContentRoutes', stubbedStaticContentRoutesModule);
    mockery.registerMock('../routes/routeResponses', stubbedRouteResponsesModule);
    mockery.registerAllowable('../../../server/config/routeConfig', true);
    routeConfigModule = require('../../../server/config/routeConfig');
  });

  afterEach(function() {
    sandbox.verifyAndRestore();
    sandbox.reset();
    stubbedStaticContentRoutesModule.configureStaticContentRoutes.reset();
    mockery.deregisterAll();
  });

  it('should call the API route config module', function() {

    routeConfigModule(stubbedAppParameter);
    stubbedApiRoutesModule.ConfigureApiRoutes.calledOnce.should.be.true;
    stubbedApiRoutesModule.ConfigureApiRoutes.firstCall.args[0].name.should.equal('stubbedAppParameter');

  });

  it('should call the Static Content route config module', function() {

    routeConfigModule(stubbedAppParameter);
    stubbedStaticContentRoutesModule.configureStaticContentRoutes.calledOnce.should.be.true;
    stubbedStaticContentRoutesModule.configureStaticContentRoutes.firstCall.args[0].name.should.equal("stubbedAppParameter")

  });

  it('should redirect calls with no URL parameters to Index', function() {

    routeConfigModule(stubbedAppParameter);
    var callToAppGet = stubbedAppParameter.get.firstCall;
    callToAppGet.args[0].should.equal('/');
    callToAppGet.args[1].should.equal('redirectToIndex');
  });

  it('should make a last default route to route all other routes to Index', function() {
    routeConfigModule(stubbedAppParameter);
    var callToAppGet = stubbedAppParameter.get.lastCall;
    callToAppGet.args[0].should.equal('*');
    callToAppGet.args[1].should.equal('redirectToIndex');
  });

});
