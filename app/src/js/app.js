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
    'controllers/nav',
    'services/Users'
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
      'App.Controller.Nav',
      'App.Service.Users'
    ])
    .controller('AppController', appCtrl);

    function appCtrl($scope, $state, $stateParams, $rootScope, $firebaseArray, $firebaseAuth, Users) {
      var vm = this;
      var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
      var dataSets = new Firebase(baseDataURL + 'setsAvailable/');
      var data = new Firebase(baseDataURL);

      vm.login = loginWithFacebook;
      vm.logout = logoutFacebook;
      vm.loggedIn = false;
      vm.userName = '';
      vm.profilePic = '';
      vm.sets = $firebaseArray(dataSets);

      function loginWithFacebook() {
        data.authWithOAuthPopup("facebook", authHandler);

        data.onAuth(function(authData) {
          var _userList = data.child("users");

          _userList.once('value', function(snapshot) {
            var _userId = authData.uid;

            if (authData && !snapshot.hasChild(_userId)) {
              vm.userName = authData.facebook.displayName;
              vm.profilePic = authData.facebook.profileImageURL;

              console.log('new user: ', authData);
              setNewUser(_userList, _userId, authData);
            } else if (authData && snapshot.hasChild(_userId)) {
              vm.userName = authData.facebook.displayName;
              vm.profilePic = authData.facebook.profileImageURL;

              console.log('returning user: ', authData);
            } else {
              console.log("Client unauthenticated.");
            }
          });
        });
      }

      function logoutFacebook() {
        vm.userName = '';
        vm.profilePic = '';
        vm.loggedIn = false;

        data.unauth();
        $state.go($state.current, {}, {reload: true});
      }

      function authHandler(error, authData) {
        if (error) {
          alert("Login Failed!", error);
        } else {
          $state.go($state.current, {}, {reload: true});
        }
      }

      function setNewUser(list, userId, authData) {
        list.child(userId).set({
          provider: authData.provider,
          name: getName(authData),
          userID: userId
        });
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

    }
  }

);
