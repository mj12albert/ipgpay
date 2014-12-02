var gulp = require('gulp');
var argv = require('yargs').argv;
var del = require('del');
var dir; // Name of the directory to be scrubbed by rimraf()

gulp.task('clean', function() {
  !argv.production
    ? dir = 'build'
    : dir = 'deploy'

  del(['./'+dir+'/*'], function(err){
    console.log('Cleaned.');
  })
})