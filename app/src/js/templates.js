define(['angular'], function(angular) { 'use strict'; return angular.module("App.Templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("partials/_footer.html","<footer>\n  <h2>footer here!</h2>\n</footer>\n");
$templateCache.put("partials/_header.html","<header>\n  <h2>header here</h2>\n  <button ng-show=\"!app.loggedIn\" ng-click=\"app.login()\">login with facebook</button>\n  <button ng-click=\"app.logout()\">logout</button>\n  <p ng-if=\"app.loggedIn\">Logged in as {{ app.userName }}</p>\n  <img src=\"{{ app.profilePic }}\" alt=\"\">\n</header>\n<div ui-view=\"nav\"></div>\n");
$templateCache.put("partials/_nav.html","<nav>\n  <ul>\n    <li>nav here!</li>\n  </ul>\n</nav>\n");
$templateCache.put("templates/home.tpl.html","<h2>home tpl here!</h2>\n\n<!-- USER LOGGED IN -->\n<div ng-show=\"app.loggedIn\" class=\"logged-in\">\n  <h2>Logged in information</h2>\n\n  <ul>\n    <li ng-repeat=\"set in sets\">\n      <p>{{ set.name }} has {{ set.cards }} cards</p>\n      <p>I have</p>\n    </li>\n  </ul>\n</div>\n");}]);});