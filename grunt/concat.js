/**
 * Concatenate vendor JavaScript libraries
 */
module.exports = {

  options: {
    separator: ';'
  },

  default: {
    src: [
      '<%= package.config.path.source %>/bower_components/jquery/dist/jquery.min.js',
      '<%= package.config.path.source %>/bower_components/socket.io-client/socket.io.js'
    ],
    dest: '<%= package.config.path.build %>/scripts/vendor.js'
  }

};
