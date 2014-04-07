require([
    'jquery',
  ],
  function($) {
    addFormElementStateChangeListener();
    prepareFormElementStates();
});

function addFormElementStateChangeListener() {
    var checkboxes = '.checkbox';
    var $checkboxes = $(checkboxes);

    $('body').on('click', checkboxes + ' input[type=checkbox]', function() {
        var state = $(this).is(':checked');
        $(this).closest(checkboxes).attr('data-checked-state', state);
    });
}

function prepareFormElementStates() {
    var checkboxes = '.checkbox';
    var $checkboxes = $(checkboxes);

    $checkboxes.append('<i>');

    $checkboxes.each(function(index) {
        var state = $(this).is(':checked');
        $(this).attr('data-checked-state', state);
    });
}