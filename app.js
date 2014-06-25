var packageJson = require(__dirname + '/package.json');

var open = require('open');
var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var router = require('koa-router');
var session = require('koa-session');
var serve = require('koa-static');

var app = koa();

var viewsApp = require(__dirname + '/applications/views');
var apiApp = require(__dirname + '/applications/api');
var databaseApp = require(__dirname + '/applications/database');
var socketApp = require(__dirname + '/applications/socket');

// wrap subsequent middleware in a logger
app.use(logger());

// use logger
app.use(function *(next) {
  'use strict';
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// use koa-router
app.use(router(app));

// mount applications
app.use(mount('/', viewsApp));
app.use(mount('/api', apiApp));
app.use(mount('/database', databaseApp));
app.use(mount('/socket', socketApp));

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
  app.listen(packageJson.config.server.koa.port);
}

open('http://localhost:' + packageJson.config.server.koa.port);
console.info('main Koa application now running on http://localhost:' + packageJson.config.server.koa.port);
