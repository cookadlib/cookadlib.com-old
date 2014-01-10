/**
 * Global adapter config
 * 
 * The `adapters` configuration object lets you create different global "saved settings"
 * that you can mix and match in your models.  The `default` option indicates which 
 * "saved setting" should be used if a model doesn't have an adapter specified.
 *
 * Keep in mind that options you define directly in your model definitions
 * will override these settings.
 *
 * For more information on adapter configuration, check out:
 * http://sailsjs.org/#documentation
 */
/*
module.exports.adapters = {

  // If you leave the adapter config unspecified 
  // in a model definition, 'default' will be used.
  'default': 'disk',

  // Persistent adapter for DEVELOPMENT ONLY
  // (data is preserved when the server shuts down)
  disk: {
    module: 'sails-disk'
  },

  // MySQL is the world's most popular relational database.
  // Learn more: http://en.wikipedia.org/wiki/MySQL
  myLocalMySQLDatabase: {

    module: 'sails-mysql',
    host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_MYSQL_USER',
    // Psst.. You can put your password in config/local.js instead
    // so you don't inadvertently push it up if you're using version control
    password: 'YOUR_MYSQL_PASSWORD', 
    database: 'YOUR_MYSQL_DB'
  }
};
*/
module.exports.adapters = {
  'default': 'mongo',

  // sails v.0.9.0
  mongo: {
    module   : 'sails-mongo',
    host     : 'localhost',
    port     : process.env.BOXEN_MONGODB_PORT,
    // user     : 'cookadlib',
    // password : 'cookadlib',
    database : 'cookadlib',

    // OR
    // module   : 'sails-mongo',
    // url      : 'mongodb://USER:PASSWORD@HOST:PORT/DB',

    // Replica Set (optional)
    // replSet: {
    //   servers: [
    //     {
    //       host: 'secondary1.localhost',
    //       port: 27017 // Will override port from default config (optional)
    //     },
    //     {
    //       host: 'secondary2.localhost',
    //       port: 27017
    //     }
    //   ],
    //   options: {} // See http://mongodb.github.io/node-mongodb-native/api-generated/replset.html (optional)
    // }
  }
};