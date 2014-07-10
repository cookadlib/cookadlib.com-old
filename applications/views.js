var packageJson = require(__dirname + '/../package.json');

var _ = require('lodash');
var koa = require('koa');
var logger = require('koa-logger');
var router = require('koa-router');
var views = require('co-views');

var app = koa();

// var history = true; // pointless, on a fresh visit the header will never be set

// logger
app.use(function *(next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);

  // if(this.request.header['X-HTML5Mode'] !== 'true') { // pointless, on a fresh visit the header will never be set
  //   history = false;
  // }
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

// if(history) { // Send the index for all routes to support HTML5Mode
//   console.log('X-HTML5Mode === true');
//   app.get(/^([^.]+)$/, index); //matches everything without an extension
// } else { // Send content based on various routes
//   console.log('X-HTML5Mode === false');
//   app.get('/', index);
//   app.get('/recipe/create', list);
//   app.post('/recipe/create', list);
// }

app.get('/', index);
app.get('/recipe/create', list);
app.post('/recipe/create', list);
app.get(/^([^.]+)$/, index); //matches everything without an extension

module.exports = app;
