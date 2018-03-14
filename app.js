'use strict';
// init the Firebase
var config = {
    //apiKey: "****",
    //authDomain: "***",
    //databaseURL: "***",
    //projectId: "***",
    //storageBucket: "**",
    //messagingSenderId: "**"
  };
firebase.initializeApp(config);

// Declare app level module which depends on views, and components
angular.module('myExpenses', [
  'ngRoute',
  'firebase',
  'myExpenses.expenses',
  'myExpenses.payments',
  'myExpenses.about'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/payments'});
}]);
