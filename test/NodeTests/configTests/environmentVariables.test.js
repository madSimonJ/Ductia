'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var path = require('path');
var sandbox = sinon.sandbox.create();

var should = chai.should();

var environmentVariablesConfigModule;

var expectedRootPath = path.normalize(__dirname + '/../../../');

describe('the Environment Variables config module', function() {

  beforeEach(function() {
    environmentVariablesConfigModule = require('../../../server/config/environmentVariables');
    process.env.PORT = undefined;
  });

  it('should provide the correct environment variables for the test environment when "test" is passed as a parameter', function() {

    var testEnvVariables = environmentVariablesConfigModule['test'];
    testEnvVariables.rootPath.should.equal(expectedRootPath);
    testEnvVariables.db.should.equal('test');
    testEnvVariables.port.should.equal(8080);
    testEnvVariables.reseedDBOnServerRestart.should.be.false;

  });

  it('should provide the correct environment variables for the developmment environment when "test" is passed as a parameter', function() {

    var testEnvVariables = environmentVariablesConfigModule['development'];
    testEnvVariables.rootPath.should.equal(expectedRootPath);
    testEnvVariables.db.should.equal('mongodb://127.0.0.1/ductia');
    testEnvVariables.port.should.equal(8080);
    testEnvVariables.reseedDBOnServerRestart.should.be.true;

  });

  it('should provide the correct environment variables for the test environment when "test" is passed as a parameter', function() {

    var testEnvVariables = environmentVariablesConfigModule['production'];
    testEnvVariables.rootPath.should.equal(expectedRootPath);
    testEnvVariables.db.should.equal('production');
    testEnvVariables.port.should.equal(80);
    testEnvVariables.reseedDBOnServerRestart.should.be.false;
  });





});
