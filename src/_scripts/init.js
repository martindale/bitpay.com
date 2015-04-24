(function() {
  'use strict';
  InstantClick.on('change', function() {
    jQuery(document).foundation();
    window.analytics.page();
  });
  InstantClick.init();
}());
