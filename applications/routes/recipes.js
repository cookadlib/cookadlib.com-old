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
  lang: 'en',
  packageJson: packageJson,
  ngApp: 'recipes'

  // bodyClass: 'recipes test clear-header' //fucking doesn't get overridden
};

// use koa-router
app.use(router(app));

function *index(next) {
  var settings = {
    bodyClass: 'recipes index clear-header'
  };

  _.merge(settings, defaults);

  this.body = yield render('recipes-index', settings);
}

function *create(next) {
  var settings = {
    bodyClass: 'recipes edit create clear-header'
  };

  _.merge(settings, defaults);

  this.body = yield render('recipes-edit', settings);
}

function *read(next) {
  var settings = {
    bodyClass: 'recipes read',
    originalUrl: this.originalUrl
  };

  var title = this.params.title;

  _.merge(settings, defaults);
  // console.log('settings', settings);
  // console.log('defaults', defaults);

  this.body = yield render('recipes-read', settings);
}

function *update(next) {
  var settings = {
    bodyClass: 'recipes edit update clear-header'
  };

  _.merge(settings, defaults);

  this.body = yield render('recipes-edit', settings);
}

function *remove(next) {

}

app.get('/', index);
app.get('/:title', read);
app.get('/create', create);
app.get('/edit', update);
// app.post('/create', edit);
// app.get(/^([^.]+)$/, index); //matches everything without an extension

module.exports = app;
