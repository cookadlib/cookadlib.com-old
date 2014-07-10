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

function *index(next) {
  var settings = {
    bodyClass: 'index'
  };

  _.merge(settings, defaults);

  this.body = yield render('index', settings);
}

// use koa-router
app.use(router(app));

app.get('/', index);
app.get(/^([^.]+)$/, index); //matches everything without an extension

module.exports = app;
