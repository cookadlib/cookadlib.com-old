/**
 * Replace text in files using strings, regexs or functions.
 */
module.exports = {

  flags: {
    src: ['<%= package.config.path.source %>/bower_components/flag-icon-css/css/*.css'],             // source files array (supports minimatch)
    dest: '<%= package.config.path.build %>/bower_components/flag-icon-css/css/',             // destination directory or file
    replacements: [{
      from: '../flags',
      to: '../bower_components/flag-icon-css/flags'
    }]
  }

};
