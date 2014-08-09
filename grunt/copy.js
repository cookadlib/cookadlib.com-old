/**
 * Copy static resources
 */
module.exports = {

	dotFiles: {
		files: [
			{
				dot: true,
				expand: true,
				flatten: false,
				cwd: '<%= package.config.path.source %>',
				src: [
					'.htaccess',
					'.htpasswd'
				],
				dest: '<%= package.config.path.build %>',
				filter: 'isFile'
			}
		]
	},

	fonts: {
		files: [
			{
				expand: true,
				flatten: false,
				cwd: '<%= package.config.path.source %>/fonts',
				src: [
					'**/*'
				],
				dest: '<%= package.config.path.build %>/fonts',
				filter: 'isFile'
			},
			{
				expand: true,
				flatten: false,
				cwd: '<%= package.config.path.source %>/bower_components/bootstrap-sass-official/assets/fonts',
				src: [
					'**/*'
				],
				dest: '<%= package.config.path.build %>/bower_components/bootstrap-sass-official/assets/fonts',
				filter: 'isFile'
			}
		]
	},

	html: {
		files: [
			{
				expand: true,
				flatten: false,
				cwd: '<%= package.config.path.source %>',
				src: [
					'**/*.html',
					'!bower_components/*'
				],
				dest: '<%= package.config.path.build %>',
				filter: 'isFile'
			}
		]
	},

	icons: {
		files: [
			{
				expand: true,
				flatten: false,
				cwd: '<%= package.config.path.source %>/images',
				src: [
					'**/*.ico'
				],
				dest: '<%= package.config.path.build %>/images',
				filter: 'isFile'
			}
		]
	},

	scripts: {
		files: [
			{
				expand: true,
				flatten: false,
				cwd: '<%= package.config.path.source %>/scripts',
				src: [
					'**/*.js'
				],
				dest: '<%= package.config.path.build %>/scripts',
				filter: 'isFile'
			}
		]
	}

};
