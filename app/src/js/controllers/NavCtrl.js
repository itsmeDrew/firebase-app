'use strict';

var app = angular.module('App.Controller.Nav', []);

app.controller('NavCtrl', NavCtrl);

function NavCtrl () {
  var vm = this;

  console.log('Nav ctrl here');
};

module.exports = NavCtrl;
