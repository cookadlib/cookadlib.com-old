/**
 * Uglify
 */
module.exports = {

  options: {
    sourceMap: true
  },

  scripts: {

    options: {
      compress: false,
      mangle: false,
      sourceMap: true,
      sourceMappingURL: '<%= package.config.path.source %>/scripts/main.map'
    },

    files: {
      '<%= package.config.path.source %>/scripts/main.js': [
        '<%= package.config.path.source %>/scripts/source/**/*.js'
      ]
    }

  },

  vendor: {

    options: {
      // banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
      mangle: false,
      sourceMappingURL: '<%= package.config.path.source %>/scripts/vendor.map'
    },

    files: {
      '<%= package.config.path.source %>/scripts/vendor.js': [
        '<%= package.config.path.source %>/bower_components/jquery/dist/jquery.js',
        '<%= package.config.path.source %>/bower_components/socket.io-client/socket.io.js'
      ]
    }

  }

};
