describe('the Main control', function() {

  var mainCtrlModule, controllerConstructor, mockScope;
  var expectedHeaderText = 'Ductia';
  var expectedWelcomeText = 'A website for searching for exam pieces and the ideal books to get them with';

  beforeEach(module('ductia'));
  beforeEach(inject(function($controller, $rootScope) {
    controllerConstructor = $controller;
    mockScope = $rootScope.$new();
    var instrumentCtrlInjectedDependencies = {
      '$scope': mockScope,
    };
    mainCtrlModule = controllerConstructor('mainCtrl', instrumentCtrlInjectedDependencies);
  }));

  afterEach(function() {
    sandbox.verifyAndRestore();
  });

  it('should show the expected header text', function() {
    mockScope.header.should.equal(expectedHeaderText);
  });

  it('should show the expected welcome text', function() {
    mockScope.welcomeText.should.equal(expectedWelcomeText);
  });

});
