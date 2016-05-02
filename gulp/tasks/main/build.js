'use strict';

var gulp = require('gulp');
var images = require('./../common/images');
var html = require('./../common/html');
var serve = require('./../common/serve');

var config = require('./config');

gulp.task('clean:main-images', images(config).clean);
gulp.task('build:main-images', images(config).build);
gulp.task('watch:main-images', images(config).watch);
gulp.task('clean-build:main-images', ['clean:main-images'], images(config).build);

gulp.task('clean:main-html', html(config).clean);
gulp.task('build:main-html', html(config).build);
gulp.task('watch:main-html', html(config).watch);
gulp.task('clean-build:main-html', ['clean:main-html'], html(config).build);

gulp.task('clean:main', [], function () {
  return gulp.start([
    'clean:main-images',
    'clean:main-html'
  ]);
});


gulp.task('build:main', function () {
  return gulp.start([
    'build:main-images',
    'build:main-html'
  ]);
});

gulp.task('watch:main', [], function () {
  return gulp.start([
    'watch:main-images',
    'watch:main-html'
  ]);
});

gulp.task('serve:main', serve(config).open);