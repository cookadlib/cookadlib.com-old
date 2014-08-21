/* global Croppic: true */
/* exported cropperHeader */
$(document).ready(function () {
  'use strict';

  var functions = window.functions = window.functions || {};

  functions.Interface = window.functions.Interface = window.functions.Interface || {};

  functions.Interface.InitialiseCropperHeaderHandler = function () {
    var cropperHeader = new Croppic('hero-image-test-id');
    console.log(cropperHeader);
  };

  // functions.Interface.InitialiseCropperHeaderHandler();

});
