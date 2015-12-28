'use strict';

define(
  [
    'angular',
    'firebase',
    'angularfire'
  ],
  function(angular) {
    angular
      .module('App.Controller.Login', ['firebase'])
      .controller('LoginController', LoginController);

    function LoginController($stateParams, $state, $scope, $firebaseAuth) {
      var vm = this;
      var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
      var data = new Firebase(baseDataURL);
      var auth = $firebaseAuth(data);

      vm.login = loginWithFacebook;
      vm.loggedIn = false;
      vm.userName = 'Bob';

      function loginWithFacebook() {
        data.authWithOAuthPopup("facebook", authHandler);
      }

      function authHandler(error, authData) {
        vm.loggedIn = true;
        vm.userName = 'Drew';

        if (error) {
          alert("Login Failed!", error);
        } else {
          data.onAuth(function(authData) {
            var _userList = data.child("users");
            var _userId = authData.uid;

            _userList.once('value', function(snapshot) {
              if (authData && !snapshot.hasChild(_userId) && !vm.loggedIn) {
               console.log('new user: ', authData);
               setNewUser(_userList, _userId, authData);
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
