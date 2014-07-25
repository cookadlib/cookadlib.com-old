$(document).ready(function () {
  'use strict';

  var functions = {};

  functions.initialiseToggleHandler = function () {
    $('body').on('click', 'button[data-action="toggle"]', function() {
      var target = $(this).attr('data-target');
      $('body').toggleClass(target);
    });
  };

  functions.initialiseToggleHandler();

});
