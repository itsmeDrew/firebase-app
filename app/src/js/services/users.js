'use strict';

var app = angular.module('App.Service.Users', []);

app.service('users', UsersCtrl);

function UsersCtrl ($firebaseAuth, config) {
  var vm = this;
  var baseDataURL = config.baseDataURL;
  var baseRef = new Firebase(baseDataURL);
  var baseAuth = $firebaseAuth(baseRef);
  var adminRef = baseRef.child("admins");

  vm.loginWithFacebook = function (callback) {
    baseAuth.$authWithOAuthPopup("facebook").then(function(authData) {
      if (authData) {
        vm.authHandler(baseRef);
        callback();
      }
    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  }

  vm.loginWithGoogle = function (callback) {
    baseAuth.$authWithOAuthPopup("google").then(function(authData) {
      if (authData) {
        vm.authHandler(baseRef);
        callback();
      }
    }).catch(function(error) {
      console.log("Authentication failed:", error);
    });
  }

  vm.authHandler = function (ref) {
    var _ref = ref || baseRef;

    _ref.onAuth(function(authData) {
      if (authData) {
        var _userList = ref.child("users");

        vm.authenticated = false;

        _userList.once('value', function(snapshot) {
          var _userId = authData.uid;
          var _userExists = snapshot.hasChild(_userId);
          var _authenticated = vm.authenticated;

          if (!_userExists && authData && !_authenticated) {
            vm.setNewUser(_userList, _userId, authData);
          }

          vm.authenticated = true;
        });
      }
    });
  }

  vm.setNewUser = function (userListRef , userId, authData) {
    adminRef.once('value', function(snapshot) {
      if (snapshot.hasChild(authData.uid)) {
        userListRef .child(userId).set({
          provider: authData.provider,
          name: vm.getName(authData),
          userID: userId,
          role: 99
        });
      } else {
        userListRef .child(userId).set({
          provider: authData.provider,
          name: vm.getName(authData),
          userID: userId,
          role: 10
        });
      }
    })
  }

  vm.getName = function (authData) {
    switch(authData.provider) {
      case 'password':
      return authData.password.email.replace(/@.*/, '');
      case 'twitter':
      return authData.twitter.displayName;
      case 'facebook':
      return authData.facebook.displayName;
      case 'google':
      return authData.google.displayName;
    }
  }

  vm.checkAuth = function (ref) {
    var _ref = ref || baseRef;
    var authData = _ref.getAuth();

    if (authData) {
      return authData;
    }
  }

  vm.logout = function (ref) {
    var _ref = ref || baseRef;

    return _ref.unauth();
  }

};

module.exports = UsersCtrl;
