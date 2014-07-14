var packageJson = require(__dirname + '/../package.json');

var co = require('co');
var wrap = require('co-monk');
var monk = require('monk');

var application = function(configuation) {

  // private property
  var database;

  // private constructor
  var __construct = function(configuation) {
    // console.log('Object Created.');

    if(!configuation) {
      configuation = packageJson.config.server.database;
    }

    database = monk(configuation.name);
    // console.log('database', database);
  }();

  this.getDatabase = function() {
    return database;
  }

  this.setDatabase = function(data) {
    database = monk(configuation.name);
  }

  this.collection = function(data) {
    return wrap(database.get(configuation.name));
  }

};

module.exports = application;
