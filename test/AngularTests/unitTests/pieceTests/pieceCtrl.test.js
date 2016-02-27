var sandbox = sinon.sandbox.create();
var should = chai.should();
describe('The Piece Controller', function() {
  var mockUserResource, $httpBackend, controllerConstructor;
  var pieceCtrlModule, mockScope, mockRouteParams, mockPieceFactory;
  describe('given a valid pieceid as a route parameter', function() {
    before(function() {
      mockRouteParams = {pieceId : 'piece33'};
      mockPieceFactory = {
        get: sandbox.stub().returns({'validPiece': true}),
        query: sandbox.stub().returns([{'validPiece': true}])
      };
    });

    beforeEach(module('ductia'));
    beforeEach(inject(function($controller, $rootScope) {
      controllerConstructor = $controller;
      mockScope = $rootScope.$new();
      var pieceCtrlInjectedDependencies = {
        '$scope': mockScope,
        'pieceFactory': mockPieceFactory,
        '$routeParams': mockRouteParams
      };
      pieceCtrlModule = controllerConstructor('pieceCtrl', pieceCtrlInjectedDependencies);
    }));

    afterEach(function() {
      sandbox.verifyAndRestore();
    });

    it('should call the Piece Factory "Get" command', function() {
      var pieceFactoryGetStub = mockPieceFactory.get;
      var getStubCallCount = pieceFactoryGetStub.callCount;
      getStubCallCount.should.equal(1);
    });

    it('should pass the pieceId as a parameter', function() {
      var expectedQuery = {
        pieceId: 'piece33'
      }
      var firstCallToPieceFactoryGet = mockPieceFactory.get.firstCall;
      var getCallQueryParameter = firstCallToPieceFactoryGet.args[0];
      getCallQueryParameter.should.eql(expectedQuery);
    });

    it('should set the "Piece" property of the Scope to the return value of the query', function() {
      var scopePieceProperty = mockScope.Piece;
      scopePieceProperty.should.eql({'validPiece': true});
    });

  });

  describe('given no pieceId parameter', function() {
    beforeEach(module('ductia'));
    beforeEach(inject(function($controller, $rootScope) {
      controllerConstructor = $controller;
      mockScope = $rootScope.$new();
      var pieceCtrlInjectedDependencies = {
        '$scope': mockScope,
        'pieceFactory': mockPieceFactory,
        '$routeParams': {}
      };
      pieceCtrlModule = controllerConstructor('pieceCtrl', pieceCtrlInjectedDependencies);
    }));

    afterEach(function() {
      sandbox.verifyAndRestore();
    });

    it('should call the Piece Factory "Query" command', function() {
      var pieceFactoryQueryStub = mockPieceFactory.query;
      var getStubCallCount = pieceFactoryQueryStub.callCount;
      getStubCallCount.should.equal(1);
    });

    it('should set the "Pieces" property of the Scope to the return value of the query', function() {
      var scopePieceProperty = mockScope.Pieces;
      scopePieceProperty.should.eql([{'validPiece': true}]);
    });

  });

});
