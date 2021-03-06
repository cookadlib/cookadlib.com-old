$(document).ready(function () {
  'use strict';

  var functions = window.functions = window.functions || {};

  functions.Navigator = window.functions.Navigator = window.functions.Navigator || {};

  functions.Navigator.InitialiseConnectivityStatus = function () {
    if (navigator.onLine) {
      console.log('Application online');
    } else {
      console.log('Application offline');
    }

    window.addEventListener('online', function(event) {
      console.log('Application ' + event.type);
    }, false);

    window.addEventListener('offline', function(event) {
      console.log('Application ' + event.type);
    }, false);

    document.addEventListener('visibilitychange', function() {
      console.log('hidden:' + document.hidden, 'state:' + document.visibilityState);
    }, false);
  };

  functions.Navigator.InitialiseConnectivityStatus();

});
