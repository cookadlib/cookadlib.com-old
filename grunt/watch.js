/**
 * Watch
 */
module.exports = {

  options: {
    nospawn: true,
    // livereload: true
    // livereload: '<%= package.config.server.livereload.port %>'
  },

  fonts: {
    files: [
      '<%= package.config.path.source %>/fonts/**/*',
      '!<%= package.config.path.source %>/bower_components/**/*'
    ],
    tasks: [
      // 'exec:setMaxfiles',
      'fonts'
    ]
  },

  html: {
    files: [
      '<%= package.config.path.source %>/*.html',
      '<%= package.config.path.source %>/views/**/*.html',
      '!<%= package.config.path.source %>/bower_components/**/*'
    ],
    tasks: [
      // 'exec:setMaxfiles',
      'newer:copy:html',
      'forever:app:restart'
    ]
  },

  icons: {
    files: [
      '<%= package.config.path.source %>/images/**/*.ico',
      '!<%= package.config.path.source %>/bower_components/**/*'
    ],
    tasks: [
      // 'exec:setMaxfiles',
      'newer:copy:icons'
    ]
  },

  livereload: {
    options: {
      livereload: '<%= package.config.server.livereload.port %>'
    },
    files: [
      '<%= package.config.path.build %>/**/*.*',
      '!<%= package.config.path.source %>/bower_components/**/*'
    ]
  },

  node: {
    options: {
      reload: true
    },
    files: [
      'app.js',
      'applications/**/*.js',
      'Gruntfile.js',
      'grunt/*.js'
    ],
    tasks: [
      // 'exec:setMaxfiles',
      'node',
      'forever:app:restart'
    ]
  },

  rasterImages: {
    files: [
      '<%= package.config.path.source %>/images/**/*.{gif,jpg,jpeg,png}',
      '!<%= package.config.path.source %>/bower_components/**/*'
    ],
    tasks: [
      // 'exec:setMaxfiles',
      'newer:imagemin'
    ]
  },

  browser: {
    files: [
      '<%= package.config.path.source %>/scripts/**/*.js',
      '!<%= package.config.path.source %>/bower_components/**/*'
    ],
    tasks: [
      // 'exec:setMaxfiles',
      'newer:jshint:browser',
      'uglify:browser',
      'newer:rename:browserScripts'
    ]
  },

  styles: {
    files: [
      '<%= package.config.path.source %>/styles/**/*.scss',
      '!<%= package.config.path.source %>/bower_components/**/*'
    ],
    tasks: [
      // 'exec:setMaxfiles',
      'styles'
    ]
  },

  vectorImages: {
    files: [
      '<%= package.config.path.source %>/images/**/*.svg',
      '!<%= package.config.path.source %>/bower_components/**/*'
    ],
    tasks: [
      // 'exec:setMaxfiles',
      'newer:svgmin'
    ]
  },

  vendorScripts: {
    files: [
      '<%= package.config.path.source %>/bower_components/*/*.js' //only 1 level deep to avoid watching too many files
    ],
    tasks: [
      // 'exec:setMaxfiles',
      'uglify:vendor',
      'newer:rename:vendorScripts'
    ]
  }

};
