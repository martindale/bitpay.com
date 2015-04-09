'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var globby = require('globby');
var env = {};

gulp.task('default', function(cb) {
  runSequence('build', cb);
});

gulp.task('build', ['delete'], function(cb) {
  runSequence(
    ['sass', 'jade', 'images', 'copy'], ['styles', 'jademin'],
    'hash',
    'build-localizations',
    cb);
});

gulp.task('build:dev', ['delete'], function(cb) {
  env.development = true;
  if (env.uncss) {
    runSequence(
      ['sass', 'jade:dev', 'images', 'copy'], ['styles', 'build-localizations'],
      cb);
  } else {
    runSequence(
      ['sass', 'jade:dev', 'images', 'copy'], ['build-localizations'],
      cb);
  }
});

// Watch for changes & reload
gulp.task('serve', ['build:dev'], function() {
  browserSync({
    notify: false,
    logPrefix: 'serve',
    minify: false,
    snippetOptions: {
      rule: {
        fn: function (snippet, match){
          snippet = snippet.replace('async', 'async data-no-instant');
          return snippet + match;
        }
      }
    },
    server: {
      //serve from build, fall back to src
      baseDir: ['dist', 'components', 'src'],
      serveStaticOptions: {
        extensions: 'html'
      }
    }
  });

  gulp.watch(['src/_**/*.jade'], ['uncached-rebuild-jade', reload]);
  gulp.watch(['src/**/*.jade', '!src/_**/*.jade', 'src/**/*.html'], ['rebuild-jade', reload]);
  gulp.watch(['src/{_styles,styles}/**/*.{scss,css}'], ['rebuild-styles', reload]);
  gulp.watch(['*.js', 'tasks/*.js', 'src/**/*.js'], ['jshint']);
  gulp.watch(['src/images/**/*'], ['images'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function() {
  browserSync({
    notify: false,
    logPrefix: 'serve:dist',
    https: true,
    server: {
      baseDir: 'dist',
      serveStaticOptions: {
        extensions: 'html'
      }
    }
  });
});

gulp.task('serve:uncss', function(cb) {
  env.uncss = true;
  runSequence('serve', cb);
});


gulp.task('rebuild-jade', function(cb) {
  if (env.uncss) {
    runSequence(['sass', 'jade:dev'], ['styles', 'build-localizations'], cb);
  } else {
    runSequence(['jade:dev'], ['build-localizations'], cb);
  }
});

gulp.task('rebuild-styles', function(cb) {
  if (env.uncss) {
    runSequence('sass', 'styles', cb);
  } else {
    runSequence('sass', cb);
  }
});

// delete dist
gulp.task('delete', del.bind(null, ['dist']));

// Compile & autoprefix styles
gulp.task('sass', function() {
  var AUTOPREFIXER_BROWSERS = [
    'ie >= 8',
    'ff >= 30',
    'chrome >= 31',
    'safari >= 5.1',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    '> 0.25%' //global market share
  ];

  // For best performance, don't add partials to `gulp.src`
  return gulp.src([
      'src/styles/**/*.scss'
    ])
    .pipe($.if(env.development, $.sourcemaps.init()))
    .pipe($.sass({
      outputStyle: 'expanded',
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.if(env.development, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('styles', function() {
  return gulp.src(['dist/**/*.css'])
    .pipe($.uncss({
      html: globby.sync(tasks.localization.htmlExcludingLocales)
    }))
    .pipe($.if(!env.development, $.csso()))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe($.cached('images'))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({
      title: 'images'
    }));
});

// Copy files at root level of 'src' to dist
gulp.task('copy', function() {
  return gulp.src(['src/*', '!src/_*', '!src/*.jade'], {
      dot: true
    })
    .pipe($.cached('copy'))
    .pipe(gulp.dest('dist'));
});

//add hashes to filenames to bust caches, write rev-manifest.json
gulp.task('hash', function() {
  return gulp.src(['dist/**/*.html', 'dist/**/*.css', 'dist/**/*.js', 'dist/images/**/*'], {
      base: path.join(process.cwd(), 'dist')
    })
    .pipe($.revAll({
      ignore: ['.html'],
      quiet: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe($.revNapkin({
      verbose: false
    }))
    .pipe($.revAll.manifest())
    .pipe(gulp.dest('dist'));
});

gulp.task('jshint', function() {
  return gulp.src(['*.js', 'tasks/*.js', 'src/**/*.js'])
    .pipe($.cached('jshint'))
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Load custom tasks from the `tasks` directory
var tasks;
try {
  tasks = require('require-dir')('tasks');
} catch (err) {
  console.error(err);
}
