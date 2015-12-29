'use strict';

define(
  [
  'angular',
  'firebase',
  'angularfire',
  'ngSanitize',
  'uiRouter',
  'jquery',
  'slick',
  'app-config',
  'templates',
  'controllers/home',
  'controllers/nav'
  ],
  function(angular) {
    angular
    .module('App', [
      'ui.router',
      'ngSanitize',
      'firebase',
      'App.Templates',
      'App.Config',
      'App.Controller.Home',
      'App.Controller.Nav'
    ])
    .controller('AppController', appCtrl);

    function appCtrl($scope, $state, $stateParams, $rootScope, $firebaseArray, $firebaseAuth) {
      var vm = this;
      var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
      var dataSets = new Firebase(baseDataURL + 'setsAvailable/');
      var data = new Firebase(baseDataURL);
      var auth = $firebaseAuth(data);

      vm.login = loginWithFacebook;
      vm.logout = logoutFacebook;
      vm.loggedIn = false;
      vm.userName = '';
      vm.profilePic = '';

      $scope.sets = $firebaseArray(dataSets);

      data.onAuth(function(authData) {
        if (authData) {
          vm.userName = authData.facebook.displayName;
          vm.profilePic = authData.facebook.profileImageURL;
          vm.loggedIn = true;

          vm.userName = authData.facebook.displayName;
          vm.userId = authData.uid;
          vm.loggedIn = true;

          console.log("Authenticated with:", authData);
        } else {
          console.log("Client unauthenticated.")
        }
      });

      function loginWithFacebook() {
        data.authWithOAuthPopup("facebook", authHandler);
      }

      function logoutFacebook() {
        vm.userName = '';
        vm.profilePic = '';
        vm.loggedIn = false;

        vm.loggedIn = false;
        data.unauth();
        $state.go($state.current, {}, {reload: true});
      }

      function authHandler(error, authData) {
        if (error) {
          alert("Login Failed!", error);
        } else {
          console.log('reloading');
          $state.go($state.current, {}, {reload: true});
         }
       }

       function getName(authData) {
         switch(authData.provider) {
           case 'password':
             return authData.password.email.replace(/@.*/, '');
           case 'twitter':
             return authData.twitter.displayName;
           case 'facebook':
             return authData.facebook.displayName;
         }
       }

       function setNewUser(list, userId, authData) {
         list.child(userId).set({
           provider: authData.provider,
           name: getName(authData),
           userID: userId
         });
       }

    }
  }

);
