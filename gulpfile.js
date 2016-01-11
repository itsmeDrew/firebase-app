'use strict';

var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var ngTemplateCache = require('gulp-angular-templatecache');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var sass = require('gulp-ruby-sass');
var uglify = require('gulp-uglifyjs');
var _distDir = './app/dist';
var _srcDir = './app/src';

gulp.task('clean:public', function (cb) { return del(_distDir + '/assets', cb); });
gulp.task('clean:fonts', function (cb) { return del(_distDir + '/assets/fonts', cb); });
gulp.task('clean:images', function (cb) { return del(_distDir + '/assets/img', cb); });
gulp.task('clean:js', function (cb) { return del(_distDir + '/assets/js', cb); });
gulp.task('clean:css', function (cb) { return del(_distDir + '/assets/css', cb); });

gulp.task('copy:fonts', function() {
  return gulp.src(_srcDir + '/fonts/**/*')
    .pipe(gulp.dest(_distDir + '/assets/fonts'));
});

gulp.task('copy:images', function() {
  return gulp.src(_srcDir + '/img/**/*')
    .pipe(gulp.dest(_distDir + '/assets/img'));
});

gulp.task('build:views', function() {
  return gulp.src(_srcDir + '/views/**/*.html')
    .pipe(ngTemplateCache({
      moduleSystem: 'browserify',
      standalone: true
    }))
    .pipe(gulp.dest(_srcDir + '/js'))
      .on('finish', function() {
        gulp.start([ 'build:js' ]);
      });
});

gulp.task('build:js', [ 'clean:js' ], function() {
	gulp.src(_srcDir + '/js/main.js')
		.pipe(browserify({
		  insertGlobals : true
		}))
    .pipe(rename('main.min.js'))
		.pipe(gulp.dest(_distDir + '/assets/js'))
    .pipe(notify('JS Success: <%= file.relative %>'));
});

gulp.task('build:css', function() {
  return sass(_srcDir + '/scss/main.scss', {
        style: 'compressed',
        loadPath: './node_modules'
      })
      .on('error', notify.onError(function(err) {
        return 'CSS Error:' + err.message;
      }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(_distDir + '/assets/css'))
    .pipe(notify('CSS Success: <%= file.relative %>'));
});

gulp.task('lint:js', function() {
  return gulp.src([ _srcDir + '/js/**/*.js', '!./src/js/templates.js' ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch(_srcDir + '/views/**/*.html', [ 'build:views' ]);
  gulp.watch(_srcDir + '/js/**/*.js', [ 'build:js' ]);
  gulp.watch(_srcDir + '/scss/**/*.scss', [ 'build:css' ]);
  gulp.watch(_srcDir + '/img/**/*.scss', [ 'copy:images' ]);
  gulp.watch(_srcDir + '/fonts/**/*.scss', [ 'copy:fonts' ]);
})

gulp.task('build', function(cb) {
  gulp.start([ 'build:views', 'build:css', 'copy:fonts', 'copy:images' ], cb);
});

gulp.task('default', [ 'build' ], function() {
  gulp.start([ 'watch' ]);
});
