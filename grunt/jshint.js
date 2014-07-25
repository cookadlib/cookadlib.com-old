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

  browser: {
    options: {
      browser: true,
      globals: {
        $: true,
        document: true,
        jQuery: true
      }
    },
    files: {
      src: [
        '<%= package.config.path.source %>/scripts/source/**/*.js'
      ]
    },
  }

};
