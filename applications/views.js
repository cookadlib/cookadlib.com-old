var packageJson = require(__dirname + '/../package.json');

var _ = require('lodash');
var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var router = require('koa-router');
var views = require('co-views');

var app = koa();

var routeModules = [];
routeModules['home'] = require(__dirname + '/routes/home');
routeModules['recipes'] = require(__dirname + '/routes/recipes');
routeModules['users'] = require(__dirname + '/routes/users');

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

// var defaults = {
//   packageJson: packageJson
// };
//
// function *index(next) {
//   var settings = {
//     bodyClass: 'index'
//   };
//
//   _.merge(settings, defaults);
//
//   this.body = yield render('index', settings);
// }

// use koa-router
app.use(router(app));

app.use(mount('/recipes', routeModules['recipes']));
app.use(mount('/users', routeModules['users']));
app.use(mount('/', routeModules['home'])); // contains catch-all rule so mount last

// app.get('/', index);
// app.get(/^([^.]+)$/, index); //matches everything without an extension

module.exports = app;
