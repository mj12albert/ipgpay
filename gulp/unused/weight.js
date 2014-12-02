var gulp = require('gulp');
var argv = require('yargs').argv;
var tallyWeight = require('../util/tallyWeight');

gulp.task('weight', function() {
// gulp.task('weight', ['clean', 'jekyll', 'sass', 'scripts', 'assets'], function() {
  if (argv.production) {
    return gulp.src('deploy/**/*.{html,css,js}')
      .pipe(tallyWeight());
  }
})