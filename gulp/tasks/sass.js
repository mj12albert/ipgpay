var gulp = require('gulp');
var gutil = require('gulp-util');
var argv = require('yargs').argv;
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var logger = require('../util/logger');

!argv.production
  ? gulp.task('sass', function(){ sassWatch() })
  : gulp.task('sass', ['clean'], function(){ sassBuild() })

var sassWatch = function() {
  gulp.src('source/sass/**/*.{scss,sass}')
    .pipe(sass({
      bundleExec: true,
      trace: true
    }))
    .on('error', function(err) {
      errorHandler(err);
      this.emit('end');
    })
    // .on('error', errorHandler)
    .pipe(gulp.dest('./build/css'));

  gulp.watch('source/sass/**/*.{scss,sass}', ['sass'])
    .on('change', function(e) {
      logger.sassModified(e);
    })
    .on('error', function(e) {
      logger.sassError(e);
      this.emit('end');
    });
};

var sassBuild = function() {
  return gulp.src('sass/**/*.{scss,sass}')
    .pipe(sass({
      bundleExec: true,
      trace: false,
      sourcemap: false
    }))
    .on('error', function(err) {
      logger.sassError(err);
    })
    // .pipe(rename("manifest.css"))
    .pipe(minifycss({ keepSpecialComments: 0 }))
    .pipe(gulp.dest('./deploy/css'));
};

function errorHandler(err) {
  var file = err.message.slice(6).slice(0, err.message.slice(6).indexOf('('));
  var message = err.message.slice(err.message.indexOf('('), err.message.length);

  gutil.log(gutil.colors.red("error"), gutil.colors.red(file), message);
  this.emit('end');
};