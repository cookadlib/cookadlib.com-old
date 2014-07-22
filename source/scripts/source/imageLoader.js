$(document).ready(function () {
  'use strict';

  var functions = {};

  functions.initialiseImagesLoaded = function (selector) {
		console.log('initialiseImageLoader', selector);

		if(!selector) {
			selector = 'main';
		}

		// $('img', selector).addClass('transparent');

    var $imgLoader = imagesLoaded(selector);

    $imgLoader.on('always', function(instance) {
      console.log('ALWAYS - all images have been loaded', instance);
    });

    $imgLoader.on('done', function(instance) {
      console.log('DONE  - all images have been successfully loaded', instance);
    });

    $imgLoader.on('fail', function(instance) {
      console.log('FAIL - all images loaded, at least one is broken', instance);
    });

    $imgLoader.on('progress', function(instance, image) {
      if(image.isLoaded) {
        $(image.img).removeClass('transparent');
      }

      var result = image.isLoaded ? 'loaded' : 'broken';
      console.log( 'image is ' + result + ' for ' + image.img.src );
    });

	};

  functions.initialiseImageLoader = function () {
    $('img, figure div.img').addClass('transparent');

    $('img').on('scrollin', function() {
      var img = this;
      var $img = $(img);

      $img.off('scrollin'); // clean up binding

      functions.initialiseImagesLoaded(img);

      img.src = $img.attr('data-src');
    });

    $('[data-src]:not(img)').on('scrollin', function() {
      var img = this;
      var $img = $(img);

      $img.addClass('transparent');

      $img.off('scrollin'); // clean up binding

      $img.css('background-image', 'url(' + $img.attr('data-src') + ')').removeClass('transparent');
    });

    $(window).trigger('scroll'); // trick jQuery-Sonar into showing content above the fold on iPad

    window.setTimeout(function() {
      $(window).trigger('scroll');
    }, 500);

  };

  // functions.initialiseImagesLoaded('main');
  functions.initialiseImageLoader();

});
