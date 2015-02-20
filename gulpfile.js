'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var reload = browserSync.reload;

var bitpayDesign = 'components/bitpay-design/';

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

gulp.task('jshint', function () {
  return gulp.src('src/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe(gulp.dest('dev/scripts'))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('images', function () {
  return gulp.src('src/images/**/*')
    .pipe($.cached('images'))
    .pipe(gulp.dest('dev/images'))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

// Copy files at root level of 'src' to dist
gulp.task('copy', function () {
  return gulp.src([
    'src/*',
    '!src/*.jade'
  ], {
    dot: true
  }).pipe(gulp.dest('dev'))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
});

// Compile & autoprefix styles
gulp.task('sass', function () {
  // For best performance, don't add partials to `gulp.src`
  return gulp.src([
      'src/styles/**/*.scss'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.changed('dev/styles', {extension: '.scss'}))
    .pipe($.sass({
        outputStyle: 'expanded',
        precision: 10,
        onError: console.error.bind(console, 'Sass error:')
      }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dev/styles'))
    .pipe($.size({title: 'styles'}));
});

gulp.task('styles', ['sass', 'jade'], function () {
  return gulp.src(['dev/**/*.css'])
    .pipe($.uncss({
      html: ['dev/**/*.html']
    }))
    .pipe(gulp.dest('dev'))
    .pipe($.csso())
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'uncss'}));
});

// compile Jade to pretty html in dev
gulp.task('jade', function () {
  return gulp.src([bitpayDesign + 'jade/**/*.jade', 'src/**/*.jade'])
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest('dev'))
    .pipe($.size({title: 'jade'}));
});

// Scan HTML for build:js blocks. Clean, concat, minify js
gulp.task('scripts', ['jade'], function () {
  var assets = $.useref.assets({searchPath: '{dev,components,src}'});

  return gulp.src(['src/**/*.html','dev/**/*.html'])
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

//add hashes to filenames to bust caches, write rev-manifest.json
gulp.task('hash', function() {
  return gulp.src(['dist/**/*.html', 'dist/**/*.css', 'dist/**/*.js', 'dist/images/**/*'], { base: path.join(process.cwd(), 'dist') })
    .pipe($.revAll({ ignore: ['.html'], quiet: true }))
    .pipe(gulp.dest('dist'))
    .pipe($.revNapkin({verbose: false}))
    .pipe($.revAll.manifest())
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
  gulp.src('dist/**/*.html')
    .pipe($.minifyHtml({conditionals: true}))
    .pipe(gulp.dest('dist'))
});

// delete dev and dist
gulp.task('delete', del.bind(null, ['dev', 'dist']));

// Watch for changes & reload
gulp.task('serve', ['default'], function () {
  browserSync({
    notify: false,
    logPrefix: 'serve',
    server: {
      //serve from dev, fall back to src
      baseDir: ['dev', 'components', 'src']
    }
  });

  gulp.watch(['src/**/*.html'], reload);
  gulp.watch([bitpayDesign + 'scss/**/*.scss', 'src/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['src/scripts/**/*.js'], ['jshint']);
  gulp.watch(['src/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    logPrefix: 'serve:dist',
    https: true,
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('default', ['delete'], function (cb) {
  runSequence('sass', ['jade','jshint', 'scripts', 'images', 'copy', 'styles'], 'hash', 'html', cb);
});

// Run PageSpeed Insights
gulp.task('pagespeed', pagespeed.bind(null, {
  url: 'http://bitpay.com',
  strategy: 'mobile'
}));

// Load custom tasks from the `tasks` directory
try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
