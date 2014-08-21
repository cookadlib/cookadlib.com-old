var packageJson = require(__dirname + '/package.json');

// var open = require('open');
// var http = require('http');
var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var router = require('koa-router');
var session = require('koa-session');
var serve = require('koa-static');

var app = koa();

var applications = [];
applications.views = require(__dirname + '/applications/views');
applications.api = require(__dirname + '/applications/api');
applications.database = require(__dirname + '/applications/database');
applications.socket = require(__dirname + '/applications/socket');

// wrap subsequent middleware in a logger
app.use(logger()); // very verbose

// use logger
app.use(function *(next) {
  'use strict';
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms);

  console.log(this, this.request, this.response);
  console.log(this.request.header);
});

// use koa-router
app.use(router(app));

// mount applications
app.use(mount('/api', applications.api));
app.use(mount('/database', applications.database));
app.use(mount('/socket', applications.socket));
app.use(mount('/', applications.views));

// setup session
app.keys = ['secrets'];
app.use(session());

// serve static files
app.use(serve(__dirname + '/' + packageJson.config.path.build), {
  defer: true
}); // true web root
app.use(serve(__dirname + '/' + packageJson.config.path.source), {
  defer: true
}); // to save copying bower_components, SASS files, etc.

// set koa to listen on specified port
if (!module.parent) {
  app.listen(packageJson.config.server.koa.port); // The app.listen(...) method is simply sugar for the following:
  // http.createServer(app.callback()).listen(80);
  // http.createServer(app.callback()).listen(443);
}

// open('http://localhost:' + packageJson.config.server.koa.port);
console.info('main Koa application now running on http://localhost:' + packageJson.config.server.koa.port);
