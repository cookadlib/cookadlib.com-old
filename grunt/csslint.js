/**
 * Lint CSS
 */
module.exports = {

	options: {
		csslintrc: '.csslintrc'
	},

	default: {
		src:  [
			'<%= package.config.path.build %>/styles/*.css',
			'!<%= package.config.path.build %>/styles/library.css',
			'!<%= package.config.path.build %>/styles/*.tidy.css'
		]
	}

};
