var sandbox = sinon.sandbox.create();
var should = chai.should();

describe('the exam controller', function() {

  var mockRouteParams, mockExamFactory, controllerConstructor, mockScope, examCtrlModule;

  describe('given a set of valid url parameters', function() {

    before(function() {
      mockRouteParams = {
        instrument: 'flute',
        grade: 1,
        board: 'abrsm'
      };
      mockExamFactory = {
        query: sandbox.stub()
      }
    });

    beforeEach(module('ductia'));
    beforeEach(inject(function($controller, $rootScope) {
      controllerConstructor = $controller;
      mockScope = $rootScope.$new();
      var examCtrlInjectedDependencies = {
        '$scope': mockScope,
        'examFactory': mockExamFactory,
        '$routeParams': mockRouteParams
      };
      examCtrlModule = controllerConstructor('examCtrl', examCtrlInjectedDependencies);
    }));

    afterEach(function() {
      sandbox.verifyAndRestore();
      mockExamFactory.query.reset();
    });

    it('should add the selected instrument to the scope', function() {
      mockScope.SelectedInstrument.should.equal('flute');
    });

    it('should add the selected grade to the scope', function() {
      mockScope.SelectedGrade.should.equal(1);
    });

    it('should add the selected exam board to the scope', function() {
      mockScope.SelectedBoard.should.equal('abrsm');
    });

    it('should query the examFactory', function() {
      mockExamFactory.query.callCount.should.equal(1);
    });

    it('should use the selected instrument as a query parameter', function() {
      var callToExamFactory = mockExamFactory.query.firstCall;
      var examFactoryQuery = callToExamFactory.args[0];
      examFactoryQuery.instrument.should.equal('flute');
    });

    it('should use the selected grade as a query parameter', function() {
      var callToExamFactory = mockExamFactory.query.firstCall;
      var examFactoryQuery = callToExamFactory.args[0];
      examFactoryQuery.grade.should.equal(1);
    });

    it('should use the selected exam board as a query parameter', function() {
      var callToExamFactory = mockExamFactory.query.firstCall;
      var examFactoryQuery = callToExamFactory.args[0];
      examFactoryQuery.board.should.equal('abrsm');
    });


  });

  describe('given a set of valid url parameters with no grade specified', function() {
    before(function() {
      mockRouteParams = {
        instrument: 'flute',
        board: 'abrsm'
      };
      mockExamFactory = {
        query: sandbox.stub()
      }
    });

    beforeEach(module('ductia'));
    beforeEach(inject(function($controller, $rootScope) {
      controllerConstructor = $controller;
      mockScope = $rootScope.$new();
      var examCtrlInjectedDependencies = {
        '$scope': mockScope,
        'examFactory': mockExamFactory,
        '$routeParams': mockRouteParams
      };
      examCtrlModule = controllerConstructor('examCtrl', examCtrlInjectedDependencies);
    }));

    it('should not set a value for grade on the scope', function() {
      should.equal(mockScope.SelectedGrade, undefined);
    });

    it('should not set a value for grade', function() {
      var callToExamFactory = mockExamFactory.query.firstCall;
      var examFactoryQuery = callToExamFactory.args[0];
      examFactoryQuery.should.not.include.keys('grade');
    });

  });

  describe('given a set of valid url parameters with no grade or instrument specified', function() {
    before(function() {
      mockRouteParams = {
        board: 'abrsm'
      };
      mockExamFactory = {
        query: sandbox.stub()
      }
    });

    beforeEach(module('ductia'));
    beforeEach(inject(function($controller, $rootScope) {
      controllerConstructor = $controller;
      mockScope = $rootScope.$new();
      var examCtrlInjectedDependencies = {
        '$scope': mockScope,
        'examFactory': mockExamFactory,
        '$routeParams': mockRouteParams
      };
      examCtrlModule = controllerConstructor('examCtrl', examCtrlInjectedDependencies);
    }));

    it('should not set a value for instrument on the scope', function() {
      should.equal(mockScope.SelectedInstrument, undefined);
    });

    it('should not set a value for instrument', function() {
      var callToExamFactory = mockExamFactory.query.firstCall;
      var examFactoryQuery = callToExamFactory.args[0];
      examFactoryQuery.should.not.include.keys('instrument');
    });

  });

  describe('given a no URL parameters', function() {
    before(function() {
      mockRouteParams = {
      };
      mockExamFactory = {
        query: sandbox.stub()
      }
    });

    beforeEach(module('ductia'));
    beforeEach(inject(function($controller, $rootScope) {
      controllerConstructor = $controller;
      mockScope = $rootScope.$new();
      var examCtrlInjectedDependencies = {
        '$scope': mockScope,
        'examFactory': mockExamFactory,
        '$routeParams': mockRouteParams
      };
      examCtrlModule = controllerConstructor('examCtrl', examCtrlInjectedDependencies);
    }));

    it('should not set a value for exam board on the scope', function() {
      should.equal(mockScope.SelectedBoard, undefined);
    });

    it('should not set a value for exam board', function() {
      var callToExamFactory = mockExamFactory.query.firstCall;
      var examFactoryQuery = callToExamFactory.args[0];
      examFactoryQuery.should.not.include.keys('board');
    });

  });
});
