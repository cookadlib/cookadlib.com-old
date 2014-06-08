/**
 * Uglify
 */
module.exports = {

	default: {
		options: {
			beautify: false,
			sourceMap: true,
			sourceMappingURL: '<%= package.config.path.source %>/scripts/main.map.js',
		},
		files: {
			'<%= package.config.path.source %>/scripts/main.js': [
				'<%= package.config.path.source %>/scripts/source/**/*.js'
			]
		}
	}

};
