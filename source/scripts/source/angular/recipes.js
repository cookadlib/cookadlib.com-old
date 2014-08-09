/* global angular */
(function () {
  'use strict';

  var app = angular.module('recipes', ['restangular', 'ngRoute']);

  var controllers = {};

  controllers.ListController = function ($scope, Restangular) {
    $scope.recipes = Restangular.all('recipes').getList().$object;
  };

  controllers.CreateController = function ($scope, $location, Restangular) {
    $scope.save = function() {
      Restangular.all('recipes').post($scope.recipe).then(function(recipe) {
        console.log('recipe', recipe);
        $location.path('/recipes/list');
      });
    };
  };

  controllers.EditController = function ($scope, $location, Restangular, recipe) {
    var original = recipe;
    $scope.recipe = Restangular.copy(original);

    $scope.isClean = function() {
      return angular.equals(original, $scope.recipe);
    };

    $scope.destroy = function() {
      original.remove().then(function() {
        $location.path('/recipes/list');
      });
    };

    $scope.save = function() {
      $scope.recipe.put().then(function() {
        // $location.path('/recipes');
      });
    };
  };

  app.controller(controllers);

  app.config(function($locationProvider, $httpProvider, $routeProvider, RestangularProvider) {
    // RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/angularjs/collections');
    RestangularProvider.setBaseUrl('/api/v1');

    // RestangularProvider.setDefaultRequestParams({
    //   apiKey: '4f847ad3e4b08a2eed5f3b54'
    // });

    RestangularProvider.setRestangularFields({
      // id: '_id.$oid'
      id: '_id'
    });

    $locationProvider.html5Mode(true);

    $routeProvider.
    when('/recipes', {
      controller:controllers.ListController,
      templateUrl:'list.html'
    }).
    when('/recipes/edit/:recipeId', {
      controller:controllers.EditController,
      templateUrl:'detail.html',
      // templateUrl: 'views/_elements/detail.html',
      resolve: {
        recipe: function(Restangular, $route) {
          console.log($route.current.params, $route.current.params.recipeId);
          // return Restangular.one('recipes', $route.current.params.recipeId).get();
          return Restangular.one('recipes', $route.current.params.name).get();
        }
      }
    }).
    when('/recipes/new', {
      controller:controllers.CreateController,
      templateUrl:'detail.html'
    }).
    otherwise({
      // redirectTo:'/recipes'
    });

    RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
      console.log('what', what);
      if (operation === 'put') {
        elem._id = undefined;
        return elem;
      }
      return elem;
    });
  });
})();
