'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var fs = require('fs');

var localization = {
  localeIds: getLocaleIds(),
  htmlExcludingLocales: getHtmlExcludingLocales()
};

module.exports = localization;

function getLocaleIds(){
  var locales = JSON.parse(String(fs.readFileSync('./locales/_locales.json')));
  var localeIds = [];
  for (var localeId in locales){
    if(localeId !== 'en') {
      localeIds.push(locales[localeId].shortCode);
    }
  }
  return localeIds;
}

function getHtmlExcludingLocales() {
  return [
    './build/**/*.html',
    '!./build/@(' + getLocaleIds().join('|') + ')**/*.html'
    ];
}

gulp.task('build-localizations', function () {
  return gulp.src(localization.htmlExcludingLocales)
    .pipe($.l10n.localize({
      locales: './locales/*([^_]).json',
      nativeLocale: './locales/en.json'
    }))
    .pipe(gulp.dest('build'))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'build-localizations'}));
});

gulp.task('localize', function () {
  return gulp.src(localization.htmlExcludingLocales)
    .pipe($.debug())
    .pipe($.l10n.extractLocale())
    .pipe(gulp.dest('./locales'));
});

gulp.task('simulate-translations', function () {
  return gulp.src('./locales/en.json')
    .pipe($.l10n.simulateTranslation({
      locales: localization.localeIds
    }))
    .pipe(gulp.dest('./locales'));
});
