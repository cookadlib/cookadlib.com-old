var packageJson = require(__dirname + '/package.json');

// Recommended that you .use() the koa-logger middleware near the top to "wrap" all subsequent middleware.
// var logger = require('koa-logger');

// var app = require('koa')();

// Run Koa app
var koa = require('koa');
var app = koa();

// var compress = require('koa-compress')();
var mount = require('koa-mount');
// var router = require('koa-route');
var router = require('koa-router');
var serve = require('koa-static');
var views = require('koa-views');
var livereload = require('koa-livereload');
var open = require('open');
// var co = require('co');
var monk = require('monk');
var wrap = require('co-monk');

// var db = monk('localhost/data/db');
var db = monk('localhost/starwars');

// database collections
// var users = wrap(db.get('users'));
var books = wrap(db.get('books'));

var routes = require(__dirname + '/routes');
// console.log('routes', routes);

// logger
// app.use(function *(next) {
//   var start = new Date;
//   yield next;
//   var ms = new Date - start;
//   console.log('%s %s - %s', this.method, this.url, ms);
// });

// Monk
// console.log('users', users);

function *list() {
  'use strict';
  var res = yield books.find({});
  this.body = res;
}

function *show_route(title) {
  'use strict';
  title = decodeURI(title);
  var res = yield books.find({title: title});
  this.body = res;
}

function *show_router(next) {
  'use strict';
  var res = yield books.find({title: this.params.title});
  this.body = res;
}

// this middleware can be used with a LiveReload server e.g. grunt-contrib-watch.
app.use(livereload({
  port : packageJson.config.server.livereload.port
}));

// serve static files
app.use(serve(__dirname + '/' + packageJson.config.path.build), {
  defer: true
}); // true web root
app.use(serve(__dirname + '/' + packageJson.config.path.source), {
  defer: true
}); // to save copying bower_components, SASS files, etc.

// use jade
app.use(views(__dirname +'/views', 'jade', {}));

// use koa-router
app.use(router(app));

// routes can go both before and after but app.use(router(app)); must be before
app.get('/', function *(next) {
  yield this.render('index', {
    my: 'data'
  });
});
app.get('/book', list);
app.get('/book/:title', show_router);

var APIv1 = new router();
var APIv2 = new router();

APIv1.get('/sign-in', function *() {
  // ...
});

APIv2.get('/sign-in', function *() {
  // ...
});

app
  .use(mount('/v1', APIv1.middleware()))
  .use(mount('/v2', APIv2.middleware()));

// use koa-route
// app.use(router.get('/book', list));
// app.use(router.get('/book/:title', show_route));
// app.use(router.get('/', list));

// reference Express routes
// app.use(route.get('/', routes.index));
// app.use(route.get('/partials/:name', routes.partials));
// app.use(route.get('*', routes.index));

// response
// app.use(function *() {
//   this.body = 'Hello World';
// });

// this must come after last app.use()
var server = require('http').Server(app.callback());
var socket = require('socket.io')(server);

// middlewares

// Socket.io
socket.on('connection', function(socket) {
  'use strict';
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('a user disconnected');
  });

  socket.emit('event', {
    hello: 'world'
  });

  socket.on('confirmation', function(message) {
    console.log('message: ' + message);
  });

});

// export module
module.exports = {
  foo: function () {
    console.log('foo!');
  },
  bar: function () {
    console.log('bar!');
  }
};


// api.foo();

//Run servers
server.listen(packageJson.config.server.socketio.port); //socket.io

// main app server
// app.listen(packageJson.config.server.koa.port); //koa
if (!module.parent) {
  app.listen(packageJson.config.server.koa.port); //koa
}

// open a new browser instance
open('http://localhost:' + packageJson.config.server.koa.port);
// open('http://www.google.com');

console.info('Koa now running on http://localhost:' + packageJson.config.server.koa.port);
console.info('Socket.io now running on http://localhost:' + packageJson.config.server.socketio.port);
