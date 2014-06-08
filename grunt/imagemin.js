/**
 * Image minification
 */
module.exports = {

	default: {

		options: {
			optimizationLevel: 3
		},

		files: [
			{
				expand: true,
				cwd: '<%= package.config.path.source %>/images',
				src: ['**/*.{gif,jpg,jpeg,png}'],
				dest: '<%= package.config.path.build %>/images'
			}
		]

	}

};
