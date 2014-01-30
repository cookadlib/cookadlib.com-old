require([
    'jquery'
  ],
  function($) {
    listenerReveal();
});

function listenerReveal()
{
    $('button[data-action="reveal"]').on(
        'click',
        function() {
            var targetElement = $(this).attr('data-target');
console.log(1);
            if(typeof targetElement !== 'undefined') {
console.log(2);
                if(targetElement.length > 0) {
console.log(3);
                    if($('body').hasClass('reveal-' + targetElement) === true) {
                        $('body').removeClass('reveal-' + targetElement);
                    } else {
                        $('body').addClass('reveal-' + targetElement);
                    }
                }
            }
        }
    );
}