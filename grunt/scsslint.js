/**
 * Lint SCSS
 */
module.exports = {

  options: {
    bundleExec: true,
    colorizeOutput: true,
    config: '.scss-lint.yml',
    reporterOutput: 'scss-lint-report.xml'
  },

  default: {
    src:  [
      '<%= package.config.path.source %>/styles/**/*.scss',
      '!<%= package.config.path.source %>/styles/vendor/*.scss'
    ]
  }

};
