/**
 * Make new build dir
 */
module.exports = {

	local: {
		options: {
			mode: '0755',
			create: [ '<%= package.config.path.build %>' ]
		}
	}

};
