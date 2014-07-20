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
      sourceMappingURL: '<%= package.config.path.source %>/scripts/main.js.map'
    },

    files: {
      '<%= package.config.path.source %>/scripts/main.js': [
        '<%= package.config.path.source %>/scripts/source/**/*.js',
        '!<%= package.config.path.source %>/scripts/source/_sample/**/*.js'
      ]
    }

  },

  vendor: {

    options: {
      // banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
      compress: false,
      mangle: false,
      sourceMappingURL: '<%= package.config.path.source %>/scripts/vendor.js.map'
    },

    files: {
      '<%= package.config.path.source %>/scripts/vendor.js': [
        // '<%= package.config.path.source %>/bower_components/jquery/dist/jquery.js',
        '<%= package.config.path.source %>/bower_components/modernizr/modernizr.js',
        '<%= package.config.path.source %>/bower_components/lodash/dist/lodash.compat.js',
        // '<%= package.config.path.source %>/bower_components/platform/platform.js',
        '<%= package.config.path.source %>/bower_components/angular/angular.js',
        '<%= package.config.path.source %>/bower_components/angular-route/angular-route.js',
        // '<%= package.config.path.source %>/bower_components/angular-ui-router/release/angular-ui-router.js',
        '<%= package.config.path.source %>/bower_components/restangular/dist/restangular.js',
        // '<%= package.config.path.source %>/bower_components/angular-dreamfactory/angular-dreamfactory.js',
        '<%= package.config.path.source %>/bower_components/socket.io-client/socket.io.js'
      ]
    }

  }

};
