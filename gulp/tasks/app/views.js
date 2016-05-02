'use strict';

var gulp = require('gulp');
var del = require('del');
var ngTemplateCache = require('gulp-angular-templatecache');
var config = require('./config');

gulp.task('clean:app-views', function(cb) {
  cb()
});

gulp.task('build:app-views', function() {
  return gulp.src(config.source.views)
    .pipe(ngTemplateCache({
      moduleSystem: 'browserify',
      standalone: true
    }))
    .pipe(gulp.dest(config.dist.views));
    return gulp.src(config.source.views)
        .pipe(ngTemplateCache({
            moduleSystem: 'browserify',
            standalone: true
        }))
        .pipe(gulp.dest(config.dist.views));
});

gulp.task('clean-build:app-views', ['clean:app-views'], function () {
  gulp.start(['build:app-views']);
});

gulp.task('watch:app-views', function() {
  gulp.watch(config.source.views, ['build:app-views', 'build:app-scripts']);
});
