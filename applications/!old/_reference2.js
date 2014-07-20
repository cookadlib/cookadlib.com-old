var query = 'blue bottle';
var service_url = 'https://www.googleapis.com/freebase/v1/search';
var params = {
        'query': query,
        'key': api_key
};
var url = service_url + '?' + urlencode(params);
