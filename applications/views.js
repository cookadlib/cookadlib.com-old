var packageJson = require(__dirname + '/../package.json');

var _ = require('lodash');
var koa = require('koa');
var logger = require('koa-logger');
var router = require('koa-router');
var views = require('co-views');

var app = koa();

// logger
app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// use koa-router
app.use(router(app));

var render = views('source/views', {
  cache: true,

  map: {
    html: 'ejs'
  }
});

var defaults = {
  packageJson: packageJson
};

function *index(next) {
  var settings = {
    bodyClass: 'index'
  };

  _.merge(settings, defaults);

  this.body = yield render('index', settings);
}

function *list(next) {
  var settings = {
    bodyClass: 'recipe create'
  };

  _.merge(settings, defaults);

  this.body = yield render('recipe/create', settings);
}

app.get('/', index);
app.get('/recipe/create', list);
app.post('/recipe/create', list);

module.exports = app;
