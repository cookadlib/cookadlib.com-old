require([
    'jquery'
  ],
  function($) {
    listenerFullScreen();
});

function launchFullScreen(element) {
	console.log(element);
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function listenerFullScreen()
{
	$('button[data-action="enterFullScreen"]').on(
		'click',
		function() {
			var that = this;
			var targetElement = $(that).attr('data-fullscreen');

			if(typeof targetElement !== 'undefined') {

				if(targetElement.length > 0) {
					launchFullScreen(document.getElementById(targetElement)); // any individual element
				} else {
					launchFullScreen(document.documentElement); // the whole page	
				}
			} else {
				launchFullScreen(document.documentElement); // the whole page
			}
		}
	);
}