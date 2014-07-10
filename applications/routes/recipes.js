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

function *list(next) {
  var settings = {
    bodyClass: 'recipe create'
  };

  _.merge(settings, defaults);

  this.body = yield render('recipe/create', settings);
}

// use koa-router
app.use(router(app));

app.get('/', list);
app.get('/create', list);
app.post('/create', list);

module.exports = app;
