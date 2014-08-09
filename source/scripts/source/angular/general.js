/* global angular */
(function () {
  'use strict';

  var app = angular.module('general', []);

  app.config(function($locationProvider) {
    $locationProvider.html5Mode(true);

  });
})();
