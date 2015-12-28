define(['angular'], function(angular) { 'use strict'; return angular.module("App.Templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("partials/_footer.html","<footer>\n  <h2>footer here!</h2>\n</footer>\n");
$templateCache.put("partials/_header.html","<header  ng-controller=\"LoginController as user\">\n  <h2>header here</h2>\n  <button ng-show=\"!user.loggedIn\" ng-click=\"user.login()\">login with facebook</button>\n  <p>Logged in as {{ user.userName }}</p>\n</header>\n<div ui-view=\"nav\"></div>\n");
$templateCache.put("partials/_nav.html","<nav>\n  <ul>\n    <li>nav here!</li>\n  </ul>\n</nav>\n");
$templateCache.put("templates/home.tpl.html","<h2>home tpl here!</h2>\n\n<ul>\n  <li ng-repeat=\"set in sets\">{{ set.name }} has {{ set.cards }} cards <input type=\"text\" ng-model=\"set.cards\" ng-change=\"sets.$save(set)\" /></li>\n</ul>\n");}]);});