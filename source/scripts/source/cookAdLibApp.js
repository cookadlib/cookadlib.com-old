/* global angular, Modernizr */

var app = angular.module('cookAdLibApp', ['restangular', 'ngRoute']);

app.factory('usersFactory', function () {
  'use strict';

  var factory = {};

  var users = [
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

  factory.getUsers = function () {
    return users;
  };

  factory.postUser = function () {

  };

  return factory;
});

var controllers = {};

controllers.usersController = function ($scope, usersFactory, Restangular) {
  'use strict';

  $scope.users = [];

  this.init = function() {
    $scope.users = usersFactory.getUsers();
  };

  $scope.postUser = function () {
    $scope.users.push(
      {
        name: $scope.newUser.name,
        city: $scope.newUser.city
      }
    );
  };

  this.init();

  // console.log($scope.filter.name);
};

controllers.ListController = function ($scope, Restangular) {
  'use strict';
// function ListCtrl($scope, Restangular) {
  $scope.projects = Restangular.all('projects').getList().$object;
};

controllers.CreateController = function ($scope, $location, Restangular) {
  'use strict';
// function CreateCtrl($scope, $location, Restangular) {
  $scope.save = function() {
    Restangular.all('projects').post($scope.project).then(function(project) {
      $location.path('/list');
    });
  };
};

controllers.EditController = function ($scope, $location, Restangular, project) {
  'use strict';
// function EditCtrl($scope, $location, Restangular, project) {
  var original = project;
  $scope.project = Restangular.copy(original);


  $scope.isClean = function() {
    return angular.equals(original, $scope.project);
  };

  $scope.destroy = function() {
    original.remove().then(function() {
      $location.path('/list');
    });
  };

  $scope.save = function() {
    $scope.project.put().then(function() {
      $location.path('/');
    });
  };
};

app.controller(controllers);

app.config(function($locationProvider, $httpProvider, $routeProvider, RestangularProvider) {
  'use strict';

  console.log('Modernizr.history', Modernizr.history);

  if(Modernizr.history) {
    $locationProvider.html5Mode(true);

    $httpProvider.defaults.headers.common['X-HTML5Mode'] = Modernizr.history.toString();
  }

  // var config = {
  //   headers:  {
  //     'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
  //     'Accept': 'application/json;odata=verbose',
  //     "X-Testing" : "testing"
  //   }
  // };
  //
  // $http.get("/test", config);

  $routeProvider.
  when('/', {
    controller:controllers.ListController,
    templateUrl:'list.html'
  }).
  when('/edit/:projectId', {
    controller:controllers.EditController,
    templateUrl:'detail.html',
    resolve: {
      project: function(Restangular, $route){
        return Restangular.one('projects', $route.current.params.projectId).get();
      }
    }
  }).
  when('/new', {controller:controllers.CreateController, templateUrl:'detail.html'}).
  otherwise({redirectTo:'/'});

  RestangularProvider.setBaseUrl('https://api.mongolab.com/api/1/databases/angularjs/collections');
  // RestangularProvider.setBaseUrl('/api/v1');
  RestangularProvider.setDefaultRequestParams({ apiKey: '4f847ad3e4b08a2eed5f3b54' });
  RestangularProvider.setRestangularFields({
    id: '_id.$oid'
  });

  RestangularProvider.setRequestInterceptor(function(elem, operation, what) {

    if (operation === 'put') {
      elem._id = undefined;
      return elem;
    }
    return elem;
  });
});
