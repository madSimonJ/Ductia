'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();

var should = chai.should();

var stubbedAppParameter = {
  name: "stubbedAppParameter"
  get: sandbox.stub(),
  all: sandbox.stub()
}

var stubbedApiRoutesModule = {
  ConfigureApiRoutes: sandbox.stub()
}

var stubbedStaticContentRoutesModule = {

}

var stubbedRouteResponsesModule = {

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
    mockery.deregisterAll();
  });

  it('should call the API route config module', function() {

    //routeConfigModule(stubbedAppParameter);
    //stubbedApiRoutesModule.ConfigureApiRoutes.calledOnce.should.be.true;
    //stubbedApiRoutesModule.ConfigureApiRoutes.firstCall.args[0].name.should.equal('stubbedAppParameter');

  });



});
