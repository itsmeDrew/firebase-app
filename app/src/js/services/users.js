'use strict';

define(
  [
    'angular',
    'firebase',
    'angularfire'
  ],
  function(angular) {
    angular
    .module('App.Service.Users', ['firebase'])
    .service('Users', UserController);

    function UserController() {
      var vm = this;
      // var ref = new Firebase('https://mypokemonclub.firebaseio.com/');

      vm.authHandler = authHandler;
      vm.checkAuth = checkAuth;
      vm.loginWithFacebook = loginWithFacebook

      function loginWithFacebook(auth, ref) {
        auth.$authWithOAuthPopup("facebook").then(function(authData) {
          if (authData) {
            authHandler(ref);
            console.log("Authenticated with:", authData);
          }
        }).catch(function(error) {
          console.log("Authentication failed:", error);
        });
      }

      function authHandler(ref) {
        ref.onAuth(function(authData) {
          if (authData) {
            var _userList = ref.child("users");

            vm.authenticated = false;

            _userList.once('value', function(snapshot) {
              var _userId = authData.uid;

              if (authData && !snapshot.hasChild(_userId) && !vm.authenticated) {
                console.log('new user');
                setNewUser(_userList, _userId, authData);
                vm.authenticated = true;
              } else if (authData && snapshot.hasChild(_userId) && !vm.authenticated) {
                console.log('returning user');
                vm.authenticated = true;
              }
            });
          }
        });
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

      function checkAuth(ref) {
        var authData = ref.getAuth();
        // var isAdmin = checkAdmin(authData);

        if (authData) {
          return authData;
        }
      }

      function isAdmin(authData) {
        if(authData.uid)
      }

    }

  }
);
