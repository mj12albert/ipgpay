var gulp = require('gulp');
var argv = require('yargs').argv;
var gutil = require('gulp-util');
var assetPipe = require('../util/assetPipe');
var logger = require('../util/logger');

// gulp.task('assets', ['clean'], function() {
//   if (argv.production) {

//     return gulp.src(['source/assets/**', '!source/assets/svg', '!source/assets/**/*.svg'])
//       .pipe(gulp.dest('deploy/assets'))
//       .pipe(assetPipe());
//   }
// })

argv.production
  ? gulp.task('assets', ['clean', 'jekyll', 'sass', 'scripts'], function(){ buildAssetsDir() })
  : gulp.task('assets', function() {
      return
    })

var buildAssetsDir = function() {
  return gulp.src(['source/assets/**', '!source/assets/svg', '!source/assets/**/*.svg'])
    .pipe(gulp.dest('deploy/assets'))
    .pipe(assetPipe());
}