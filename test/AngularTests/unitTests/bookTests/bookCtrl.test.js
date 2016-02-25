var sandbox = sinon.sandbox.create();
var should = chai.should();
describe('The Book Controller', function() {
  var mockUserResource, $httpBackend, controllerConstructor;
  var bookCtrlModule, mockScope, mockRouteParams, mockBookFactory;
  describe('given a valid ISBN as a route parameter', function() {
    before(function() {
      mockRouteParams = {isbn : 'a valid isbn'};
      mockBookFactory = {
        get: sandbox.stub().returns({'validBook': true}),
        query: sandbox.stub().returns([{'validBook': true}])
      };
    });

    beforeEach(module('ductia'));
    beforeEach(inject(function($controller, $rootScope) {
      controllerConstructor = $controller;
      mockScope = $rootScope.$new();
      var bookCtrlInjectedDependencies = {
        '$scope': mockScope,
        'bookFactory': mockBookFactory,
        '$routeParams': mockRouteParams
      };
      bookCtrlModule = controllerConstructor('bookCtrl', bookCtrlInjectedDependencies);
    }));

    afterEach(function() {
      sandbox.verifyAndRestore();
    });

    it('should call the Book Factory "Get" command', function() {
      var bookFactoryGetStub = mockBookFactory.get;
      var getStubCallCount = bookFactoryGetStub.callCount;
      getStubCallCount.should.equal(1);
    });

    it('should pass the ISBN as a parameter', function() {
      var expectedQuery = {
        isbn: 'a valid isbn'
      }
      var firstCallToBookFactoryGet = mockBookFactory.get.firstCall;
      var getCallQueryParameter = firstCallToBookFactoryGet.args[0];
      getCallQueryParameter.should.eql(expectedQuery);
    });

    it('should set the "Book" property of the Scope to the return value of the query', function() {
      var scopeBookProperty = mockScope.Book;
      scopeBookProperty.should.eql({'validBook': true});
    });

  });

  describe('given no ISBN parameter', function() {
    beforeEach(module('ductia'));
    beforeEach(inject(function($controller, $rootScope) {
      controllerConstructor = $controller;
      mockScope = $rootScope.$new();
      var bookCtrlInjectedDependencies = {
        '$scope': mockScope,
        'bookFactory': mockBookFactory,
        '$routeParams': {}
      };
      bookCtrlModule = controllerConstructor('bookCtrl', bookCtrlInjectedDependencies);
    }));

    afterEach(function() {
      sandbox.verifyAndRestore();
    });

    it('should call the Book Factory "Query" command', function() {
      var bookFactoryQueryStub = mockBookFactory.query;
      var getStubCallCount = bookFactoryQueryStub.callCount;
      getStubCallCount.should.equal(1);
    });

    it('should set the "Books" property of the Scope to the return value of the query', function() {
      var scopeBookProperty = mockScope.Books;
      scopeBookProperty.should.eql([{'validBook': true}]);
    });

  });

});
