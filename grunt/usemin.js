/**
 * usemin
 */
module.exports = {

  options: {
    dirs: ['<%= package.config.path.build %>']
  },
  html: ['<%= package.config.path.build %>/{,*/}*.html'],
  css: ['<%= package.config.path.build %>/styles/{,*/}*.css']

};
