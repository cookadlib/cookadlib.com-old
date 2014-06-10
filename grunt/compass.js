/**
 * Compile Sass
 */
module.exports = {

  options: {
    config: 'config.rb',
    debugInfo: false,
    outputStyle: 'nested',
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
