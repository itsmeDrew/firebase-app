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
  'services/dex-data'
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
      'App.Service.DexData'
    ])
    .controller('AppController', appCtrl);

    function appCtrl($scope, $state, $rootScope, $firebaseArray, $firebaseAuth) {
      var vm = this;
      var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
      var data = new Firebase(baseDataURL);
      var dataSets = new Firebase(baseDataURL + 'setsAvailable/');
      var auth = $firebaseAuth(data);

      vm.login = login;
      vm.loggedIn = false;
      vm.auth = false;

     $scope.sets = $firebaseArray(dataSets);

      function login() {
        data.authWithOAuthPopup("facebook", authHandler);
      }

      function authHandler(error, authData) {

        if (error) {
          alert("Login Failed!", error);
        } else {
          data.onAuth(function(authData) {
            var _userList = data.child("users");
            var _userId = authData.uid;

            _userList.once('value', function(snapshot) {
             if (authData && !snapshot.hasChild(_userId) && !vm.auth) {
               console.log('new user: ', authData);
               setNewUser(_userList, _userId, authData);
               vm.auth = true;
             } else if (authData && snapshot.hasChild(_userId) && !vm.auth) {
               console.log('returning user: ', authData);
               vm.auth = true;
             }
            });
          });
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
