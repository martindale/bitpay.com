'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

/**
 * Push build to gh-pages
 */
gulp.task('deploy', ['replace'], function() {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages());
});

gulp.task('replace', ['default'], function() {
  return gulp.src('./dist/**/*.{html,css,js}')
    .pipe($.replace('src="/', 'src="/bitpay-website/'))
    .pipe($.replace('href="/', 'href="/bitpay-website/'))
    .pipe($.replace('url(\'/', 'url(\'/bitpay-website/'))
    .pipe(gulp.dest('dist'));
});
