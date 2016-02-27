describe('the instrument control', function() {

  var expectedInstrumentList = [
    'Baritone and Euphonium',
    'Bassoon',
    'Bass Trombone',
    'Cello',
    'Clarinet',
    'Double Bass',
    'Descant Recorder',
    'Flute',
    'Guitar',
    'Harp',
    'Harpsichord',
    'Horn',
    'Horn (E Flat)',
    'Keyboard',
    'Music Theory',
    'Oboe',
    'Organ',
    'Percussion',
    'Piano',
    'Saxophone',
    'Singing',
    'Treble Recorder',
    'Trombone',
    'Trumpet',
    'Tuba',
    'Viola',
    'Violin'
  ];

  var instrumentCtrlModule, controllerConstructor, mockScope;

  beforeEach(module('ductia'));
  beforeEach(inject(function($controller, $rootScope) {
    controllerConstructor = $controller;
    mockScope = $rootScope.$new();
    var instrumentCtrlInjectedDependencies = {
      '$scope': mockScope,
    };
    instrumentCtrlModule = controllerConstructor('instrumentCtrl', instrumentCtrlInjectedDependencies);
  }));

  afterEach(function() {
    sandbox.verifyAndRestore();
  });

  it('should insert the expected instrument list to the scope', function() {
    mockScope.Instruments.should.eql(expectedInstrumentList);
  });

});
