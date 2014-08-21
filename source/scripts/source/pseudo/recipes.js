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

  functions.Interface.Recipes.Read = function () {
    // var hero = 'main article .hero';
    // var $hero = $(hero);
    var subNav = 'main article nav';
    var $subNav = $(subNav);
    // var heroHeight = ($(window).height() - $subNav.outerHeight());
    var subNavOffsetTop = $subNav.offset().top + 69;
    var subNavPosition = 'absolute';


    $(window).on('scroll', function() {
      console.log($(window).scrollTop(), subNavOffsetTop);
      if($(window).scrollTop() > subNavOffsetTop) {
        if((subNavPosition === 'fixed') !== true) {
          $('body').addClass('fixed-sub-nav');
          subNavPosition = 'fixed';
        }
      } else {
        if((subNavPosition === 'absolute') !== true) {
          $('body').removeClass('fixed-sub-nav');
          subNavPosition = 'absolute';
        }

      }
    });

    $('body').on('click', 'main article nav a', function(event) {
      event.preventDefault();
      $($(this).attr('href')).siblings('section').removeClass('active');
      $($(this).attr('href')).addClass('active');
      $('html, body').animate({
        scrollTop: $('main article nav').offset().top
      }, 750);
    });

    // $(window).on('resize', function() {
    //   heroHeight = ($(window).height() - $subNav.outerHeight());
    //   $hero.height(heroHeight);
    //   $subNav.css({'top': heroHeight + 'px'});
    // });
    //
    // $hero.height(heroHeight);
    // $subNav.css({'top': heroHeight + 'px'});

    // $('img', hero).each(function() {
    //   $(this).css({'background-image': 'url(' + $(this).attr('src') + ')'});
    //   $(this).attr('src', null);
    // });
  };

  if($('body').hasClass('recipes create')) {
    functions.Interface.Recipes.Create();
  }

  if($('body').hasClass('recipes read')) {
    functions.Interface.Recipes.Read();
  }

});
