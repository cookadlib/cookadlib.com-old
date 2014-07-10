var packageJson = require(__dirname + '/../package.json');

var co = require('co');
var wrap = require('co-monk');
var monk = require('monk');

var application = function(data) {

  // private property
  var database;

  // private constructor
  var __construct = function(data) {
    // console.log('Object Created.');

    if(!data) {
      data = packageJson.config.server.database.name;
    }

    database = monk(data);
    // console.log('database', database);
  }();

  this.getDatabase = function() {
    return database;
  }

  this.setDatabase = function(data) {
    database = monk(data);
  }

  this.collection = function(data) {
    return wrap(database.get(data));
  }

};

module.exports = application;
