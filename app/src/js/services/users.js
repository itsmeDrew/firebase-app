'use strict';

var app = angular.module('App.Service.Users', []);

app.service('users', UsersCtrl);

function UsersCtrl ($firebaseAuth, config) {
  var vm = this;
  var baseRef = new Firebase(config.baseDataURL);
  var baseAuth = $firebaseAuth(baseRef);

  vm.authHandler = authHandler;
  vm.checkAuth = checkAuth;
  vm.login = loginWithFacebook;
  vm.logout = logout;

  function loginWithFacebook(callback) {
    baseAuth.$authWithOAuthPopup("facebook").then(function(authData) {
      if (authData) {
        authHandler(baseRef);
        callback();
        console.log("Authenticated with:", authData);
      }
    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  }

  function authHandler(ref) {
    var _ref = ref || baseRef;

    _ref.onAuth(function(authData) {
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
    var _ref = ref || baseRef;
    var authData = _ref.getAuth();

    if (authData) {
      return authData;
    }
  }

  function logout(ref) {
    var _ref = ref || baseRef;

    return _ref.unauth();
  }

};

module.exports = UsersCtrl;
