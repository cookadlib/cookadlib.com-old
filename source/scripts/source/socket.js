/* global io */
(function () {
  'use strict';

  var functions = window.functions = window.functions || {};

  functions.Connectivity = window.functions.Connectivity = window.functions.Connectivity || {};

  functions.Connectivity.InitialiseSocket = function () {
    var socket = io('http://localhost:4020');

    socket.on('connect', function() {

      console.log('connected to server');

      socket.emit('confirmation', 'I have connected to the server');

      socket.on('event', function(data) {
        console.log('new data of type "event": ', data);
        socket.emit('confirmation', 'user received new data of type "event": ' + JSON.stringify(data));
      });

      socket.on('disconnect', function() {
        console.log('disconnected from server');
      });
    });
  };

  functions.Connectivity.InitialiseSocket();

})();
