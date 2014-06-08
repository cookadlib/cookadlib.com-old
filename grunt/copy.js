/**
 * Copy Static Resources
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
					'**/.*'
				],
				dest: '<%= package.config.path.build %>',
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
					'**/*.html'
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

	fonts: {
		files: [
			{
				expand: true,
				flatten: false,
				cwd: '<%= package.config.path.source %>/fonts',
				src: [
					'**/*.ico'
				],
				dest: '<%= package.config.path.build %>/fonts',
				filter: 'isFile'
			}
		]
	}

};
