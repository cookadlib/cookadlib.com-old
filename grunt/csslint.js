/**
 * Lint CSS
 */
module.exports = {

	options: {
		csslintrc: '.csslintrc'
	},

	default: {
		src:  [
			'<%= package.config.path.source %>/styles/*.css',
			'!<%= package.config.path.source %>/styles/library.css',
			'!<%= package.config.path.source %>/styles/*.tidy.css'
		]
	}

};
