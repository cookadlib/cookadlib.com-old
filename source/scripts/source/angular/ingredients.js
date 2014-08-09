/* global angular */
(function () {
  'use strict';

  var app = angular.module('ingredients', ['restangular', 'ngRoute', 'ngTable']);

  var controllers = {};

  controllers.List = function ($scope, $rootScope, Restangular, $filter, ngTableParams) {

    // $rootScope.$on('$locationChangeStart', function (event, next, current) {
    $rootScope.$on('$locationChangeStart', function () {
      // console.log(event, next, current);
      $('body').removeClass('index');
    });

    $('body').addClass('index');

    // console.log('ingredients controllers.List', $scope);
    // $scope.ingredients = Restangular.all('ingredients').getList().$object;

    var data = Restangular.all('ingredients').getList().$object;

    $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
        filter: {
            // name: 'M'       // initial filter
            name: ''       // initial filter
        },
        sorting: {
            name: 'asc'     // initial sorting
        }
    }, {
        total: data.length, // length of data
        getData: function($defer, params) {
          // use build-in angular filter
          var filteredData = params.filter() ?
            $filter('filter')(data, params.filter()) :
            data;

          var orderedData = params.sorting() ?
            $filter('orderBy')(filteredData, params.orderBy()) :
            data;

          params.total(orderedData.length); // set total for recalc pagination
          $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
  };

  controllers.Create = function ($scope, $rootScope, $location, Restangular) {

    // $rootScope.$on('$locationChangeStart', function (event, next, current) {
    $rootScope.$on('$locationChangeStart', function () {
      // console.log(event, next, current);
      $('body').removeClass('add');
    });

    $('body').addClass('add');

    $scope.save = function() {
      // Restangular.all('ingredients').post($scope.ingredient).then(function(ingredient) {
      Restangular.all('ingredients').post($scope.ingredient).then(function() {
        // console.log('ingredient', ingredient);
        $location.path('/ingredients/list');
      });
    };
  };

  controllers.Edit = function ($scope, $rootScope, $location, Restangular, ingredient) {

    // $rootScope.$on('$locationChangeStart', function (event, next, current) {
    $rootScope.$on('$locationChangeStart', function () {
      // console.log(event, next, current);
      $('body').removeClass('edit');
    });

    $('body').addClass('edit');

    var original = ingredient;
    // console.log('original', original);

    $scope.ingredient = Restangular.copy(original);

    $scope.isClean = function() {
      return angular.equals(original, $scope.ingredient);
    };

    $scope.delete = function() {
      original.remove().then(function() {
        $location.path('/ingredients');
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
    // console.log('ingredients app.config');
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

    // console.log('$routeProvider', $routeProvider);

    $routeProvider.
    when('/ingredients', {
      controller:controllers.List,
      templateUrl:'ingredients/index.html'
    }).
    // when('/ingredients/edit/:ingredientId', {
    when('/ingredients/edit/:name', {
      controller:controllers.Edit,
      templateUrl:'ingredients/edit.html',
      resolve: {
        ingredient: function(Restangular, $route) {
          // console.log($route.current.params, $route.current.params.ingredientId);
          // console.log($route.current.params, $route.current.params.name);
          // return Restangular.one('ingredients', $route.current.params.ingredientId).get();
          var data = Restangular.one('ingredients', $route.current.params.name).get();
          console.log('data', data);
          return data;
        }
      }
    }).
    when('/ingredients/add', {
      controller:controllers.Create,
      templateUrl:'ingredients/add.html'
    }).
    otherwise({
      redirectTo:'/ingredients'
    });

    // console.log('$routeProvider', $routeProvider);

    RestangularProvider.setRestangularFields({
      id: '_id'
    });

    // RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
    RestangularProvider.setRequestInterceptor(function(elem, operation) {
      // console.log('what', what);
      if (operation === 'put') {
        elem._id = undefined;
        return elem;
      }
      return elem;
    });
  });
})();
