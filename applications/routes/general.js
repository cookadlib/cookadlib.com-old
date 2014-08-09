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
  packageJson: packageJson,
  ngApp: 'general'
};

// use koa-router
app.use(router(app));

function getAllMethods(object) {
  console.log('in getAllMethods');
  return Object.getOwnPropertyNames(object).filter(function(property) {
    return typeof object[property] == 'function';
  });
}

function *index(next) {
  var settings = {
    bodyClass: 'home full-viewport-sections',
    sections: {
      showcase: {
        features: [
          {
            classes: 'col-sm-offset-1',
            figure: {
              classes: 'overlay',
              caption: {
                html: '<span>Image caption 1</span>',
                classes: 'overlay'
              },
              img: {
                src: 'http://lorempixel.com/240/180/food/1',
                alt: 'Food 1',
                title: 'Image title 1',
                classes: 'grayscale'
              }
            }
          },
          {
            classes: 'col-sm-offset-2',
            figure: {
              classes: 'overlay',
              caption: {
                html: '<span>Image caption 2</span>',
                classes: 'overlay'
              },
              img: {
                src: 'http://lorempixel.com/240/180/food/2',
                alt: 'Food 2',
                title: 'Image title 2',
                classes: 'grayscale'
              }
            }
          },
          {
            classes: 'col-sm-offset-2',
            figure: {
              classes: 'overlay',
              caption: {
                html: '<span>Image caption 3</span>',
                classes: 'overlay'
              },
              img: {
                src: 'http://lorempixel.com/240/180/food/3',
                alt: 'Food 3',
                title: 'Image title 3',
                classes: 'grayscale'
              }
            }
          }
        ]
      }
    }
  };

  _.merge(settings, defaults);

  this.body = yield render('home', settings);
}

function *error404(next) {
  var settings = {
    bodyClass: 'error error404'
  };

  _.merge(settings, defaults);

  console.log('app', app, getAllMethods(app));
  console.log('this.method', this.method, 'this.path', this.path);

  // if (app.match(this.method, this.path)) {
  if ('app.route', app.route) {
    console.log('app.match true');
    yield next
  } else {
    console.log('app.match false');
    // this.throw('404 / Not Found', 404)
    this.body = yield render('error404', settings);
    this.status = 404;
  }
}

app.get('/', index);
app.get(/^([^.]+)$/, error404); //matches everything without an extension

module.exports = app;
