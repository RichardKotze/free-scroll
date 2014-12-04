'use strict';

var gulp = require('gulp'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
karma = require('karma').server;

var DEST = 'build/';

gulp.task('default', function() {
  return gulp.src('src/free-scroll.js')
    // This will output the non-minified version
    .pipe(gulp.dest(DEST))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/tests/karma.conf.js',
    singleRun: true
  }, done);
});