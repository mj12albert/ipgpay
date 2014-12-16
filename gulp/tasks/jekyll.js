var gulp = require('gulp');
var exec = require('child_process').exec;
var gutil = require('gulp-util');
var argv = require('yargs').argv;
var processhtml = require('gulp-processhtml');
var cleanhtml = require('gulp-cleanhtml');
var replace = require('gulp-replace');
var logger = require('../util/logger');

gulp.task('jekyll', ['clean'], function() {
  !argv.production
    ? jekyllWatch()
    : jekyllBuild()
})

var jekyllWatch = function() {
  exec('bundle exec jekyll build --watch')

  gulp.watch('source/**/*.html')
    .on('change', function(e) {
      logger.jekyllUpdate(e);
    });
}

var jekyllBuild = function() {
  exec('bundle exec jekyll build', function(err, stdout, stderr) {
    // console.log(stdout);
    return gulp.src(['build/**/index.html'])
      // .pipe(processhtml('index.html'))
      // .pipe(replace('manifest.css', 'styles.css'))
      // .pipe(replace('browserified.js', 'main.js'))
      .pipe(cleanhtml())
      .pipe(gulp.dest('deploy'));
  })
}