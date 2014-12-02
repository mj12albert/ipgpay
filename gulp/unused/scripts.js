var gulp = require('gulp');
var argv = require('yargs').argv;
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var streamify = require('gulp-streamify');
var exorcist = require('exorcist');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
// var size = require('gulp-filesize');
// var bundleLogger = require('../util/bundleLogger');
var logger = require('../util/logger');

/*gulp.task('scripts', function() {
  !argv.production
    ? jsWatchify()
    : jsDeploy()
})*/

!argv.production
  ? gulp.task('scripts', function(){ jsWatchify() })
  : gulp.task('scripts', ['clean'], function(){ jsDeploy() })

var jsDeploy = function() {
  return browserify('./source/js/app.js')
    .bundle()
    .pipe(source('albertyu.js'))
    .pipe(streamify(stripDebug()))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('./deploy/js'));
}

var jsWatchify = function() {
  function browserifyShare(){
    var b = browserify({
      cache: {},
      packageCache: {},
      fullPaths: true,
      debug: true
    });

    b = watchify(b);

    b.on('update', function(e){
      logger.watchifyUpdate(e);
      bundleShare(b);
    });

    b.add('./source/js/app.js');
    bundleShare(b);
  }

  function bundleShare(b) {
    logger.start();
    b.bundle()
      .on('error', function(err){
        logger.browserifyError(err);
        this.emit('end');
      })
      .pipe(source('browserified.js'))
      .pipe(transform(function() {
        return exorcist('./source/js/browserified.map');
      }))
      .pipe(gulp.dest('./source/js/'))
      .on('end', logger.finish);
  }

  browserifyShare();
}