'use strict';

var app = angular.module('App.Directive.User.ProfilePic', []);

app.directive('userProfilePic', userProfilePic);

function userProfilePic($rootScope) {
  return {
    restrict: 'E',
    templateUrl: 'partials/user/_profile-pic.html',
    link: function (scope, element, attr) {
      var vm = this;

    }
  }
}

module.exports = userProfilePic;
