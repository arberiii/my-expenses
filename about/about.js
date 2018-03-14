'use strict';

angular.module('myExpenses.about', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: 'about/about.html',
    controller: 'AboutCtrl'
  });
}])
// About Controller
.controller('AboutCtrl', ['$scope', function($scope) {



}]);