$(document).ready(function () {
  'use strict';

  var functions = window.functions = window.functions || {};

  functions.Interface = window.functions.Interface = window.functions.Interface || {};

  functions.Interface.InitialiseToggleHandler = function () {
    $('body').on('click.toggleHandler', 'button[data-action="toggle"]', function() {
      var target = $(this).attr('data-target');
      $('body').toggleClass(target);
    });
  };

  functions.Interface.InitialiseToggleHandler();

});
