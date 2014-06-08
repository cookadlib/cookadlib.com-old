/**
 * Watch
 */
module.exports = {

	options: {
		nospawn: true,
		livereload: true
	},

	livereload: {
		options: {
			livereload: '<%= package.config.server.livereload.port %>'
		},
		files: [
			'<%= package.config.path.source %>/**/*',
			'!<%= package.config.path.source %>/bower_components/**/*'
		]
	},

	html: {
		files: [
			'<%= package.config.path.source %>/**/*.html',
			'!<%= package.config.path.source %>/bower_components/**/*'
		],
		tasks: [
			'exec:setMaxfiles',
			'newer:copy:html'
		]
	},

	css: {
		files: [
			'<%= package.config.path.source %>/styles/sass/**/*.scss',
			'!<%= package.config.path.source %>/bower_components/**/*'
		],
		tasks: [
			'exec:setMaxfiles',
			'css'
		]
	},

	fonts: {
		files: [
			'<%= package.config.path.source %>/fonts/**/*',
			'!<%= package.config.path.source %>/bower_components/**/*'
		],
		tasks: [
			'exec:setMaxfiles',
			'fonts'
		]
	},

	icons: {
		files: [
			'<%= package.config.path.source %>/img/**/*.ico',
			'!<%= package.config.path.source %>/bower_components/**/*'
		],
		tasks: [
			'exec:setMaxfiles',
			'newer:copy:icons'
		]
	},

	scripts: {
		files: [
			'Gruntfile.js',
			'grunt/*.js',
			'<%= package.config.path.source %>/scripts/**/*.js',
			'!<%= package.config.path.source %>/bower_components/**/*'
		],
		tasks: [
			'exec:setMaxfiles',
			'scripts'
		]
	},

	rasterImages: {
		files: [
			'<%= package.config.path.source %>/img/**/*.{gif,jpg,jpeg,png}',
			'!<%= package.config.path.source %>/bower_components/**/*'
		],
		tasks: [
			'exec:setMaxfiles',
			'newer:imagemin'
		]
	},

	vectorImages: {
		files: [
			'<%= package.config.path.source %>/img/**/*.svg',
			'!<%= package.config.path.source %>/bower_components/**/*'
		],
		tasks: [
			'exec:setMaxfiles',
			'newer:svgmin'
		]
	}

};
