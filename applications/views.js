var packageJson = require(__dirname + '/../package.json');

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

function *index(next) {
  this.body = yield render('index', {
    bodyClass: 'index'
  });
}

function *list(next) {
  this.body = yield render('recipe/create', {
    bodyClass: 'recipe create'
  });
}

app.get('/', index);
app.get('/recipe/create', list);

module.exports = app;
