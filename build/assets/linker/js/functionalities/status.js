require([
    'jquery',
  ],
  function($) {
    addVisibilityChangeListener();
    showOnlineStatus();
});

function showOnlineStatus()
{
    window.addEventListener
    (
        'online',
        function(e)
        {
            console.info('Application online!');
            $('div.overlay.offline').animate(
                {
                    'opacity': 0
                },
                500,
                function() {
                    $(this).css('display', 'none');
                }
            );
        },
        false
    );

    window.addEventListener
    (
        'offline',
        function(e)
        {
            console.info('Application offline!');
            $('div.overlay.offline').css('display', 'block').animate({'opacity': 1}, 500);
        },
        false
    );

    if (navigator.onLine)
    {
        console.info('Application online!');
        $('div.overlay.offline').animate(
            {
                'opacity': 0
            },
            500,
            function() {
                $(this).css('display', 'none');
            }
        );
    }
    else
    {
        console.info('Application offline!');
        $('div.overlay.offline').css('display', 'block').animate({'opacity': 1}, 500);
    }
}

function addVisibilityChangeListener()
{
  document.addEventListener
  (
    'visibilitychange',
    function(e)
    {
      console.log
      (
        'hidden:' + document.hidden,
        'state:' + document.visibilityState
      )
    },
    false
  );
}

function enterFullscreen()
{
  var elem = document.querySelector('body');
  elem.onwebkitfullscreenchange = function(e)
  {
      console.log("Entered fullscreen!");
    elem.onwebkitfullscreenchange = onFullscreenExit;
  };
  elem.webkitRequestFullScreen();
}