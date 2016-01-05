'use strict';

var app = angular.module('App.Controller.Home', []);

app.controller('HomeCtrl', HomeCtrl);

function HomeCtrl () {
  var vm = this;

  console.log('Home ctrl here');
};

module.exports = HomeCtrl;
