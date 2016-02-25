// Karma configuration
// Generated on Mon Feb 15 2016 15:57:21 GMT+0000 (GMT Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],


    // list of files / patterns to load in the browser
    files: [{
      pattern: 'public/bower_components/angular/angular.js',
      included: true,
      watched: false
    }, {
      pattern: 'public/bower_components/angular-route/angular-route.js',
      included: true,
      watched: false
    },, {
      pattern: 'public/bower_components/angular-resource/angular-resource.js',
      included: true,
      watched: false
    }, {
      pattern: 'public/bower_components/angular-mocks/angular-mocks.js',
      included: true,
      watched: false
    }, {
      pattern: 'public/app/**/*.js',
      included: true,
      watched: true
    }, {
      pattern: 'test/AngularTests/**/*test.js',
      included: true,
      watched: true
    }],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    //browsers: ['Chrome', 'Firefox', 'PhantomJS', 'IE'],
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
