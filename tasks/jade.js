'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mkdirp = require('mkdirp');
var getDirName = require('path').dirname;
var runSequence = require('run-sequence');
var fs = require('fs');
var globby = require('globby');
var async = require('async');
var uglifyJS = require('uglify-js');
var jademinSrcs = {};

gulp.task('jade:dev', function() {
  return jade({
    pretty: true,
    locals: {
      getObjectFromJson: getObjectFromJson,
      jademin: jademinMixin,
      DEV: true
    }
  }, 'jade:dev');
});
gulp.task('jade', function() {
  return jade({
    locals: {
      getObjectFromJson: getObjectFromJson,
      jademin: jademinMixin,
      DEV: false
    }
  }, 'jade');
});

gulp.task('uncached-rebuild-jade', function(cb) {
  delete $.cached.caches.jade;
  runSequence('rebuild-jade', cb);
});

function jade(options, cache) {
  return gulp.src(['src/**/*.jade', '!src/_**/*.jade'])
    .pipe($.cached('jade'))
    .pipe($.jade(options))
    .pipe(gulp.dest('dist'));
}

gulp.task('jademin', function(cb) {
  var outputPaths = [];
  for (var outputPath in jademinSrcs) {
    outputPaths.push(outputPath);
    for (var inputPath in jademinSrcs[outputPath]) {
      jademinSrcs[outputPath][inputPath] = '{build,components,src}' + jademinSrcs[outputPath][inputPath];
    }
  }
  async.each(outputPaths, function(name, cb) {
    var scriptPaths = globby.sync(jademinSrcs[name]);
    var contents = uglifyJS.minify(scriptPaths);
    writeFile('dist' + name, contents.code, cb);
  }, function(err) {
    if (err) {
      console.log('Jademin: Uglify failed - ' + err);
    }
    cb();
  });
});

function getObjectFromJson(path) {
  return JSON.parse(String(fs.readFileSync(path)));
}

function jademinMixin(block, path) {
  var functionString = block.toString();
  var regex = /<script src=\\"(.*?)\\">/g;
  var matches = getMatches(functionString, regex);
  if (typeof jademinSrcs[path] === 'undefined') {
    jademinSrcs[path] = matches;
  } else {
    if(!arraysEqual(jademinSrcs[path], matches)){
      throw new Error('Jademin: path "' + path + '" is already taken.');
    }
  }
}

function writeFile (path, contents, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err){
      return cb(err);
    }
    fs.writeFile(path, contents, cb);
  });
}

function arraysEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

function getMatches(string, regex) {
  var matches = [],
    match;
  while (!!(match = regex.exec(string))) {
    matches.push(match[1]);
  }
  return matches;
}
