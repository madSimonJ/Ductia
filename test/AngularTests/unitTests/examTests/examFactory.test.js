var sandbox = sinon.sandbox.create();
var should = chai.should();

describe('the examFactory', function() {

  var examFactory, mockResource;

  beforeEach(module('ductia'));
  beforeEach(function() {
    mockResource = sandbox.stub().returns({
      resourceIsValid: true
    });

    module(function($provide) {
      $provide.value('$resource', mockResource);
    });

  });

  afterEach(function() {
    sandbox.verifyAndRestore();
  });

  it('should return a URL resource handler', inject(function(examFactory) {
    examFactory.resourceIsValid.should.be.true;
  }));

  it('should call the appropriate API with board, instrument & grades as optional route parameters', inject(function(examFactory) {
    var callToResource = mockResource.firstCall;
    var resourceApiUrl = callToResource.args[0];
    resourceApiUrl.should.equal('/api/exams/:board/:instrument/:grade');
  }));

  it('should pass the ISBN to the API when specified', inject(function(examFactory) {
    var callToResource = mockResource.firstCall;
    var resourceApiParameter = callToResource.args[1];
    resourceApiParameter.should.eql({board: '@board', instrument: '@instrument', grade: '@grade'});
  }));

});
