/* global angular */

var cookAdLibApp = angular.module('cookAdLibApp', []);

var controllers = {};

controllers.SimpleController = function ($scope) {
  'use strict';

  $scope.customers = [
    {
      name: 'John Doe',
      city: 'New York'
    },
    {
      name: 'Jane Doe',
      city: 'New Jersey'
    },
    {
      name: 'Jane Smith',
      city: 'London'
    }
  ];

  $scope.addCustomer = function () {
    $scope.customers.push(
      {
        name: $scope.newCustomer.name,
        city: $scope.newCustomer.city
      }
    );
  };

  // console.log($scope.filter.name);
};

cookAdLibApp.controller(controllers);
