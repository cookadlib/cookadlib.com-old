require([
    'jquery',
    'bootstrap/collapse',
    'bootstrap/dropdown'
  ],
  function($) {
    activateNavbarDropdowns();
});

function activateNavbarDropdowns()
{
    $('.dropdown-toggle').dropdown();
}