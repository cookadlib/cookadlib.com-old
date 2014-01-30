require([
    'jquery',
    'jquery.smooth-scroll/jquery.smooth-scroll'
  ],
  function($) {
    keyboardNavigation();
    attachResizeListeners();
});

function attachResizeListeners()
{
    var resizeTimer;

    $(window).on('resize', function(event) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(setFullHeight, 100);
    });

    setFullHeight();
}

function setFullHeight()
{
    $('section').css(
        'min-height',
        function(index, height) {
            // var newHeight = ( $(window).height() * 0.9 );
            var newHeight = ( $(window).height() );
            return newHeight;
        }
    );
}

function keyboardNavigation()
{
    $(document.documentElement).keydown(
        function(event)
        {
            if (event.keyCode == 38) {
                event.preventDefault();
                scrollTo('up');
            }
            else if (event.keyCode == 40) {
                event.preventDefault();
                scrollTo('down');
            }
        }
    );
}

function scrollTo(direction) {
    var $current = $('section.current');
    var $target = null;

    if ($current.length) {
        if (direction == 'up') {
            $target = $current.prev('section');
        }
        else if (direction == 'down') {
            $target = $current.next('section');
        }
    }

    if ($target.length) {
        $current.removeClass('current');
        $target.addClass('current');

        $.smoothScroll({
          scrollTarget: $target.get(0)
        });
    }
}