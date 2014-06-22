var packageJson = require(__dirname + '/package.json');

var open = require('open');
var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var router = require('koa-router');
var session = require('koa-session');
var views = require('koa-views');

var api = require(__dirname + '/applications/api');
var database = require(__dirname + '/applications/database');
var socket = require(__dirname + '/applications/socket');

var app = koa();
var demo = koa();

// logger
app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// use koa-router
app.use(router(app));

// app.get('/', function *(next) {
//   yield next;
//   this.body = 'Welcome to the main application';
// });

demo.use(function *(next){
  yield next;
  this.body = 'Welcome to the demo application';
});

// mount applications
app.use(mount('/demo', demo));
app.use(mount('/api', api));
app.use(mount('/database', database));
app.use(mount('/socket', socket));

// setup session
app.keys = ['secrets'];
app.use(session());

// serve views
app.use(views({
  cache: true,

  map: {
    html: 'underscore'
  }
}));

app.use(function* (next) {
  var n = this.session.views || 0;
  this.session.views = ++n;

  this.locals = {
    session: this.session
  };

  yield this.render('source/views/index', {
    user: 'John'
  });
});

// set koa to listen on specified port
if (!module.parent) {
  app.listen(packageJson.config.server.koa.port);
}

open('http://localhost:' + packageJson.config.server.koa.port);
console.info('main Koa application now running on http://localhost:' + packageJson.config.server.koa.port);
