requirejs.config({
  baseUrl: '/bower_components/',
  paths: {
    'jquery': 'jquery/jquery'
    // 'jqueryBridget': 'jquery-bridget/jquery.bridget',
    // 'imagesLoaded': 'imagesloaded/imagesloaded',
    // 'isotope': 'isotope/js/isotope'
  },
  shim: {
  	'jquery.smooth-scroll/jquery.smooth-scroll': ['jquery'],
  }
});