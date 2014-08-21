/**
 * author: Thierry Koblentz
 * Copyright 2011 - css-101.org
 * http://www.css-101.org/articles/ken-burns_effect/css-transition.php
 */
(function($) {
  'use strict';

  $.fn.kenBurns = function () {

    var $images = $('img', this);
    var numberOfImages = $images.length;
    var i = 0;

    console.log('numberOfImages', numberOfImages, 'i', i);

    function animateImage() {

      console.log('i', i);

      if(i === numberOfImages) {
        i = 0;
      }

      $images.eq(i).addClass('fx').siblings('img').removeClass('fx');

      i++;

      window.setTimeout(animateImage, 20000);

    }

    animateImage();

  };

})(jQuery);

$('#hero-image').kenBurns();
