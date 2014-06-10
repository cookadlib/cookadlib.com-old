/**
 * Connect
 */
module.exports = function () {
	'use strict';

	var connectLivereload = function(port) {
		// console.log('port', port);
		return require('connect-livereload')({
			port: port
		});
	};

	var mountFolder = function(connect, dir) {
		console.log('path', dir);
		return connect.static(require('path').resolve(dir));
	};

	return {

		options: {
			hostname: '*',
			base: '<%= package.config.path.build %>',
			port: '<%= package.config.server.connect.port %>',
			data: {
				path: {
					source: '<%= package.config.path.source %>',
					build: '<%= package.config.path.build %>'
				},
				livereload: {
					port: '<%= package.config.server.livereload.port %>'
				}
			},
		},

		basic: {
			options: {
				keepalive: true
			}
		},

		livereload: {
			options: {
				// keepalive: true,
				middleware: function (connect, options) { // connect, options, middlewares
					// console.log(options);
					return [
						connectLivereload(options.data.livereload.port),
						mountFolder(connect, '.tmp'),
						mountFolder(connect, options.data.path.build),
						mountFolder(connect, options.data.path.source)
					];
				},
        onCreateServer: function(server, connect, options) { // server, connect, options
					server.get('/', function(req, res) {
						// console.log(req, res);
					  res.sendfile('index.html');
					});
					console.log('options.data.path.build', options.data.path.source + '/scripts/source');

          var socket = require('socket.io').listen(server);

					// Socket.io
					socket.on('connection', function(socket) {
						console.log('a user connected');

						socket.on('disconnect', function() {
							console.log('a user disconnected');
						});

						socket.emit('event', {
							hello: 'world'
						});

						socket.on('confirmation', function(message) {
							console.log('message: ' + message);
						});

					});

        }
			}
		},

		test: {
			options: {
				middleware: function (connect, options) { // connect, options, middlewares
					return [
						mountFolder(connect, '.tmp'),
						mountFolder(connect, 'test'),
						mountFolder(connect, options.data.path.source)
					];
				}
			}
		},

		dist: {
			options: {
				middleware: function (connect, options) { // connect, options, middlewares
					return [
						mountFolder(connect, options.data.path.build)
					];
				}
			}
		}

	};

};
