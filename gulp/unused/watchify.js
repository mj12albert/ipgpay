var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var streamify = require('gulp-streamify');
var exorcist = require('exorcist');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var bundleLogger = require('../util/bundleLogger');

gulp.task('watchify', function() {
  function browserifyShare(){
    var b = browserify({
      cache: {},
      packageCache: {},
      fullPaths: true,
      debug: true
    });

    b = watchify(b);

    b.on('update', function(e){
      bundleLogger.update(e);
      bundleShare(b);
    });

    b.add('./source/js/app.js');
    bundleShare(b);
  }

  function bundleShare(b) {
    bundleLogger.start();
    b.bundle()
      .pipe(source('browserified.js'))
      .pipe(transform(function() {
        return exorcist('./source/js/browserified.map');
      }))
      // .pipe(streamify(stripDebug()))
      // .pipe(streamify(uglify()))
      .pipe(gulp.dest('./source/js/'))
      .on('end', bundleLogger.finish);
  }

  browserifyShare();
})