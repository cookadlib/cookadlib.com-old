var packageJson = require(__dirname + '/../package.json');

var co = require('co');
var wrap = require('co-monk');
var monk = require('monk');

var application = function(configuration) {

  // private property
  var database;

  // private constructor
  var __construct = function(configuration) {
    // console.log('Object Created.');
    var connectionString = '';

    if(!configuration) {
      configuration = packageJson.config.server.database;
    }

    connectionString += configuration.protocol;
    connectionString += '://';
    connectionString += configuration.credentials.username;
    connectionString += ':';
    connectionString += configuration.credentials.password;
    connectionString += '@';
    connectionString += configuration.host;
    connectionString += ':';
    connectionString += configuration.port;
    connectionString += '/';
    connectionString += configuration.name;
    // e,g, mongodb://nodejitsu:31446693dac807d62cbe52f522408bf6@troup.mongohq.com:10026/nodejitsudb1124257398

    // console.log('connectionString1', 'mongodb://nodejitsu:31446693dac807d62cbe52f522408bf6@troup.mongohq.com:10026/nodejitsudb1124257398');
    // console.log('connectionString2', connectionString);

    database = monk(connectionString);
    // console.log('database', database);
  }();

  this.collection = function(collection) {
    return wrap(database.get(collection));
  }

};

module.exports = application;
