var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('watch', function() {
  // gulp.watch('source/**/*.html', ['jekyll']);
  gulp.watch('source/sass/**/*.{scss, sass}', ['sass'])
    .on('change', function(e) {
      gutil.log(gutil.colors.yellow("modified", e.path.replace(process.cwd(), '')));
    });
})