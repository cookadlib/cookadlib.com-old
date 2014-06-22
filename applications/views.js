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
    html: 'underscore'
  }
});

function *list() {
  this.body = yield render('recipes/create', { todos: 'todos' });
}

app.get('/', function *(next) {
  yield next;
  this.body = 'Welcome to the views application';
});
app.get('/recipes/create', list);

module.exports = app;
