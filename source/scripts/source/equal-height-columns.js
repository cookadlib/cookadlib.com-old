$(document).ready(function () {
  'use strict';

  var functions = window.functions = window.functions || {};

  functions.Presentation = window.functions.Presentation = window.functions.Presentation || {};

  functions.Presentation.SetEqualColumnHeights = function () {
    $('fieldset', '.module').each(function() {
      var targetHeight = $(this).parent('.module').height();
      $(this).css({
        'min-height': targetHeight
      });
    });
  };

  functions.Presentation.SetEqualColumnHeights();

});
