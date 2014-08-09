/**
 * Compile Sass
 */
module.exports = {

  options: {
    config: 'config.rb',
    debugInfo: false,
    outputStyle: 'nested',
    sourcemap: true
    // sourceMapIn: '<%= package.config.path.source %>/styles/*.scss'
  },

  default: {
    options: {
      specify: [
        '<%= package.config.path.source %>/styles/*.scss'
      ]
    }
  }

};
