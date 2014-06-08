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
					dir: '<%= package.config.path.source %>'
				},
				middleware: function (connect, options) { // connect, options, middlewares
					return [
						connectLivereload(options.data.port),
						mountFolder(connect, '.tmp'),
						mountFolder(connect, options.data.dir)
					];
				},
        onCreateServer: function(server) { // server, connect, options
					server.get('/', function(req, res) {
						console.log(req, res);
					  res.sendfile('index.html');
					});
          var io = require('socket.io').listen(server);

          io.sockets.on('connection', function(socket) { // socket
            // do something with socket
						console.log('a user connected');

						socket.on('chat message', function(message) { //message
							console.log('message: ' + message);
						});
          });

					io.socket.on('disconnect', function() { // socket
						console.log('user disconnected');
					});
        }
			}
		},

		test: {
			options: {
				data: {
					dir: '<%= package.config.path.source %>'
				},
				middleware: function (connect, options) { // connect, options, middlewares
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
				middleware: function (connect, options) { // connect, options, middlewares
					return [
						mountFolder(connect, options.data.dir)
					];
				}
			}
		}

	};

};
