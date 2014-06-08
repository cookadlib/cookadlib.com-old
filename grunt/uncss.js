/**
 * Uncss
 */
module.exports = {

	options: {
		// csspath: '<%= package.config.path.build %>/styles/',
		// htmlroot: '<%= package.config.url.build %>',
		ignoreSheets : [/fast.fonts.net/, /fonts.googleapis/, /bower_components/],
		report: 'min'
	},

	screen: {
		options: {
			stylesheets: ['styles/screen.css']
		},
		media: ['(min-width: 992px) screen'],
		files: {
			'<%= package.config.path.build %>/styles/screen.tidy.css': ['<%= package.config.path.build %>/*.html']
		}
	},

	print: {
		options: {
			stylesheets: ['styles/print.css']
		},
		media: ['(min-width: 992px) print'],
		files: {
			'<%= package.config.path.build %>/styles/print.tidy.css': ['<%= package.config.path.build %>/*.html']
		}
	},

	mobile: {
		options: {
			stylesheets: ['styles/screen.css']
		},
		media: ['(max-width: 767px) handheld'],
		files: {
			'<%= package.config.path.build %>/styles/mobile.tidy.css': ['<%= package.config.path.build %>/*.html']
		}
	},

	tabletPortrait: {
		options: {
			stylesheets: ['styles/screen.css']
		},
		media: ['(min-width: 768px) handheld and (max-width: 991px) handheld and (orientation: portrait)'],
		files: {
			'<%= package.config.path.build %>/styles/tablet-portrait.tidy.css': ['<%= package.config.path.build %>/index.html']
		}
	},

	tabletLandscape: {
		options: {
			stylesheets: ['styles/screen.css']
		},
		media: ['(min-width: 992px) handheld and (orientation: landscape)'],
		files: {
			'<%= package.config.path.build %>/styles/tablet-landscape.tidy.css': ['<%= package.config.path.build %>/*.html']
		}
	}

};
