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
    // 'htmlmin', // does not work with grunt-newer
    'usemin'
  ],

  'images': [
    'mkdir:root',
    'newer:copy:flags',
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
    'newer:jshint:browser',
    // 'newer:uglify',
    'uglify',
    'newer:rename:browserScripts',
    'newer:rename:vendorScripts'
  ],

  'styles': [
    'mkdir:root',
    'mkdir:styles',
    'replace:flags',
    'newer:scsslint',
    'compass', // does not work with grunt-newer
    'newer:autoprefixer',
    'newer:csslint', // sooooooo many errors
    'newer:rename:styles'
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

  'start': [
    // 'connect:livereload',
    'forever:app:start',
    // 'open:server',
    'notify:serve'
  ],

  'stop': [
    'forever:app:stop'
  ],

  'default': [
    'build',
    'start',
    'watch'
  ]

};
