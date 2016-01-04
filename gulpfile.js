'use strict';

var gulp = require('gulp');
var tap = require('gulp-tap');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var istanbul = require('gulp-istanbul');

gulp.task('mocha', function() {
  return gulp.src(['test/**/*.js'], {
      read: false
    })
    .pipe(mocha({
      reporter: 'spec'
    }))
    .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
  gulp.run('mocha');
  gulp.watch(['./**/*.js', 'test/**/*.js'], ['mocha']);
});



gulp.task('test', function() {
  return gulp.src('server/**/*.js')
  .pipe(istanbul({
      includeUntested: true
    }))
    .on('finish', function() {
      gulp.src('test/**/*.js')
        .pipe(mocha({
          reporter: 'spec'
        }))
        .pipe(istanbul.writeReports({
          dir: './unit-test-coverage',
          reporters: ['html', 'text-summary', 'lcov'],
          // reportOpts: {
          //   dir: './unit-test-coverage'
          // }
        }));
    });
});




// gulp.task('test', function () {
//     return gulp.src(['server/**/*.js'])
//       .pipe(istanbul({includeUntested: true}))
//       .on('finish', function () {
//         gulp.src(['test/**/*.js'])
//           .pipe(mocha({reporter: 'spec'}))
//           .pipe(istanbul.writeReports({
//             dir: './unit-test-coverage',
//             reporters: [ 'lcov' ],
//             reportOpts: { dir: './unit-test-coverage'}
//           }));
//       });
//   });

gulp.task('default', ['watch-mocha']);
