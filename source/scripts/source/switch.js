$(document).ready(function () {
  'use strict';

  var functions = window.functions = window.functions || {};

  functions.Interface = window.functions.Interface = window.functions.Interface || {};

  functions.Interface.TransformCheckboxInputToSwitch = function () {
    $('input[type="checkbox"]', '.checkbox').each(function() {
      $(this).after('<i />');
    });
  };

  functions.Interface.TransformCheckboxInputToSwitch();

});
