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
