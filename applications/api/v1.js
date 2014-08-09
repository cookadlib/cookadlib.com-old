var packageJson = require(__dirname + '/../../package.json');

var _ = require('lodash');
var co = require('co');
var parse = require('co-body');
var koa = require('koa');
var logger = require('koa-logger');
var request = require('koa-request');
var router = require('koa-router');
// var rdfstore = require('rdfstore');
var should = require('should');
var database = require(__dirname + '/../database');

var app = koa();
var db = new database(packageJson.config.server.database);
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
  console.log('url', url);
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
  this.type = 'application/json';
});

api.get('/ingredients', function *(next) {
  // yield ingredients.remove({});
  var res = yield ingredients.find({});
  this.body = res;
  this.type = 'application/json';
});

api.post('/ingredients', function *(next) {
  // console.log(this);
  var ingredient = yield parse(this);
  // console.log('ingredient', ingredient);

  var ingredientName = ingredient.name;

  var result = yield ingredients.findOne({
    name: ingredientName
  });

  // console.log('db result', result, result.should.have.length(1));
  // console.log('db result', result);

  if(!result || result.length !== 1) {
    var search = yield freebaseSearch (ingredientName);
    var document = search.result[0];

    document.created_on = new Date;
    document.updated_on = new Date;

    document.images = {};

    var metawebQuery = yield freebaseMetawebQuery (ingredientName);

    var nutrition_facts = null;

    if(metawebQuery && metawebQuery.result && metawebQuery.result[0] && metawebQuery.result[0]['!/food/nutrition_fact/food']) {
      nutrition_facts = metawebQuery.result[0]['!/food/nutrition_fact/food'];
    }

    if(nutrition_facts && nutrition_facts.length > 0) {
      document.nutrition_facts = nutrition_facts;
    }

    var page_images_url = 'http://en.wikipedia.org/w/api.php?action=query&titles=' + ingredientName + '&prop=pageimages&format=json&pithumbsize=100';

    var page_images_request = yield request(page_images_url);

    var page_images = JSON.parse(page_images_request.body);

    console.log('page_images', page_images);
    if(page_images && page_images.query) {
      console.log('page_images.query.pages', page_images.query.pages);


      var jsonObj = page_images.query.pages;
      var firstProp = null;
      for(var key in jsonObj) {
          if(jsonObj.hasOwnProperty(key)) {
              firstProp = jsonObj[key];
              break;
          }
      }

      console.log('firstProp', firstProp);

      // document.images.thumbnail = page_images.query.pages['379788'].thumbnail.source;
      if(firstProp) {
        console.log('firstProp.thumbnail', firstProp.thumbnail);
        document.images.thumbnail = firstProp.thumbnail.source;
      }

    }

    // console.log('document', document);
    var result = yield ingredients.insert(document);
  }

  // console.log('freebase result', result);

  this.body = result;
  this.type = 'application/json';
});

api.get('/ingredients/:id', function *(next) {
  var ingredientId = this.params.id;

  var result = yield ingredients.findOne({
    _id: ingredientId
  });

  this.body = result;
  this.type = 'application/json';
});

api.put('/ingredients/:id', function *(next) {
  var ingredientId = this.params.id;

  var body = yield parse(this);
  console.log('body', body);

  var result = yield ingredients.updateById(ingredientId, body);

  this.body = result;
  this.type = 'application/json';
});

api.del('/ingredients/:id', function *(next) {
  var ingredientId = this.params.id;

  var lookup = yield ingredients.findOne({
    _id: ingredientId
  });

  var result = yield ingredients.remove({
    _id: ingredientId
  });

  console.log('ingredientId', ingredientId, 'lookup', lookup, 'result', result);

  this.body = result;
  this.type = 'application/json';
});

api.get('/ingredients/create/:name', function *(next) {
  var ingredientName = this.params.name;

  var result = yield ingredients.findOne({
    name: ingredientName
  });

  // console.log('db result', result, result.should.have.length(1));
  console.log('db result', result);

  if(!result || result.length !== 1) {
    var search = yield freebaseSearch (ingredientName);
    var document = search.result[0];

    var result = yield ingredients.insert(document);
  }

  console.log('freebase result', result);

  this.body = result;
  this.type = 'application/json';
});

api.get('/ingredients/:name/nutrition', function *(next) {
  var name = this.params.name;

  var result = yield freebaseMetawebQuery (name);
  this.body = result;
  this.type = 'application/json';
});

api.get('/ingredients/:name/activity', function *(next) {
  var res = yield ingredients.find({
    name: this.params.name
  });
  this.body = res;
  this.type = 'application/json';
});

api.del('/ingredients', function *(next) {
  var res = yield ingredients.remove();

  this.body = res;
  this.type = 'application/json';
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
