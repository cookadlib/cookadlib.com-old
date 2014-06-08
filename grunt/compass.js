/**
 * Compile Sass
 */
module.exports = {

  options: {
    config: 'config.rb',
    outputStyle: 'nested',
    debugInfo: false,
    sourcemap: true,
  },

  default: {
    options: {
      specify: [
        '<%= package.config.path.source %>/styles/*.scss'
      ]
    }
  }

};
