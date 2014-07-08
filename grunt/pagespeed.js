/**
 * Automate Web Performance Measurement With PSI
 */
module.exports = {

  options: {
    // nokey: true
    key: '<%= package.config.api.google.key %>'
  },

  prod: {
    options: {
      url: 'http://cookadlib.com',
      locale: 'en_GB',
      strategy: 'desktop',
      threshold: 80
    }
  }

};
