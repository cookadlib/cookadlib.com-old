var serve = require('koa-static');
var koa = require('koa');
var app = koa();

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

// static file serve
app.use(serve(__dirname + '/dist'), {
    defer: true
});

app.listen(9000);
