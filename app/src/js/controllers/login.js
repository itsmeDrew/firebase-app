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
      vm.logout = logoutFacebook;
      vm.loggedIn = false;
      vm.userName = '';
      vm.profilePic = '';

      console.log(auth);

      data.onAuth(function(authData) {
        if (authData) {
          vm.userName = authData.facebook.displayName;
          vm.profilePic = authData.facebook.profileImageURL;
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
        data.unauth();
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
