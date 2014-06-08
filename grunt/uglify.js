/**
 * Uglify
 */
module.exports = {

	default: {
		options: {
			beautify: true,
			sourceMap: true,
			sourceMappingURL: '<%= package.config.path.build %>/scripts/main.map.js',
		},
		files: {
			'<%= package.config.path.build %>/scripts/main.js': [
				'<%= package.config.path.source %>/scripts/source/**/*.js'
			]
		}
	}

};
