'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();
var q = require('q');

var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var validBookRecord = {
  _id: '9781848494923',
  title: 'Flute Exam Pieces, Grade 1 (2014-2017)',
  isbn10: '1848494920',
  isbn13: '9781848494923',
  publisher: 'Associated Board of the Royal Schools of Music, United Kingdom',
  publicationDate: 2013,
  piecesInBook: [{
    number: 1,
    piece_id: 'piece1'
  }, {
    number: 2,
    piece_id: 'piece2'
  }, {
    number: 3,
    piece_id: 'piece3'
  }, {
    number: 4,
    piece_id: 'piece4'
  }, {
    number: 5,
    piece_id: 'piece5'
  }, {
    number: 6,
    piece_id: 'piece6'
  }, {
    number: 7,
    piece_id: 'piece7'
  }, {
    number: 8,
    piece_id: 'piece8'
  }, {
    number: 9,
    piece_id: 'piece9'
  }]
};

var expectedMergedBookDataToBeReturned = {
  "_id": "9781848494923",
  "isbn10": "1848494920",
  "isbn13": "9781848494923",
  "piecesInBook": [{
    "composer": "Hook",
    "number": 1,
    "piece_id": "piece1",
    "title": "Minuetto: 2nd movt from Sonata in Eb, Op. 99 No. 3, arr. Wastall"
  }, {
    "composer": "Purcell",
    "number": 2,
    "piece_id": "piece2",
    "title": "Rigaudon, Z. 653, arr. Stuart"
  }, {
    "composer": "Trad. Irish",
    "number": 3,
    "piece_id": "piece3",
    "title": "The Rakes o’ Mallow, arr. Denley"
  }, {
    "composer": "Keith Amos",
    "number": 4,
    "piece_id": "piece4",
    "title": "Lupin, the Pot-Bellied Pig: No. 9"
  }, {
    "composer": "Ros Stephen",
    "number": 5,
    "piece_id": "piece5",
    "title": "Guanabara Bay"
  }, {
    "composer": "Rogers & Hammerstein",
    "number": 6,
    "piece_id": "piece6",
    "title": "Edelweiss"
  }, {
    "composer": "Nikki Iles",
    "number": 7,
    "piece_id": "piece7",
    "title": "Jazz Waltz"
  }, {
    "composer": "E. Köhler",
    "number": 8,
    "piece_id": "piece8",
    "title": "Exercise in G"
  }, {
    "composer": "Oliver Ledbury",
    "number": 9,
    "piece_id": "piece9",
    "title": "Itchy Feet (arpeggio in final bar optional)"
  }],
  "publicationDate": 2013,
  "publisher": "Associated Board of the Royal Schools of Music, United Kingdom",
  "title": "Flute Exam Pieces, Grade 1 (2014-2017)"
};

var getBooksStub = sandbox.stub();
getBooksStub.withArgs(sinon.match.has('isbn', '9781848494923')).returns(q.resolve(validBookRecord));
getBooksStub.withArgs(sinon.match.has('isbn', 'invalid')).returns(q.reject(new Error("A nasty error occured.")));


var stubbedBookRepositoryModule = {
  getBooks: getBooksStub
};

var pieceData = [{
  _id: 'piece1',
  composer: 'Hook',
  title: 'Minuetto: 2nd movt from Sonata in Eb, Op. 99 No. 3, arr. Wastall',
}, {
  _id: 'piece2',
  composer: 'Purcell',
  title: 'Rigaudon, Z. 653, arr. Stuart'
}, {
  _id: 'piece3',
  composer: 'Trad. Irish',
  title: 'The Rakes o’ Mallow, arr. Denley'
}, {
  _id: 'piece4',
  composer: 'Keith Amos',
  title: 'Lupin, the Pot-Bellied Pig: No. 9'
}, {
  _id: 'piece5',
  composer: 'Ros Stephen',
  title: 'Guanabara Bay'
}, {
  _id: 'piece6',
  composer: 'Rogers & Hammerstein',
  title: 'Edelweiss'
}, {
  _id: 'piece7',
  composer: 'Nikki Iles',
  title: 'Jazz Waltz'
}, {
  _id: 'piece8',
  composer: 'E. Köhler',
  title: 'Exercise in G'
}, {
  _id: 'piece9',
  composer: 'Oliver Ledbury',
  title: 'Itchy Feet (arpeggio in final bar optional)'
}];

var expectedPieceQueryList = [
  'piece1',
  'piece2',
  'piece3',
  'piece4',
  'piece5',
  'piece6',
  'piece7',
  'piece8',
  'piece9',
]

var getPieceListStub = sandbox.stub();
getPieceListStub.withArgs(sinon.match.array).returns(q.resolve(pieceData));
getPieceListStub.withArgs(sinon.match("invalid")).returns(q.reject(new Error("A nasty error occured.")));

var stubbedPieceRepositoryModule = {
  getPieceList: getPieceListStub,
  getPieces: sandbox.stub()
}

var mockRes = {
  name: "res"
};

var stubbedRouteResponsesModule = {
  SendDocumentIfFound: sandbox.stub()
}

var bookControllerModule;

describe('the bookController Module', function() {

  before(function() {
    mockery.enable();
    mockery.registerMock('../repositories/bookRepository', stubbedBookRepositoryModule);
    mockery.registerMock('../repositories/pieceRepository', stubbedPieceRepositoryModule);
    mockery.registerMock('../routes/routeResponses', stubbedRouteResponsesModule);
    mockery.registerAllowable('../../../server/controllers/bookController', true);
    mockery.registerAllowable('q', true);
    mockery.registerAllowable('lodash', true);
    bookControllerModule = require('../../../server/controllers/bookController');
  });

  after(function() {
    mockery.deregisterAll();
    mockery.disable();
  });

  afterEach(function() {
    sandbox.verifyAndRestore();
  });

  describe("handleBookGetRequest function", function() {

    describe('given a valid set of parameters that will not raise any errors', function() {

      var mockReqThatWillNotCauseErrors = {
        name: 'req',
        params: {
          isbn: '9781848494923'
        }
      };

      before(function() {
        bookControllerModule.handleBookGetRequest(mockReqThatWillNotCauseErrors, mockRes);
      });

      describe('when getting the details of a single book', function() {

        after(function() {
          stubbedRouteResponsesModule.SendDocumentIfFound.reset();
        });

        it("should forward the http Request object on to the RouteResponses module", function() {
          var callToRouteReponsesModule = stubbedRouteResponsesModule.SendDocumentIfFound.firstCall;
          var routeResponseReqParameter = callToRouteReponsesModule.args[0];
          routeResponseReqParameter.name.should.equal("req");
        });

        it('should forward the http response object to the RouteResponses module', function() {
          var callToRouteReponsesModule = stubbedRouteResponsesModule.SendDocumentIfFound.firstCall;
          var routeResponseResParameter = callToRouteReponsesModule.args[1];

          routeResponseResParameter.name.should.equal("res");
        });

        it('should forward a promise to the routeReponses module that is fulfilled', function() {
          var callToRouteReponsesModule = stubbedRouteResponsesModule.SendDocumentIfFound.firstCall;
          var routeResponseDeferredParameter = callToRouteReponsesModule.args[2];
          return routeResponseDeferredParameter.promise.should.be.fulfilled;
        });

        it('should forward a promise to the routeReponses module that resolves to a merged data object containing book & piece information', function() {
          var callToRouteReponsesModule = stubbedRouteResponsesModule.SendDocumentIfFound.firstCall;
          var routeResponseDeferredParameter = callToRouteReponsesModule.args[2];
          return routeResponseDeferredParameter.promise.should.eventually.eql(expectedMergedBookDataToBeReturned);
        });

        it('should call the bookRepository getBooks function', function() {
          stubbedBookRepositoryModule.getBooks.callCount.should.equal(1);
        });

        it('should call the pieceRepository getPieceList function', function() {
          stubbedPieceRepositoryModule.getPieceList.callCount.should.equal(1);
        });

        it('should pass the "isbn" req parameter to the bookRepository getBooks function', function() {
          var callTobookRepositoryModule = stubbedBookRepositoryModule.getBooks.firstCall;
          var getBooksQueryParamter = callTobookRepositoryModule.args[0];
          getBooksQueryParamter.isbn.should.equal('9781848494923');
        });

        it('should pass a list of pieces from the book to the pieceRepository getPieceList function', function() {
          var callToPieceRepositoryModule = stubbedPieceRepositoryModule.getPieceList.firstCall;
          var getPieceListQueryParameter = callToPieceRepositoryModule.args[0];
          getPieceListQueryParameter.should.eql(expectedPieceQueryList);
        });

      });

    });

    describe('given a request to the piece repository that will cause an error', function() {

      var mockReqThatWillCauseErrors = {
        name: 'req',
        params: {
          isbn: 'invalid'
        }
      };

      before(function() {
        bookControllerModule.handleBookGetRequest(mockReqThatWillCauseErrors, mockRes);
      });

      describe('when getting details of a single book', function() {

        after(function() {
          stubbedRouteResponsesModule.SendDocumentIfFound.reset();
        });

        it('should return a rejected promise', function() {
          var callToRouteReponsesModule = stubbedRouteResponsesModule.SendDocumentIfFound.firstCall;
          var routeResponseDeferredParameter = callToRouteReponsesModule.args[2];
          console.log('promise = ' + routeResponseDeferredParameter);
          return routeResponseDeferredParameter.promise.should.be.rejected;
        });

      });

    });

  });

})
