var chai = require('chai');
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

Object.defineProperty(protractor.promise.Promise.prototype, 'should', {
  get: Object.prototype.__lookupGetter__('should'),
  set: Object.prototype.__lookupSetter__('should')
});

describe('the book index page', function() {

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

describe('the book detail page', function() {

  var bookTitleElement, bookTitleText;
  var bookIsbn13Element, bookIsbn13Text;
  var bookPublisherElement, bookPublisherText;
  var bookPublicationDateElement, bookPublicationDateText;

  beforeEach(function() {
    browser.get('http://localhost:8080/books/9790220906466');

    bookTitleElement = element(by.binding('Book.title'));
    bookIsbn13Element = element(by.binding('Book.isbn13'));
    bookPublisherElement = element(by.binding('Book.publisher'));
    bookPublicationDateElement = element(by.binding('Book.publicationDate'));
    bookTitleElement.getText().then(function(text) {
      bookTitleText = text;
    });
    bookIsbn13Element.getText().then(function(text) {
      bookIsbn13Text = text;
    });
    bookPublisherElement.getText().then(function(text) {
      bookPublisherText = text;
    });
    bookPublicationDateElement.getText().then(function(text) {
      bookPublicationDateText = text;
    });

  });

  it('should display the title of the selected book', function() {
    bookTitleText.should.equal('Harlequin, Book 1');
  });

  it('should display the isbn of the selected book', function() {
    bookIsbn13Text.should.equal('9790220906466');
  });

  it('should display the publisher of the selected book', function() {
    bookPublisherText.should.equal('Cramer Music');
  });

  it('should display the publication date of the selected book', function() {
    bookPublicationDateText.should.equal('2004');
  });

});
