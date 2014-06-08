/**
 * Vulcanize
 */
module.exports = {

	default: {
		options: {},
		files: {
			'<%= package.config.path.build %>/build.html': ['<%= package.config.path.source %>/index.html'],
		}
	}

};
