var sandbox = sinon.sandbox.create();
var should = chai.should();

describe('the pieceFactory', function() {

  var pieceFactory, mockResource;

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

  it('should return a URL resource handler', inject(function(pieceFactory) {
    pieceFactory.resourceIsValid.should.be.true;
  }));

  it('should call the appropriate API with pieceId as an optional route parameter', inject(function(pieceFactory) {
    var callToResource = mockResource.firstCall;
    var resourceApiUrl = callToResource.args[0];
    resourceApiUrl.should.equal('/api/pieces/:pieceId');
  }));

  it('should pass the ISBN to the API when specified', inject(function(pieceFactory) {
    var callToResource = mockResource.firstCall;
    var resourceApiParameter = callToResource.args[1];
    resourceApiParameter.should.eql({pieceId: '@pieceId'});
  }));

});
