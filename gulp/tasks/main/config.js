'use strict';

var config = {
  source: {
    root: './src/main'
  },
  watch: {
    root: './src/main'
  },
  dist: {
    root: './dist'
  },
  port: 9000
};

config.source.images = config.source.root + '/images/*.*';
config.source.html = config.source.root + '/*.html';

config.watch.images = config.watch.root + '/images/*.*';
config.watch.html = config.watch.root + '/*.html';

config.dist.images = config.dist.root + '/images';
config.dist.html = config.dist.root + '/';
config.dist.serve = config.dist.root + '/index.html';

module.exports = config;
