var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

/**
 * Push build to gh-pages
 */
gulp.task('deploy', ['default'], function () {
  return gulp.src('./dist/**/*')
    .pipe($.deploy())
});
