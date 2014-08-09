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
  // var start = new Date;
  yield next;
  // var ms = new Date - start;
  // console.log('%s %s - %s', this.method, this.url, ms);
});

var render = views('source/views', {
  cache: true,

  map: {
    html: 'ejs'
  }
});

var defaults = {
  packageJson: packageJson,
  ngApp: 'ingredients',
  bodyClass: 'ingredients clear-header'
};

// use koa-router
app.use(router(app));

function *index(next) {
  var settings = {

  };

  _.merge(settings, defaults);

  this.body = yield render('ingredients/index', settings);
}

function *edit(next) {
  var settings = {
    bodyClass: 'ingredients edit clear-header'
  };

  _.merge(settings, defaults);

  this.body = yield render('ingredients/edit', settings);
}

app.get('/', index);
app.get('/add', edit);
app.get('/edit', edit);
// app.get(/^([^.]+)$/, index); //matches everything without an extension

module.exports = app;
