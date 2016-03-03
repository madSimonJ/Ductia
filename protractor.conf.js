exports.config = {
  seleniumAdddress: 'localhost:4444/wd/hub',
  specs: ['test/integration/Tests/*.js'],
  capabilities: {
    browserName: 'chrome'
  }
};
