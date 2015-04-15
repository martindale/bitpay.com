(function() {
  'use strict';
  InstantClick.on('change', function() {
    window.analytics.page();
  });
  InstantClick.init();
}());
