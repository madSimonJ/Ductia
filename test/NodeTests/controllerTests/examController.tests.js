'use strict';

var chai = require('chai');
var mockery = require('mockery');
var sinon = require('sinon');
var sandbox = sinon.sandbox.create();
var q = require('q');

var should = chai.should();

var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var validExamData = {
  _id: 'exam-flute-2014-grade1',
  instrument: 'flute',
  grade: 1,
  dateValidFrom: 2014,
  dateValidTo: 2017,
  examBoard: 'abrsm',
  lists: {
    A: ['piece1', 'piece2', 'piece3', 'piece10', 'piece11', 'piece12', 'piece13', 'piece14', 'piece15'],
    B: ['piece16', 'piece17', 'piece18', 'piece19', 'piece20', 'piece21'],
    C: ['piece4', 'piece5', 'piece6', 'piece22', 'piece23', 'piece24', 'piece25', 'piece26', 'piece27', 'piece28', 'piece29', 'piece30']
  }
};

var getExamsStub = sandbox.stub();
getExamsStub.withArgs(sinon.match(function(value) {
  return value.board === 'abrsm' && value.instrument === 'flute' && value.grade === 1;
})).returns(q.resolve(validExamData));

var stubbedExamRepositoryModule = {
  getExams: getExamsStub
};


var expectedQuery = ['piece1',
  'piece2',
  'piece3',
  'piece10',
  'piece11',
  'piece12',
  'piece13',
  'piece14',
  'piece15',
  'piece16',
  'piece17',
  'piece18',
  'piece19',
  'piece20',
  'piece21',
  'piece4',
  'piece5',
  'piece6',
  'piece22',
  'piece23',
  'piece24',
  'piece25',
  'piece26',
  'piece27',
  'piece28',
  'piece29',
  'piece30'
];

var mockReq = {
  name: "req",
  params: {
    board: 'abrsm',
    instrument: 'flute',
    grade: 1
  }
};

var mockRes = {
  name: "res"
};

var stubbedRouteResponsesModule = {
  SendDocumentIfFound: sandbox.stub()
}

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
}, {
  _id: 'piece10',
  composer: 'A. M. Bononcini',
  title: 'Bella Vittoria'
}, {
  _id: 'piece11',
  composer: 'Daquin ',
  title: 'Noël'
}, {
  _id: 'piece12',
  composer: 'Schubert',
  title: 'Waltz No. 16'
}, {
  _id: 'piece13',
  composer: 'Sholom Secunda',
  title: 'Donna Donna (observing repeat)'
}, {
  _id: 'piece14',
  composer: 'Trad. English',
  title: 'Blow the Wind Southerly'
}, {
  _id: 'piece15',
  composer: 'Trad. Welsh',
  title: 'The Ash Grove'
}, {
  _id: 'piece16',
  composer: 'Heather Hammond',
  title: 'Funk Factory'
}, {
  _id: 'piece17',
  composer: 'Alan Haughton',
  title: 'Partying'
}, {
  _id: 'piece18',
  composer: 'Cecilia McDowall',
  title: 'Moulin Rose'
}, {
  _id: 'piece19',
  composer: 'Aldo Rossi',
  title: 'Un dolce sogno (A Sweet Dream)'
}, {
  _id: 'piece20',
  composer: 'R. & R. Sherman  ',
  title: 'Truly Scrumptious (from Chitty Chitty Bang Bang)'
}, {
  _id: 'piece21',
  composer: 'Sullivan',
  title: 'Prithee, Pretty Maiden (from Patience)'
}, {
  _id: 'piece22',
  composer: 'Alan Bullard',
  title: 'Hungarian Flute'
}, {
  _id: 'piece23',
  composer: 'Alan Bullard',
  title: 'Marching Flute'
}, {
  _id: 'piece24',
  composer: 'Paul Harris',
  title: 'Study in C'
}, {
  _id: 'piece25',
  composer: 'Paul Harris',
  title: 'Study in G'
}, {
  _id: 'piece26',
  composer: 'Paul Harris',
  title: 'Study in F'
}, {
  _id: 'piece27',
  composer: 'Mike Mower',
  title: 'Straight to the Point'
}, {
  _id: 'piece28',
  composer: 'Mike Mower',
  title: ' Knock Knock'
}, {
  _id: 'piece29',
  composer: 'Philip Sparke',
  title: 'Modal Melody'
}, {
  _id: 'piece30',
  composer: 'Philip Sparke',
  title: 'Shalom!'
}];

var getPieceListStub = sandbox.stub();
getPieceListStub.withArgs(sinon.match.array).returns(q.resolve(pieceData));

var stubbedPieceRepositoryModule = {
  getPieceList: getPieceListStub,
  getPieces: sandbox.stub()
}

var expectedExamData = {
  "_id": "exam-flute-2014-grade1",
  "instrument": "flute",
  "grade": 1,
  "dateValidFrom": 2014,
  "dateValidTo": 2017,
  "examBoard": "abrsm",
  "lists": {
    "A": [{
      "pieceId": "piece1",
      "composer": "Hook",
      "title": "Minuetto: 2nd movt from Sonata in Eb, Op. 99 No. 3, arr. Wastall"
    }, {
      "pieceId": "piece2",
      "composer": "Purcell",
      "title": "Rigaudon, Z. 653, arr. Stuart"
    }, {
      "pieceId": "piece3",
      "composer": "Trad. Irish",
      "title": "The Rakes o’ Mallow, arr. Denley"
    }, {
      "pieceId": "piece10",
      "composer": "A. M. Bononcini",
      "title": "Bella Vittoria"
    }, {
      "pieceId": "piece11",
      "composer": "Daquin ",
      "title": "Noël"
    }, {
      "pieceId": "piece12",
      "composer": "Schubert",
      "title": "Waltz No. 16"
    }, {
      "pieceId": "piece13",
      "composer": "Sholom Secunda",
      "title": "Donna Donna (observing repeat)"
    }, {
      "pieceId": "piece14",
      "composer": "Trad. English",
      "title": "Blow the Wind Southerly"
    }, {
      "pieceId": "piece15",
      "composer": "Trad. Welsh",
      "title": "The Ash Grove"
    }],
    "B": [{
      "pieceId": "piece16",
      "composer": "Heather Hammond",
      "title": "Funk Factory"
    }, {
      "pieceId": "piece17",
      "composer": "Alan Haughton",
      "title": "Partying"
    }, {
      "pieceId": "piece18",
      "composer": "Cecilia McDowall",
      "title": "Moulin Rose"
    }, {
      "pieceId": "piece19",
      "composer": "Aldo Rossi",
      "title": "Un dolce sogno (A Sweet Dream)"
    }, {
      "pieceId": "piece20",
      "composer": "R. & R. Sherman  ",
      "title": "Truly Scrumptious (from Chitty Chitty Bang Bang)"
    }, {
      "pieceId": "piece21",
      "composer": "Sullivan",
      "title": "Prithee, Pretty Maiden (from Patience)"
    }],
    "C": [{
      "pieceId": "piece4",
      "composer": "Keith Amos",
      "title": "Lupin, the Pot-Bellied Pig: No. 9"
    }, {
      "pieceId": "piece5",
      "composer": "Ros Stephen",
      "title": "Guanabara Bay"
    }, {
      "pieceId": "piece6",
      "composer": "Rogers & Hammerstein",
      "title": "Edelweiss"
    }, {
      "pieceId": "piece22",
      "composer": "Alan Bullard",
      "title": "Hungarian Flute"
    }, {
      "pieceId": "piece23",
      "composer": "Alan Bullard",
      "title": "Marching Flute"
    }, {
      "pieceId": "piece24",
      "composer": "Paul Harris",
      "title": "Study in C"
    }, {
      "pieceId": "piece25",
      "composer": "Paul Harris",
      "title": "Study in G"
    }, {
      "pieceId": "piece26",
      "composer": "Paul Harris",
      "title": "Study in F"
    }, {
      "pieceId": "piece27",
      "composer": "Mike Mower",
      "title": "Straight to the Point"
    }, {
      "pieceId": "piece28",
      "composer": "Mike Mower",
      "title": " Knock Knock"
    }, {
      "pieceId": "piece29",
      "composer": "Philip Sparke",
      "title": "Modal Melody"
    }, {
      "pieceId": "piece30",
      "composer": "Philip Sparke",
      "title": "Shalom!"
    }]
  }
}



var examControllerModule;

describe('the examController Module', function() {

  before(function() {
    mockery.enable();
    mockery.registerMock('../repositories/examRepository', stubbedExamRepositoryModule);
    mockery.registerMock('../routes/routeResponses', stubbedRouteResponsesModule);
    mockery.registerMock('../repositories/pieceRepository', stubbedPieceRepositoryModule);
    mockery.registerAllowable('../../../server/controllers/examController', true);
    mockery.registerAllowable('q', true);
    mockery.registerAllowable('lodash', true);
    examControllerModule = require('../../../server/controllers/examController');
  });

  after(function() {
    mockery.disable();
    stubbedExamRepositoryModule.getExams.reset();
    stubbedPieceRepositoryModule.getPieces.reset();
    mockery.deregisterAll();
  });

  beforeEach(function() {

  });

  afterEach(function() {
    sandbox.verifyAndRestore();
    sandbox.reset();
  });

  describe("handleExamGetRequest function", function() {

    describe('given a valid set of parameters that will not raise any errors', function() {

      describe('when getting the details of a list of exams', function() {

      });

      describe('when getting the details of a single exam', function() {

        before(function() {
          examControllerModule.handleExamGetRequest(mockReq, mockRes);
        });

        after(function() {
          stubbedExamRepositoryModule.getExams.reset();
          stubbedPieceRepositoryModule.getPieces.reset();
        });

        afterEach(function() {
          sandbox.verifyAndRestore();
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

        it('should forward a promise to the RouteResponses module that resolves', function() {
          var callToRouteReponsesModule = stubbedRouteResponsesModule.SendDocumentIfFound.firstCall;
          var routeResponsePromiseParameter = callToRouteReponsesModule.args[2];
          return routeResponsePromiseParameter.should.be.fulfilled;
        });

        it('should forward a promise that resolves to the expected merged exam and book data', function() {
          var callToRouteReponsesModule = stubbedRouteResponsesModule.SendDocumentIfFound.firstCall;
          var routeResponsePromiseParameter = callToRouteReponsesModule.args[2];
          return routeResponsePromiseParameter.should.eventually.eql(expectedExamData);
        });

        it('should call the examRepository getExam function', function() {
          stubbedExamRepositoryModule.getExams.callCount.should.equal(1);
        });

        it('should pass the "board" req parameter to the examRepository getExam function', function() {
          var callToExamRepositoryModule = stubbedExamRepositoryModule.getExams.firstCall;
          var getExamQueryParamter = callToExamRepositoryModule.args[0];
          getExamQueryParamter.board.should.equal('abrsm');
        });

        it('should pass the "instrument" req parameter to the examRepository getExam function', function() {
          var callToExamRepositoryModule = stubbedExamRepositoryModule.getExams.firstCall;
          var getExamQueryParamter = callToExamRepositoryModule.args[0];
          getExamQueryParamter.instrument.should.equal('flute');
        });

        it('should pass the "grade" req parameter to the examRepository getExam function', function() {
          var callToExamRepositoryModule = stubbedExamRepositoryModule.getExams.firstCall;
          var getExamQueryParamter = callToExamRepositoryModule.args[0];
          getExamQueryParamter.grade.should.equal(1);
        });

        it('should call the Piece Repository getPieceList function', function() {
          var callToPieceRepositoryModule = stubbedPieceRepositoryModule.getPieceList;
          callToPieceRepositoryModule.callCount.should.equal(1);
        });

        it('should pass a list of pieces to the piece Repository as a parameter', function() {
          var callToPieceRepositoryModule = stubbedPieceRepositoryModule.getPieceList;
          var calltoPieceRepositoryQuery = callToPieceRepositoryModule.firstCall.args[0];
          calltoPieceRepositoryQuery.should.eql(expectedQuery);
        });
      });
    });
  });
})
