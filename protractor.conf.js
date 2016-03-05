exports.config = {
  seleniumAdddress: 'localhost:4444/wd/hub',
  specs: ['test/integrationTests/*.js'],
  capabilities: {
    browserName: 'chrome'
  }
};
