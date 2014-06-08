var packageJson = require('./package.json');
var open = require("open");
var serve = require('koa-static');
// var app = require('koa')();
var koa = require('koa');
var app = koa();
var server = require('http').Server(app.callback());
var io = require('socket.io').listen(server);

// logger
app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// static file serve
var webRoot = __dirname + '/' + packageJson.config.path.build;
app.use(serve(webRoot), {
    defer: true
});

// response
// app.use(function *(){
//   this.body = 'Hello World';
// });

// middlewares
server.listen(packageJson.config.server.socketio.port); //socket.io

// main app server
app.listen(packageJson.config.server.koa.port); //koa

// open a new browser instance
open('http://localhost:' + packageJson.config.server.koa.port);
// open('http://www.google.com');
