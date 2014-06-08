/**
 * Lint JavaScript
 */
module.exports = {

	options: {
		jshintrc: '.jshintrc'
	},

	default: [
		'<%= package.config.path.source %>/scripts/**/*.js',
		'grunt/**/*.js'
	].concat('Gruntfile.js')

};
