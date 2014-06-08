/**
 * Connect
 */
module.exports = function (grunt) {

	var connectLivereload = function(port) {
		// console.log('port', port);
		return require('connect-livereload')({
			port: port
		});
	};

	var mountFolder = function(connect, dir) {
		// console.log('path', dir);
		return connect.static(require('path').resolve(dir));
	};

	return {

		options: {
			hostname: '*',
			port: '<%= package.config.server.connect.port %>',
			base: '<%= package.config.path.build %>'
		},

		basic: {
			options: {
				keepalive: true
			}
		},

		livereload: {
			options: {
				// keepalive: true,
				data: {
					dir: '<%= package.config.path.source %>',
					port: '<%= package.config.path.port %>'
				},
				middleware: function (connect, options, middlewares) {
					'use strict';
					return [
						connectLivereload(options.data.port),
						mountFolder(connect, '.tmp'),
						mountFolder(connect, options.data.dir)
					];
				},
        onCreateServer: function(server, connect, options) {
          var io = require('socket.io').listen(server);
          io.sockets.on('connection', function(socket) {
            // do something with socket
          });
        }
			}
		},

		test: {
			options: {
				data: {
					dir: '<%= package.config.path.source %>',
					port: '<%= package.config.path.port %>'
				},
				middleware: function (connect, options, middlewares) {
					'use strict';
					return [
						mountFolder(connect, '.tmp'),
						mountFolder(connect, 'test'),
						mountFolder(connect, options.data.dir)
					];
				}
			}
		},

		dist: {
			options: {
				data: {
					dir: '<%= package.config.path.build %>',
					port: '<%= package.config.path.port %>'
				},
				middleware: function (connect, options, middlewares) {
					'use strict';
					return [
						mountFolder(connect, options.data.dir)
					];
				}
			}
		}

	};

};
