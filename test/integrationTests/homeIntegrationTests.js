var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

// Object.defineProperty(protractor.promise.Promise.prototype, 'should', {
//   get: Object.prototype.__lookupGetter__('should'),
//   set: Object.prototype.__lookupSetter__('should')
// });

describe('the home section', function() {

  var headerElement, headerText;
  var welcomeTextElement, welcomeText;

  beforeEach(function() {
    browser.get('http://localhost:8080/');
    headerElement = element(by.binding('header'));
    headerElement.getText().then(function(data) {
      headerText = data;
    });
    welcomeTextElement = element(by.binding('welcomeText'));
    welcomeTextElement.getText().then(function(data) {
      welcomeText = data;
    });
  });

  it('should set the correct header', function() {
    headerText.should.equal('Ductia');
  });

  it('should set the correct welcome message', function() {
    welcomeText.should.equal('A website for searching for exam pieces and the ideal books to get them with')
  });

});
