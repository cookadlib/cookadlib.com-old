/**
 * Rename resources
 */
module.exports = {

	scripts: {
		files: [
			{
				src: ['<%= package.config.path.source %>/scripts/vendor.js'],
				dest: '<%= package.config.path.build %>/scripts/vendor.js',
				filter: 'isFile'
			},
			{
				src: ['<%= package.config.path.source %>/scripts/vendor.js.map'],
				dest: '<%= package.config.path.build %>/scripts/vendor.js.map',
				filter: 'isFile'
			},
			{
				src: ['<%= package.config.path.source %>/scripts/main.js'],
				dest: '<%= package.config.path.build %>/scripts/main.js',
				filter: 'isFile'
			},
			{
				src: ['<%= package.config.path.source %>/scripts/main.js.map'],
				dest: '<%= package.config.path.build %>/scripts/main.js.map',
				filter: 'isFile'
			}
		]
	},

	styles: {
		files: [
			{
				src: ['<%= package.config.path.source %>/styles/library.css'],
				dest: '<%= package.config.path.build %>/styles/library.css',
				filter: 'isFile'
			},
			{
				src: ['<%= package.config.path.source %>/styles/screen.css'],
				dest: '<%= package.config.path.build %>/styles/screen.css',
				filter: 'isFile'
			},
			{
				src: ['<%= package.config.path.source %>/styles/print.css'],
				dest: '<%= package.config.path.build %>/styles/print.css',
				filter: 'isFile'
			},
			{
				src: ['<%= package.config.path.source %>/styles/library.css.map'],
				dest: '<%= package.config.path.build %>/styles/library.css.map',
				filter: 'isFile'
			},
			{
				src: ['<%= package.config.path.source %>/styles/screen.css.map'],
				dest: '<%= package.config.path.build %>/styles/screen.css.map',
				filter: 'isFile'
			},
			{
				src: ['<%= package.config.path.source %>/styles/print.css.map'],
				dest: '<%= package.config.path.build %>/styles/print.css.map',
				filter: 'isFile'
			}
		]
	}

};
