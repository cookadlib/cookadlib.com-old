var packageJson = require(__dirname + '/../package.json');

var _ = require('lodash');
var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var router = require('koa-router');
var views = require('co-views');

var app = koa();

var routeModules = [];
routeModules.general = require(__dirname + '/routes/general');
routeModules.ingredients = require(__dirname + '/routes/ingredients');
routeModules.recipes = require(__dirname + '/routes/recipes');
routeModules.users = require(__dirname + '/routes/users');

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
  packageJson: packageJson
};

// use koa-router
app.use(router(app));

app.use(mount('/ingredients', routeModules.ingredients));
app.use(mount('/recipes', routeModules.recipes));
app.use(mount('/users', routeModules.users));
app.use(mount('/', routeModules.general)); // contains catch-all rule so mount last
// app.use(mount('/', routeModules.error));

module.exports = app;
