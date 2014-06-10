// Recommended that you .use() the koa-logger middleware near the top to "wrap" all subsequent middleware.
var logger = require('koa-logger');

// var app = require('koa')();

// Run Koa app
var koa = require('koa');
var app = koa();

var compress = require('koa-compress')();
var router = require('koa-router');
var serve = require('koa-static');
var views = require('koa-views');

var db = require('monk')('localhost/data/db');

var open = require("open");

var packageJson = require('./package.json');

// logger
// app.use(function *(next) {
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   console.log('%s %s - %s', this.method, this.url, ms);
// });

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
app.use(router(app));

// response
// app.use(function *(){
//   this.body = 'Hello World';
// });

// this must come after last app.use()
var server = require('http').Server(app.callback());
var socket = require('socket.io')(server);

// routes can go both before and after but app.use(router(app)); must be before
app.get('/', function *(next) {
  yield this.render('index', {
    my: 'data'
  });
});

// middlewares

// Socket.io
socket.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('a user disconnected');
  });

  socket.emit('news', {
    hello: 'world'
  });

  socket.on('chat message', function(message){
    console.log('message: ' + message);
  });

});

// Monk
var users = db.get('users')

users.index('name last');

users.insert({
  name: 'Tobi', bigdata: {}
});

users.find({
  name: 'Loki' }, '-bigdata', function () {
  // exclude bigdata field
});

users.find({}, function (err, docs) {
  console.log(err, docs);
});

//Run servers
server.listen(packageJson.config.server.socketio.port); //socket.io

// main app server
app.listen(packageJson.config.server.koa.port); //koa

// open a new browser instance
open('http://localhost:' + packageJson.config.server.koa.port);
// open('http://www.google.com');

console.info('Koa now running on http://localhost:' + packageJson.config.server.koa.port);
console.info('Socket.io now running on http://localhost:' + packageJson.config.server.socketio.port);
