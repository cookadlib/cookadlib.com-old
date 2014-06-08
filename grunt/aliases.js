module.exports = {

	'css': [
		'compass', //does not work with grunt-newer
		'newer:scsslint',
		'newer:csslint',
		'uncss'
	],

	'fonts': [
		'newer:copy:fonts'
	],

	'html': [
		'vulcanize',
		'useminPrepare',
		// 'newer:copy:html',
		'newer:htmlmin',
		'usemin'
	],

	'images': [
		'newer:copy:icons',
		'newer:imagemin',
		'newer:svgmin'
	],

	'misc': [
		'newer:copy:dotFiles'
	],

	'scripts': [
		'newer:jshint',
		'newer:uglify'
	],

	'build': [
		'css',
		'scripts',
		'images',
		'fonts',
		'html',
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
