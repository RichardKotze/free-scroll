'use strict';

var gulp = require('gulp'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
concat = require('gulp-concat'),
del = require('del'),
jshint = require('gulp-jshint'),
stylish = require('jshint-stylish'),
karma = require('karma').server;

var DEST = 'build/',
SRC = 'src/';

gulp.task('clean', function(cb) {
  del(['build'], cb);
});

gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/tests/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('lint', function() {
  return gulp.src(SRC+'*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('build', ['test', 'clean'], function() {
  return gulp.src([
      SRC+'free-scroll.js',
      SRC+'xhr.js'
    ])
    // This will output the non-minified version
    .pipe(concat('free-scroll.js'))
    .pipe(gulp.dest(DEST))
    // This will minify and rename to foo.min.js
    .pipe(uglify())
    .pipe(concat('free-scroll.min.js'))
    .pipe(gulp.dest(DEST));
});