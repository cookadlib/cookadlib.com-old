$(document).ready(function () {
  'use strict';

  var functions = window.functions = window.functions || {};

  functions.Interface = window.functions.Interface = window.functions.Interface || {};

  functions.Interface.Recipes = window.functions.Interface.Recipes = window.functions.Interface.Recipes || {};

  functions.Interface.Recipes.Create = function () {
    var fieldset = [];
    // fieldset['ingredient'] = $('fieldset.ingredient', 'form').first()[0].outerHTML;
    fieldset.ingredient = $('fieldset.ingredient', 'form').first().clone().find('legend').remove().end()[0].outerHTML;

    $('body').on('click', 'button#add-new-ingredient', function() {
      // alert('Button clicked!');
      // $(fieldset['ingredient']).insertAfter('fieldset.ingredient').last();
      $('fieldset.ingredient').last().after(fieldset.ingredient);
    });

    $('body').on('click', 'button#add-new-seasoning', function() {
      // alert('Button clicked!');
      $('fieldset.seasoning', 'form').first().clone().insertAfter('fieldset.seasoning');
    });

    $('body').on('click', 'button#add-new-sauce', function() {
      // alert('Button clicked!');
      $('fieldset.sauce', 'form').first().clone().insertAfter('fieldset.sauce');
    });

    $('body').on('click', 'button#add-new-dressing', function() {
      // alert('Button clicked!');
      $('fieldset.dressing', 'form').first().clone().insertAfter('fieldset.dressing');
    });
  };

  functions.Interface.Recipes.Create();

});
