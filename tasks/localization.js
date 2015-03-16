var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');

var locales = JSON.parse(String(fs.readFileSync('./locales/_locales.json')));
var localeIds = [];
for (localeId in locales){
  if(localeId !== 'en') {
    localeIds.push(locales[localeId].shortCode);
  }
}
var htmlExcludingLocales = [
  './build/**/*.html',
  '!./build/@(' + localeIds.join('|') + ')**/*.html'
  ];

gulp.task('build-localizations', function () {
  return gulp.src(htmlExcludingLocales)
    .pipe($.l10n.localize({
      locales: './locales/*([^_]).json',
      nativeLocale: './locales/en.json'
    }))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'build-localizations'}));
});

gulp.task('localize', function () {
  return gulp.src(htmlExcludingLocales)
    .pipe($.debug())
    .pipe($.l10n.extractLocale())
    .pipe(gulp.dest('./locales'));
});

gulp.task('simulate-translations', function () {
  return gulp.src('./locales/en.json')
    .pipe($.l10n.simulateTranslation({
      locales: localeIds
    }))
    .pipe(gulp.dest('./locales'));
});
