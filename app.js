// Recommended that you .use() the koa-logger middleware near the top to "wrap" all subsequent middleware.
// var logger = require('koa-logger');

// var app = require('koa')();

// Run Koa app
var koa = require('koa');
var app = koa();

// var compress = require('koa-compress')();
// var router = require('koa-router');
var route = require('koa-route');
var serve = require('koa-static');
var views = require('koa-views');
var livereload = require('koa-livereload');

// var co = require('co');
var monk = require('monk');
var wrap = require('co-monk');
// var db = monk('localhost/data/db');
var db = monk('localhost/starwars');

// database collections
// var users = wrap(db.get('users'));
var books = wrap(db.get('books'));

var open = require('open');

var packageJson = require('./package.json');

// logger
// app.use(function *(next) {
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   console.log('%s %s - %s', this.method, this.url, ms);
// });

// Monk
// console.log('users', users);

function *list() {
  'use strict';
  var res = yield books.find({});
  this.body = res;
}

function *show(title) {
  'use strict';
  title = decodeURI(title);
  var res = yield books.find({title: title});
  this.body = res;
}

// this middleware can be used with a LiveReload server e.g. grunt-contrib-watch.
app.use(livereload({
  port : packageJson.config.server.livereload.port
}));

// serve static files
app.use(serve(__dirname + '/' + packageJson.config.path.build), {
  defer: true
}); // true web root
app.use(serve(__dirname + '/' + packageJson.config.path.source), {
  defer: true
}); // to save copying bower_components, SASS files, etc.

// use jade
app.use(views(__dirname +'/views', 'jade', {}));

// use koa-router
// app.use(router(app));

// routes can go both before and after but app.use(router(app)); must be before
// app.get('/', function *(next) {
//   yield this.render('index', {
//     my: 'data'
//   });
// });

// use koa-route
app.use(route.get('/book', list));
app.use(route.get('/book/:title', show));

// response
// app.use(function *() {
//   this.body = 'Hello World';
// });

// this must come after last app.use()
var server = require('http').Server(app.callback());
var socket = require('socket.io')(server);

// middlewares

// Socket.io
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

//Run servers
server.listen(packageJson.config.server.socketio.port); //socket.io

// main app server
// app.listen(packageJson.config.server.koa.port); //koa
if (!module.parent) {
  app.listen(packageJson.config.server.koa.port); //koa
}

// open a new browser instance
open('http://localhost:' + packageJson.config.server.koa.port);
// open('http://www.google.com');

console.info('Koa now running on http://localhost:' + packageJson.config.server.koa.port);
console.info('Socket.io now running on http://localhost:' + packageJson.config.server.socketio.port);
