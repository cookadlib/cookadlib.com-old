var response = [];
var info = [];

var descriptor = {
  url: 'http://dbpedia.org/resource/' + this.params.name,
  headers: {
    'Accept': 'application/json'
  }
};

response['descriptor'] = yield request(descriptor);
info['descriptor'] = JSON.parse(response['descriptor'].body);
// console.log(info['descriptor'].d.results[0]);

var wikiPageRedirects = null;

// Check if http://dbpedia.org/ontology/wikiPageRedirects is set and load that if so
_(info['descriptor']).forEach(function(resource) {
  console.log(resource);
  _(resource).forEach(function(attribute) {
    console.log(attribute);
    if(_.has(attribute, 'http://dbpedia.org/ontology/wikiPageRedirects')) {
      wikiPageRedirects = attribute.value;
      console.log(wikiPageRedirects);
    }
  });
});


console.log('wikiPageRedirects', wikiPageRedirects);
if(wikiPageRedirects) {
  descriptor = {
    url: wikiPageRedirects,
    headers: {
      'Accept': 'application/json'
    }
  };

  response['descriptor'] = yield request(descriptor);
  info['descriptor'] = JSON.parse(response['descriptor'].body);
}

var query = {
  url: 'http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=DESCRIBE+%3C' + info['descriptor']['d']['results'][0]['__metadata']['uri'] + '%3E&output=application%2Fld%2Bjson',
  headers: {
    'Accept': 'application/json'
  }
};

response['query'] = yield request(query);
info['query'] = JSON.parse(response['query'].body);
var disambiguates = info['query']['@graph'];

var getName = _.property('name');
_.map(characters, getName);
// → ['barney', 'fred']

_.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
//['http://dbpedia.org/ontology/wikiPageDisambiguates']
console.log(disambiguates);

// console.log(info.d.results[0]['dbpedia-owl']);//dbpedia-owl:wikiPageDisambiguates
// console.log(info.d.results[0]['http://xmlns.com/foaf/0.1/depiction']);
// console.log(info.d.results[0]['http://xmlns.com/foaf/0.1/depiction']['__deferred'].uri);

// this.body = 'full response: ' + JSON.stringify(response.body);
// var image = '<img src="' + info.d.results[0]['http://xmlns.com/foaf/0.1/depiction']['__deferred'].uri + '" alt="' + this.params.name + '" height="400" />';
// this.body = image;
this.body = disambiguates;
