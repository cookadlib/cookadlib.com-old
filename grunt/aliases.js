module.exports = {

	'css': [
		'mkdir',
		'compass', // does not work with grunt-newer
		'newer:scsslint',
		// 'newer:csslint', // sooooooo many errors
		'uncss'
	],

	'fonts': [
		'mkdir',
		'newer:copy:fonts'
	],

	'html': [
		'mkdir',
		'vulcanize',
		'useminPrepare',
		// 'newer:copy:html', // use htmlmin instead
		'htmlmin', // does not work with grunt-newer
		'usemin'
	],

	'images': [
		'mkdir',
		'newer:copy:icons',
		'newer:imagemin',
		'newer:svgmin'
	],

	'misc': [
		'mkdir',
		'newer:copy:dotFiles'
	],

	'scripts': [
		'mkdir',
		'newer:jshint',
		'newer:uglify'
	],

	'build': [
		'html',
		'css',
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
