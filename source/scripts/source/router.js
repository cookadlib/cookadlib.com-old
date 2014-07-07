// var cookAdLibApp = angular.module('cookAdLibApp', ['ui.router']);
// cookAdLibApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
//   'use strict';
//   //
//   // For any unmatched url, redirect to /state1
//   $urlRouterProvider.otherwise('/');
//   //
//   // Now set up the states
//   $stateProvider
//   .state('start', {
//     url: '/',
//     templateUrl: 'elements/home.html'
//   })
//   .state('recipes', {
//     url: '/recipes',
//     templateUrl: 'elements/recipes.html'
//   })
//   .state('state1', {
//     url: '/state1',
//     templateUrl: 'elements/state1.html'
//   })
//   .state('state1.list', {
//     url: '/list',
//     templateUrl: 'elements/state1.list.html',
//     controller: function($scope) {
//       $scope.items = ['A', 'List', 'Of', 'Items'];
//     }
//   })
//   .state('state2', {
//     url: '/state2',
//     templateUrl: 'elements/state2.html'
//   })
//   .state('state2.list', {
//     url: '/list',
//     templateUrl: 'elements/state2.list.html',
//     controller: function($scope) {
//       $scope.things = ['A', 'Set', 'Of', 'Things'];
//     }
//   });
//
//   $locationProvider.html5Mode(true);
// });
