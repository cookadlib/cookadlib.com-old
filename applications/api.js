var packageJson = require(__dirname + '/../package.json');

var co = require('co');
var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var router = require('koa-router');

var api = [];
api.v1 = require(__dirname + '/api/v1');
api.v2 = require(__dirname + '/api/v2');

var app = koa();

logger
app.use(function *(next) {
  // var start = new Date;
  yield next;
  // var ms = new Date - start;
  // console.log('%s %s - %s', this.method, this.url, ms);
});

// use koa-router
app.use(router(app));

app.use(mount('/v1', api.v1.middleware()));
app.use(mount('/v2', api.v2.middleware()));

app.redirect('/', '/api/v2'); // show info page instead

module.exports = app;
