exports.index = function(req, res) {
  'use strict';
  res.render('index', { title: 'Express' });
};

/** serve jade enabled partials */
exports.partials = function(req, res) {
  'use strict';
  res.render('partials/' + req.params.name);
};
