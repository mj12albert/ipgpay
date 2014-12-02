var gulp = require('gulp');

gulp.task('html', function() {
  gulp.src(['source/index.html'])
    // .pipe(processhtml('index.html'))
    // .pipe(replace('manifest.css', 'albertyu.css'))
    // .pipe(replace('main.js', 'albertyu.js'))
    // .pipe(replace('dtg6nmd', 'mmu7zkr'))
    // .pipe(replace('761324', '682504'))
    // .pipe(cleanhtml())
    .pipe(gulp.dest('build'));
})