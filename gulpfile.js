'use strict';

var requireDir = require('require-dir');
requireDir('./gulp/tasks', {recurse: true});

var gulp = require('gulp');

gulp.task('clean', [
  'clean:app'
],  function () { });

gulp.task('build', function () {
  return gulp.start([
    'build:app',
  ]);
});

gulp.task('watch', function() {
   gulp.start([
     'watch:app'
   ])
});

gulp.task('serve', ['build', 'watch'], function() {
    gulp.start([
        'serve:main'
    ]);
});
