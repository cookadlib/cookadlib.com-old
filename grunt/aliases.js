module.exports = {

  'fonts': [
    'mkdir:root',
    'newer:copy:fonts'
  ],

  'html': [
    'mkdir:root',
    'vulcanize',
    'useminPrepare',
    // 'newer:copy:html', // use htmlmin instead
    'htmlmin', // does not work with grunt-newer
    'usemin'
  ],

  'images': [
    'mkdir:root',
    'newer:copy:icons',
    'newer:imagemin',
    'newer:svgmin'
  ],

  'misc': [
    'mkdir:root',
    'newer:copy:dotFiles'
  ],

  'node': [
    'newer:jshint:node'
  ],

  'scripts': [
    'mkdir:root',
    'mkdir:scripts',
    // 'newer:concat',
    'newer:jshint:scripts',
    // 'newer:uglify',
    'uglify',
    'newer:rename:scripts'
  ],

  'styles': [
    'mkdir:root',
    'mkdir:styles',
    'newer:scsslint',
    'compass', // does not work with grunt-newer
    // 'newer:csslint', // sooooooo many errors
    'newer:rename:styles',
    // 'uncss'
  ],

  'build': [
    // 'node',
    'html',
    'styles',
    'scripts',
    'images',
    'fonts',
    'misc',
    'notify:build'
  ],

  'serve': [
    // 'connect:livereload',
    'forever:app:start',
    'open:server',
    'notify:serve',
    'watch'
  ],

  'stop': [
    'forever:app:stop'
  ],

  'default': [
    'build',
    'serve'
  ],

};
