/**
 * Make new build dir
 */
module.exports = {

	root: {
		options: {
			mode: '0755',
			create: [ '<%= package.config.path.build %>' ]
		}
	},

	scripts: {
		options: {
			mode: '0755',
			create: [ '<%= package.config.path.build %>/scripts' ]
		}
	},

	styles: {
		options: {
			mode: '0755',
			create: [ '<%= package.config.path.build %>/styles' ]
		}
	}

};
