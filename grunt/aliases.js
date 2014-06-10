module.exports = {

  'styles': [
    'mkdir:root',
    'mkdir:styles',
    'newer:scsslint',
    'compass', // does not work with grunt-newer
    // 'newer:csslint', // sooooooo many errors
    'newer:rename:styles',
    'uncss'
  ],

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

  'scripts': [
    'mkdir:root',
    'mkdir:scripts',
    'newer:jshint',
    'newer:uglify',
    'newer:rename:scripts'
  ],

  'build': [
    'html',
    'styles',
    'scripts',
    'images',
    'fonts',
    'misc',
    'notify:build'
  ],

  'serve': [
    'connect:livereload',
    'open:server',
    'notify:serve',
    'watch'
  ],

  'default': [
    'build',
    'serve'
  ]

};
