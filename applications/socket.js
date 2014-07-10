var packageJson = require(__dirname + '/../package.json');

var co = require('co');
var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var router = require('koa-router');
var io = require('socket.io');

var app = koa();

// logger
// app.use(function *(next) {
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   console.log('%s %s - %s', this.method, this.url, ms);
// });

// use koa-router
app.use(router(app));

app.get('/', function *(next) {
  yield next;
  this.body = 'Welcome to the socket application';
});

// this must come after last app.use()
var server = require('http').Server(app.callback());
var socket = io(server);

socket.on('connection', function(socket) {
  'use strict';
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

//Run server
server.listen(packageJson.config.server.socketio.port); //socket.io

module.exports = app;
