'use strict';

define(
  [
    'angular',
    'firebase',
    'uiRouter',
    'angularfire'
  ],
  function(angular) {
    angular
      .module('App.Service.Login', ['firebase'])
      .service('Login', Login);

      function Login($firebaseAuth) {
        var vm = this;
        var baseDataURL = 'https://mypokemonclub.firebaseio.com/';
        var data = new Firebase(baseDataURL);
        var auth = $firebaseAuth(data);

        vm.loginWithFacebook = loginWithFacebook;
        vm.loggedIn = false;

        function loginWithFacebook() {
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
               if (authData && !snapshot.hasChild(_userId) && !vm.loggedIn) {
                 console.log('new user: ', authData);
                 setNewUser(_userList, _userId, authData);
                 vm.loggedIn = true;
               } else if (authData && snapshot.hasChild(_userId) && !vm.loggedIn) {
                 console.log('returning user: ', authData);
                 vm.loggedIn = true;
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
