var sandbox = sinon.sandbox.create();
var should = chai.should();

describe('User', function () {
    var mockUserResource, $httpBackend;
    beforeEach(angular.mock.module('ductia'));

    beforeEach(function () {
      angular.mock.inject(function($injector) {
        console.log('hello1');
        console.log($injector.get('bookFactory'));
        $httpBackend = $injector.get('$httpBackend');
        mockUserResource = $injector.get('bookFactory');

      });

        // angular.mock.inject(function ($injector) {
        //     $httpBackend = $injector.get('$httpBackend');
        //     mockUserResource = $injector.get('bookFactory');
        // })
    });

    it('should be true', function() {
      var variable = true;
      variable.should.equal(true);
    });

    // describe('getUser', function () {
    //     it('should call getUser with username', inject(function (User) {
    //         $httpBackend.expectGET('/api/index.php/users/test')
    //             .respond([{
    //             username: 'test'
    //         }]);
    //
    //         var result = mockUserResource.getUser('test');
    //
    //         $httpBackend.flush();
    //
    //         expect(result[0].username).toEqual('test');
    //     }));
    //
    // });
});
