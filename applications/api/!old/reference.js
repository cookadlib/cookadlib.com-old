// https://developers.google.com/freebase/v1/search-metaschema
// https://www.npmjs.org/package/koa-request
// http://wiki.dbpedia.org/UseCases
// http://wiki.dbpedia.org/Downloads39
// http://lod.geospecies.org/
// http://www.geonames.org/
// http://www.gutenberg.org/
// http://linkedgeodata.org/About
// http://dbpedia.org/sparql

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

  }

};

// app.get('/book', list);
// app.get('/book/:title', show);
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


// Routes: Test

api.get('/test', function *(next) {
  rdfstore.create(function(store) {
    store.execute('LOAD <http://dbpedia.org/resource/Tim_Berners-Lee> INTO GRAPH <http://example.org/people>', function() {
      store.setPrefix('dbp', 'http://dbpedia.org/resource/');
      store.node(store.rdf.resolve('dbp:Tim_Berners-Lee'), "http://example.org/people", function(success, graph) {
        var peopleGraph = graph.filter(store.rdf.filters.type(store.rdf.resolve("foaf:Person")));

        store.execute(
          'PREFIX rdf:  <http://www.w3.org/1999/02/22-rdf-syntax-ns#>\
           PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
           PREFIX : <http://example.org/>\
           SELECT ?s FROM NAMED :people { GRAPH ?g { ?s rdf:type foaf:Person } }',
          function(success, results) {
            var result = peopleGraph.toArray()[0].subject.valueOf() === results[0].s.value;
            console.log('rdf', result);
            var res = result;
            this.body = res;
          });
      });
    });
  });
});


// var mid = result['result'][0].mid;

// var topic = yield freebaseTopic (mid);
// console.log('topic', topic);

// this.body = topic;
