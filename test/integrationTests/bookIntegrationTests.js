var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

Object.defineProperty(protractor.promise.Promise.prototype, 'should', {
  get: Object.prototype.__lookupGetter__('should'),
  set: Object.prototype.__lookupSetter__('should')
});

describe('the book section', function() {

  var bookListRepeater;
  var bookListCount;
  var bookElements;
  var bookListFirstElement;
  var bookListFirstTitle, bookListFirstIsbn13, bookListFirstPublisher, bookListFirstPublicationDate;

  beforeEach(function() {
    browser.get('http://localhost:8080/books');

    bookListRepeater = element.all(by.repeater('book in Books'));
    bookListRepeater.then(function(data) {
      bookElements = data;
      bookListFirstElement = bookElements[0];
      bookListCount = data.length;

      bookElements[0].element(by.binding('title')).getText().then(function(text) {
        bookListFirstTitle = text;
      });

      bookElements[0].element(by.binding('isbn13')).getText().then(function(text) {
        bookListFirstIsbn13 = text;
      });

      bookElements[0].element(by.binding('publisher')).getText().then(function(text) {
        bookListFirstPublisher = text;
      });

      bookElements[0].element(by.binding('publicationDate')).getText().then(function(text) {
        bookListFirstPublicationDate = text;
      });
    });
  });

  it('should display details of all books', function() {
    bookListCount.should.equal(28);
  });

  it('should display the book title', function() {
    bookListFirstTitle.should.equal('Flute Exam Pieces, Grade 1 (2014-2017)');
  });

  it('should display the book\'s isbn', function() {
      bookListFirstIsbn13.should.equal('9781848494923');
    });

    it('should display the book\'s publisher', function() {
        bookListFirstPublisher.should.equal('Associated Board of the Royal Schools of Music, United Kingdom');
      });

  it('should display the book\'s publication date', function() {
      bookListFirstPublicationDate.should.equal('2013');
    });
});

describe('the book detail section', function() {
  
});
