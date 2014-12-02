var gulp = require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var ngAnnotate = require('gulp-ng-annotate')
var rename = require('gulp-rename');

gulp.task('angular', function () {
  gulp.src(['source/js/app/**/*.module.js', 'source/js/app/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('AppEx.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    // .pipe(rename('AppEx.js'))
    .pipe(gulp.dest('source/js'))
})

gulp.task('watch', ['angular'], function () {
  gulp.watch('source/js/app/**/*.js', ['angular'])
})