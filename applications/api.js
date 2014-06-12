var packageJson = require(__dirname + '/../package.json');

var co = require('co');
var koa = require('koa');
var logger = require('koa-logger');
var mount = require('koa-mount');
var router = require('koa-router');

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

app.get('/', function *(next) {
  yield next;
  this.body = 'Welcome to the api application';
});

var database = require(__dirname + '/database');

var db = new database('localhost/starwars');
var books = db.collection('books');

function *list() {
  'use strict';
  var res = yield books.find({});
  this.body = res;
}

function *show(next) {
  'use strict';
  var res = yield books.find({title: this.params.title});
  this.body = res;
}

// app.get('/book', list);
// app.get('/book/:title', show);

var api = {

  book: {

    list: function *(next) {
      console.log(this.params);
      var res = yield books.find({_id: this.params.id});
      this.body = res;
    },

    read: function *(next) {
      var res = yield books.find({_id: this.params.id});
      this.body = res;
    }

  },

  v1: new router(),

  v2: new router()

};

app.get('/book', api.book.list);
// app.post('/book', api.book.create);
app.get('/book/:id', api.book.read);
// app.put('/book/:id', api.book.update);
// app.delete('/book/:id', api.book.delete);


// app.get('/:collection/:title', function *(next) {
//   'use strict';
//   console.log(this.params);
//   var collection = db.collection(this.params[collection]);
//   var res;
//   if(this.params.title) {
//     res = yield collection.find({title: this.params[title]});
//   } else {
//     res = yield collection.find({});
//   }
//
//   this.body = res;
// });

var APIv1 = new router();
var APIv2 = new router();

APIv1.get('/sign-in', function *() {
  // ...
});

APIv2.get('/sign-in', function *() {
  // ...
});


module.exports = app;
