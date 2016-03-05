var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

Object.defineProperty(protractor.promise.Promise.prototype, 'should', {
  get: Object.prototype.__lookupGetter__('should'),
  set: Object.prototype.__lookupSetter__('should')
});

describe('the page section', function() {

  beforeEach(function() {
    browser.get('http://localhost:8080/page');
  });

  

});
