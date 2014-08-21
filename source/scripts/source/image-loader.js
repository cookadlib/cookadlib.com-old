$(document).ready(function () {
  'use strict';

  var functions = window.functions = window.functions || {};

  functions.Loader = window.functions.Loader = window.functions.Loader || {};

  functions.Loader.InitialiseImagesLoaded = function (selector) {
		// console.log('InitialiseImageLoader', selector);

		if(!selector) {
			selector = 'main';
		}

		// $('img', selector).addClass('transparent');

    var $imgLoader = imagesLoaded(selector);

    // $imgLoader.on('always', function(instance) {
    //   console.log('ALWAYS - all images have been loaded', instance);
    // });
    //
    // $imgLoader.on('done', function(instance) {
    //   console.log('DONE  - all images have been successfully loaded', instance);
    // });
    //
    // $imgLoader.on('fail', function(instance) {
    //   console.log('FAIL - all images loaded, at least one is broken', instance);
    // });

    $imgLoader.on('progress', function(instance, image) {
      if(image.isLoaded) {
        $(image.img).removeClass('transparent');
      }

      // var result = image.isLoaded ? 'loaded' : 'broken';
      // console.log( 'image is ' + result + ' for ' + image.img.src );
    });

	};

  functions.Loader.InitialiseImageLoader = function () {
    $('img[data-src], figure div.img[data-src]').addClass('transparent');

    $('img[data-src]').on('scrollin', function() {
      var img = this;
      var $img = $(img);

      if($img.attr('data-src')) {
        $img.off('scrollin'); // clean up binding

        functions.Loader.InitialiseImagesLoaded(img);

        img.src = $img.attr('data-src');
      }

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

  // functions.Loader.InitialiseImagesLoaded('main');
  functions.Loader.InitialiseImageLoader();

});
