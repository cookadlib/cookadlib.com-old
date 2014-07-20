/* global angular */

var app = angular.module('cookAdLibApp', ['restangular', 'ngRoute']);

var controllers = {};

controllers.ListController = function ($scope, Restangular) {
  'use strict';

  $scope.ingredients = Restangular.all('ingredients').getList().$object;
};

controllers.CreateController = function ($scope, $location, Restangular) {
  'use strict';

  $scope.save = function() {
    Restangular.all('ingredients').post($scope.ingredient).then(function(ingredient) {
      console.log('ingredient', ingredient);
      $location.path('/ingredients/list');
    });
  };
};

controllers.EditController = function ($scope, $location, Restangular, ingredient) {
  'use strict';

  var original = ingredient;
  $scope.ingredient = Restangular.copy(original);

  $scope.isClean = function() {
    return angular.equals(original, $scope.ingredient);
  };

  $scope.destroy = function() {
    original.remove().then(function() {
      $location.path('/ingredients/list');
    });
  };

  $scope.save = function() {
    $scope.ingredient.put().then(function() {
      $location.path('/ingredients');
    });
  };
};

app.controller(controllers);

app.config(function($locationProvider, $httpProvider, $routeProvider, RestangularProvider) {
  'use strict';

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
  when('/ingredients', {
    controller:controllers.ListController,
    templateUrl:'list.html'
  }).
  when('/ingredients/edit/:ingredientId', {
    controller:controllers.EditController,
    templateUrl:'detail.html',
    // templateUrl: 'views/_elements/detail.html',
    resolve: {
      ingredient: function(Restangular, $route) {
        console.log($route.current.params, $route.current.params.ingredientId);
        // return Restangular.one('ingredients', $route.current.params.ingredientId).get();
        return Restangular.one('ingredients', $route.current.params.name).get();
      }
    }
  }).
  when('/ingredients/new', {
    controller:controllers.CreateController,
    templateUrl:'detail.html'
  }).
  otherwise({
    // redirectTo:'/ingredients'
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
