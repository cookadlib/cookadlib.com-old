requirejs([
    'jquery-bridget/jquery.bridget'
  ],
  function() {
    var $ = window.jQuery;

    var form = '#form-login';
    var $form = $(form);

    $.get('/csrfToken', function(csrf){
      $('#form-login-csrf').val(csrf._csrf);
    });

    $(document).on('submit', form, function(event) {
      event.preventDefault();

      $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: {
          username: $('#form-login-username').val(),
          password: $('#form-login-password').val(),
          _csrf: $('#form-login-csrf').val()
        },
        success: function(d){
          console.log(d);
        }
      });
    });
  }
);