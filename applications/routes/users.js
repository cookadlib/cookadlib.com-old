// var koa = require('koa');
var router = require('koa-router');
//
// var app = koa();

// use koa-router
// app.use(router(app));

var routes = new router();

function *list(next) {
// routes.list = function *(next) {
  var settings = {
    bodyClass: 'user create'
  };

  _.merge(settings, defaults);

  this.body = yield render('user/create', settings);
}

// app.get('/user/create', list);
// app.post('/user/create', list);
routes.get('/user/create', list);
routes.post('/user/create', list);

// module.exports = app;
module.exports = routes;
