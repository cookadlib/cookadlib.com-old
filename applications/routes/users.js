var packageJson = require(__dirname + '/../../package.json');

var _ = require('lodash');
var koa = require('koa');
var router = require('koa-router');
var views = require('co-views');

var app = koa();

// use koa-router
app.use(router(app));

// logger
app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

var render = views('source/views', {
  cache: true,

  map: {
    html: 'ejs'
  }
});

var defaults = {
  packageJson: packageJson
};

// use koa-router
app.use(router(app));

function *index(next) {
  var settings = {
    bodyClass: 'index'
  };

  _.merge(settings, defaults);

  this.body = yield render('users/index', settings);
}

function *list(next) {
  var settings = {
    bodyClass: 'users create'
  };

  _.merge(settings, defaults);

  this.body = yield render('users/create', settings);
}

app.get('/', index);
app.get('/create', list);
app.post('/create', list);
app.get(/^([^.]+)$/, index); //matches everything without an extension

module.exports = app;
