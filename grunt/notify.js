/*jshint camelcase: false */
/**
 * Notifications
 */
module.exports = {

	notify_hooks: {
		options: {
			enabled: true,
			max_jshint_notifications: 1, // maximum number of notifications from jshint output
		}
	},

	build: {
		options: {
			message: 'Build completed'
		}
	},

	serve: {
		options: {
			message: 'Server ready at http://localhost:<%= package.config.server.connect.port %>'
		}
	}

};
