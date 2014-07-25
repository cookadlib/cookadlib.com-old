$(document).ready(function () {
  'use strict';

  var functions = window.functions = window.functions || {};

  functions.Navigation = window.functions = window.functions || {};

  functions.Navigation.$sections = $('main > section');
  functions.Navigation.sectionLength = functions.Navigation.$sections.length - 1; // compensate for comparing a count to a 0-based index
  functions.Navigation.currentSection = 0;
  functions.Navigation.targetSection = 0;
  functions.Navigation.$targetSection = null;
  functions.Navigation.scrollTimeout = null;

  functions.Navigation.SetCurrentSection = function () {
    functions.Navigation.$sections.each(function() {
      if(Math.floor($(window).scrollTop()) >= Math.floor($(this).offset().top)) {
        functions.Navigation.currentSection = $(this).index();
      }
    });
  };

  functions.Navigation.KeyboardSnap = function () {
    $(window).on('keydown', function(event) {
      // console.log('keydown', event.which);

      if (event.which === 40) {
        event.preventDefault();
        console.log('targetSection', functions.Navigation.sectionLength, functions.Navigation.targetSection);
        functions.Navigation.targetSection = functions.Navigation.currentSection + 1;

        if(functions.Navigation.targetSection <= functions.Navigation.sectionLength) {
          functions.Navigation.currentSection++;
          console.log('targetSection', functions.Navigation.sectionLength, functions.Navigation.targetSection);
          functions.Navigation.$targetSection = functions.Navigation.$sections.eq(functions.Navigation.currentSection);

          if(functions.Navigation.$targetSection.length) {

            $('html, body').animate({
              scrollTop: functions.Navigation.$targetSection.offset().top
            }, 1000);

            // functions.Navigation.SetCurrentSection();
          }

        }

      }

      if (event.which === 38) {
        event.preventDefault();
        console.log('targetSection', functions.Navigation.sectionLength, functions.Navigation.targetSection);
        functions.Navigation.targetSection = functions.Navigation.currentSection - 1;

        if(functions.Navigation.targetSection >= 0) {
          functions.Navigation.currentSection--;
          console.log('targetSection', functions.Navigation.sectionLength, functions.Navigation.targetSection);
          functions.Navigation.$targetSection = functions.Navigation.$sections.eq(functions.Navigation.currentSection);

          if(functions.Navigation.$targetSection.length) {
            $('html, body').animate({
              scrollTop: functions.Navigation.$targetSection.offset().top
            }, 1000);

            // functions.Navigation.SetCurrentSection();
          }

        }

      }

      if (event.which === 37) {
        $('body').addClass('sidebar-open');
      }

      if (event.which === 39) {
        $('body').removeClass('sidebar-open');
      }

    });

  };

  functions.Navigation.ScrollSnap = function () {
    $(window).on('scroll touchmove', function() {
      console.log('scroll touchmove');
      if (functions.Navigation.scrollTimeout) {
        console.log('clearTimeout');
        clearTimeout(functions.Navigation.scrollTimeout);
      }
      console.log('between');
      functions.Navigation.scrollTimeout = setTimeout(function() {
        console.log('stopped');

        var difference = 0;

        functions.Navigation.$sections.each(function() {
          difference = Math.floor($(window).scrollTop()) - Math.floor($(this).offset().top);

          if((difference < 150) && (difference > -150)) {
            functions.Navigation.targetSection = functions.Navigation.$sections.index(this);
            functions.Navigation.$targetSection = $(this);

            $('html, body').animate({
              scrollTop: functions.Navigation.$targetSection.offset().top
            }, 250);
          }

        });

        functions.Navigation.SetCurrentSection();

      }, 1000);
    });
  };

  functions.Navigation.KeyboardSnap();
  functions.Navigation.ScrollSnap();

});
