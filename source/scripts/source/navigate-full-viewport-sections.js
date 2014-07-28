$(document).ready(function () {
  'use strict';

  var functions = window.functions = window.functions || {};

  functions.Navigation = window.functions = window.functions || {};

  functions.Navigation.sections = 'main > section';
  functions.Navigation.$sections = $(functions.Navigation.sections);
  functions.Navigation.pills = 'main > .pills';
  functions.Navigation.$pills = $(functions.Navigation.pills);
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

    functions.Navigation.$sections.eq(functions.Navigation.currentSection).addClass('active').siblings().removeClass('active');
    $('a', functions.Navigation.$pills).eq(functions.Navigation.currentSection).addClass('active').siblings().removeClass('active');

    if(functions.Navigation.$sections.eq(functions.Navigation.currentSection).hasClass('background')) {
      $('body').addClass('inverse-lightness');
    } else {
      $('body').removeClass('inverse-lightness');
    }
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
      // console.log('scroll touchmove');
      if (functions.Navigation.scrollTimeout) {
        // console.log('clearTimeout');
        clearTimeout(functions.Navigation.scrollTimeout);
      }
      // console.log('between');

      functions.Navigation.scrollTimeout = setTimeout(function() {
        // console.log('stopped');
        $('html, body').stop();

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

      }, 250);
    });
  };

  functions.Navigation.Pills = function () {
    functions.Navigation.$sections.each(function() {
      functions.Navigation.$pills.append('<a href="#' + $(this).attr('id') + '"><span>Jump to #' + $(this).attr('id') + '</span></a>');
    });

    $('body').on('click', functions.Navigation.pills + ' a', function(event) {
      event.preventDefault();

      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      functions.Navigation.$targetSection = $($(this).attr('href'));

      $('html, body').animate({
        scrollTop: functions.Navigation.$targetSection.offset().top
      }, 250, functions.Navigation.SetCurrentSection);

    });
  };

  functions.Navigation.KeyboardSnap();
  functions.Navigation.ScrollSnap();
  functions.Navigation.Pills();

});
