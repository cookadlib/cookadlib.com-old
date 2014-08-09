/**
 * Autoprefixer parses CSS and adds vendor-prefixed CSS properties using the Can I Use database.
 */
module.exports = {

  options: {
    map: true
  },

  default: {
    src: [
      '<%= package.config.path.source %>/styles/*.css',
      '!<%= package.config.path.source %>/styles/library.css',
      '!<%= package.config.path.source %>/styles/*.tidy.css'
    ]
  }

};
