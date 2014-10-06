(function(window){
  'use strict';

  var xbmc = window.xbmc || {};

  var KodiRemote = function() {
    this.init();
  };

  KodiRemote.prototype = {
    init: function() {
      console.log('KodiRemote::init');
      this._assignHandlers();
    },
    _eventMap: {
      'btn-up': 'Input.Up',
      'btn-down': 'Input.Down',
      'btn-left': 'Input.Left',
      'btn-right': 'Input.Right',
      'btn-enter': 'Input.Select',
      'btn-back': 'Input.Back',
      'btn-home': 'Input.Home'
    },
    _assignHandlers: function() {
      console.log('KodiRemote::_assignHandlers');
      var that = this;
      $('.circle-panel').delegate('button', 'click', function() {
        that.rpcCall(that._eventMap[$(this).attr('id')]);
      });
    },
    rpcCall: function(method, params) {
      console.log('KodiRemote::rpcCall');
      var callObj = {
        'method': method
      };
      if (params) {
        callObj.params = params;
      }
      return xbmc.rpc.request(callObj);
    }
  };

  $(document).ready(function() {
    var app = new KodiRemote();
  });
})(window);