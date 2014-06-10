/**
 * Lint JavaScript
 */
module.exports = {

  options: {
    jshintrc: '.jshintrc'
  },

  node: [
    'app.js',
    'Gruntfile.js',
    'grunt/**/*.js'
  ].concat('Gruntfile.js'),

  scripts: [
    '<%= package.config.path.source %>/scripts/source/**/*.js'
  ].concat('Gruntfile.js')

};
