requirejs.config({
  baseUrl: '/bower_components/',
  paths: {
    'jquery': 'jquery/jquery',
    'bootstrap/affix': 'bootstrap/js/affix',
    'bootstrap/alert': 'bootstrap/js/alert',
    'bootstrap/button': 'bootstrap/js/button',
    'bootstrap/carousel': 'bootstrap/js/carousel',
    'bootstrap/collapse': 'bootstrap/js/collapse',
    'bootstrap/dropdown': 'bootstrap/js/dropdown',
    'bootstrap/modal': 'bootstrap/js/modal',
    'bootstrap/popover': 'bootstrap/js/popover',
    'bootstrap/scrollspy': 'bootstrap/js/scrollspy',
    'bootstrap/tab': 'bootstrap/js/tab',
    'bootstrap/tooltip': 'bootstrap/js/tooltip',
    'bootstrap/transition': 'bootstrap/js/transition',
    // 'jqueryBridget': 'jquery-bridget/jquery.bridget',
    // 'imagesLoaded': 'imagesloaded/imagesloaded',
    // 'isotope': 'isotope/js/isotope'
  },
  shim: {
  	'jquery.smooth-scroll/jquery.smooth-scroll': ['jquery'],
    'bootstrap/affix': {
      deps: ['jquery'],
      exports: '$.fn.affix'
    },
    'bootstrap/alert': {
      deps: ['jquery'],
      exports: '$.fn.alert'
    },
    'bootstrap/button': {
      deps: ['jquery'],
      exports: '$.fn.button'
    },
    'bootstrap/carousel': {
      deps: ['jquery'],
      exports: '$.fn.carousel'
    },
    'bootstrap/collapse': {
      deps: ['jquery'],
      exports: '$.fn.collapse'
    },
    'bootstrap/dropdown': {
      deps: ['jquery'],
      exports: '$.fn.dropdown'
    },
    'bootstrap/modal': {
      deps: ['jquery'],
      exports: '$.fn.modal'
    },
    'bootstrap/popover': {
      deps: ['jquery'],
      exports: '$.fn.popover'
    },
    'bootstrap/scrollspy': {
      deps: ['jquery'],
      exports: '$.fn.scrollspy'
    },
    'bootstrap/tab': {
      deps: ['jquery'],
      exports: '$.fn.tab'
    },
    'bootstrap/tooltip': {
      deps: ['jquery'],
      exports: '$.fn.tooltip'
    },
    'bootstrap/transition': {
      deps: ['jquery'],
      exports: '$.fn.transition'
    }
  }
});