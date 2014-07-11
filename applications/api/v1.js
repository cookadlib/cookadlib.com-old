var packageJson = require(__dirname + '/../../package.json');

var co = require('co');
var koa = require('koa');
var logger = require('koa-logger');
var router = require('koa-router');
var database = require(__dirname + '/../database');

var app = koa();
var db = new database('localhost/starwars');
var books = db.collection('books');

// logger
app.use(function *(next) {
  // var start = new Date;
  yield next;
  // var ms = new Date - start;
  // console.log('%s %s - %s', this.method, this.url, ms);
});

var api = new router();

api.get('/', function *(next) {
  yield next;
  this.body = 'Welcome to the API v1 application';
});

api.get('/users', function *(next) {
  yield next;
  this.body = 'Welcome to the API v1 application users route';
});

api.get(/^([^.]+)$/, function *(next) {
  yield next;
  this.body = 'Welcome to the API v1 application 404 not found';
}); //matches everything without an extension

module.exports = api;
