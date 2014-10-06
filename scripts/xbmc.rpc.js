(function(window) {
  'use strict';

  var xbmc = window.xbmc || {};

  xbmc.rpc = {
    'default_options': {
      'contentType': 'application/json',
      'dataType': 'json',
      'type': 'POST',
      'success': function () {
        //intentionally left blank
      }
    },
    'request': function(options) {
      var request_options = jQuery.extend({}, this.default_options, options);
      request_options.url = xbmc.core.JSON_RPC + '?' + options.method;
      request_options.data = JSON.stringify({
        'jsonrpc': '2.0',
        'method': options.method,
        'id': 1,
        'params': request_options.params
      });
      return jQuery.ajax(request_options)
    }
  };

  window.xbmc = xbmc;
}(window));

