var packageJson = require(__dirname + '/../../package.json');

var _ = require('lodash');
var co = require('co');
var parse = require('co-body');
var koa = require('koa');
var logger = require('koa-logger');
var request = require('koa-request');
var router = require('koa-router');
var rdfstore = require('rdfstore');
var should = require('should');
var database = require(__dirname + '/../database');

var app = koa();
var db = new database(packageJson.config.server.database, packageJson.config.server.database);
var users = db.collection('users');
var ingredients = db.collection('ingredients');


// logger
app.use(function *(next) {
  // var start = new Date;
  yield next;
  // var ms = new Date - start;
  // console.log('%s %s - %s', this.method, this.url, ms);
});

var api = new router();

function* freebaseSearch (query) {
  // example: 'https://www.googleapis.com/freebase/v1/topic/en/barack_obama?filter=/type/object/key&limit=1';

  var service_url = 'https://www.googleapis.com/freebase/v1/search';

  var parameters = {
    // domain: '/food/food',
    // '*': null,
    filter: '(any type:/food/food type:/biology/organism_classification type:/base/foodrecipes/recipe_ingredient)',
    key: packageJson.config.api.google.key,
    output:'(/biology/organism_classification/scientific_name:master /common/topic/description:master description:wikipedia /common/topic/image:wikipedia /common/topic/official_website:master /food/food/energy:master  /food/food/usda_id:master)',
    query: query,
    stemmed: 'true'
  };

  var querystring = '';
  _(parameters).forEach(function(value, key) {
    querystring += key + '=' + encodeURIComponent(value) + '&';
  });

  var url = service_url + '?' + querystring;

  var response = yield request(url);

  var info = JSON.parse(response.body);

  return info;
}

function* freebaseTopic (topicId) {
  // example: 'https://www.googleapis.com/freebase/v1/topic/en/barack_obama?filter=/type/object/key&limit=1';

  // topicId format: '/m/0d6lp'

  var service_url = 'https://www.googleapis.com/freebase/v1/topic';

  var parameters = {
    filter: 'suggest',
    key: packageJson.config.api.google.key,
    limit: '1'
  };

  var querystring = '';
  _(parameters).forEach(function(value, key) {
    querystring += key + '=' + encodeURIComponent(value) + '&';
  });

  var url = service_url + topicId + '?' + querystring;

  var response = yield request(url);

  var info = JSON.parse(response.body);

  return info;
}

function* freebaseMetawebQuery (name) {
  // example: https://www.googleapis.com/freebase/v1/mqlread?query=[{"type":"/food/food","name":"Pomelo","!/food/nutrition_fact/food":[{"*": null}]}]

  var service_url = 'https://www.googleapis.com/freebase/v1/mqlread';

  var parameters = {
    key: packageJson.config.api.google.key,
    query: '[{"type": "/food/food","name": "' + encodeURIComponent(name) + '","!/food/nutrition_fact/food": [{"*": null}]}]'
  };

  var querystring = '';
  _(parameters).forEach(function(value, key) {
    querystring += key + '=' + value + '&';
  });

  var url = service_url + '?' + querystring;

  var response = yield request(url);

  var info = JSON.parse(response.body);

  return info;
}

api.get('/', function *(next) {
  yield next;
  this.body = 'Welcome to the API v1 application';
});

api.get('/ingredients', function *(next) {
  var res = yield ingredients.find({});
  this.body = res;
});

api.get('/ingredients/:name', function *(next) {
  var ingredientName = this.params.name;
  var result = null;

  result = yield ingredients.findOne({
    name: ingredientName
  });

  if(result) {
    this.body = result;
  } else {
    var search = yield freebaseSearch (ingredientName);
    var document = search.result[0];

    var promise = yield ingredients.insert(document, function (err, doc) {
      // console.log('err', err, 'doc', doc);
      if (err) {
        console.log('error inline', err);
        this.body = 'Unable to process request';
        this.status = 400;
        throw err;
      }
      // else {
      //   this.body = doc;
      //   this.status = 201; // change to be set only on success
      // }
    });

    console.log('promise.type', promise.type);

    promise.error(function(err){
      console.log('error 1', err);
      this.body = 'Unable to process request 1';
      this.status = 400;
      throw err;
    });
    promise.on('error', function(err){
      console.log('error 2', err);
      this.body = 'Unable to process request 2';
      this.status = 400;
      throw err;
    });
    promise.on('success', function(doc){
      console.log('success 1', doc);
      this.body = doc;
      this.status = 201; // change to be set only on success
    });
    promise.on('complete', function(err, doc){
      console.log('complete', err, doc);
      this.body = doc;
      this.status = 201; // change to be set only on success
    });
    promise.success(function(doc){
      console.log('success 1', doc);
      this.body = doc;
      this.status = 201; // change to be set only on success
    });
  }

  // console.log('result', result);

});

api.get('/ingredients/:name/nutrition', function *(next) {
  var name = this.params.name;

  var result = yield freebaseMetawebQuery (name);
  this.body = result;
});

api.get('/ingredients/:name/activity', function *(next) {
  var res = yield ingredients.find({
    name: this.params.name
  });
  this.body = res;
});

api.post('/ingredients/create', function *(next) {
  // console.log(this);
  var ingredient = yield parse(this);
  console.log('ingredient', ingredient);

  ingredient.created_on = new Date;
  ingredient.updated_on = new Date;

  console.log('ingredient', ingredient);

});

api.put('/ingredients/:name/update', function *(next) {
  console.log(this.params);
  var res = yield ingredients.update({
    name: this.params.username
  });
  this.body = res;
});

// Routes: Users

api.get('/users', function *(next) {
  var res = yield users.find({});
  this.body = res;
});

api.get('/users/:username', function *(next) {
  var res = yield users.findOne(this.params.id);
  var res = yield users.find({
    username: this.params.username
  });
  this.body = res;
});

api.get('/users/:username/activity', function *(next) {
  var res = yield users.find({
    username: this.params.username
  });
  this.body = res;
});

api.post('/users/create', function *(next) {
  // console.log(this);
  var body = yield parse(this);
  console.log('body', body);

  // var data = {
  //   username: this.params.username,
  //   name: this.params.name,
  //   emailAddress: this.params.emailAddress,
  //   birthDate: this.params.birthDate,
  //   signupDate: this.params.signupDate,
  //   updateDate: this.params.updateDate
  // };

  var res = yield users.insert(body, function (err, doc) {
    console.log('err', err, 'doc', doc);
    if (err) {
      this.body = 'Unable to process request';
      this.status = 400;
      throw err;
    } else {
      this.body = res;
      this.status = 201; // change to be set only on success
    }
  });

});

api.put('/users/:username/update', function *(next) {
  console.log(this.params);
  var res = yield users.update({
    username: this.params.username
  });
  this.body = res;
});

api.get('/users/:username/recipes', function *(next) {
  var res = yield recipes.find({
    username: this.params.username
  });
  this.body = res;
});

api.get(/^([^.]+)$/, function *(next) {
  yield next;
  this.body = 'API v1 - 404 not found';
}); //matches everything without an extension

module.exports = api;
