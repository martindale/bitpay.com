(function() {
  'use strict';
  InstantClick.on('change', function() {
    $(document).foundation({
      /*jshint camelcase: false */
      'magellan-expedition': {
        destination_threshold: 50,
        offset_by_height: false
      }
      /*jshint camelcase: true */
    });
    window.analytics.page();
  });
  InstantClick.init();
}());
