var kodiApp = angular.module('kodiRemoteApp', [
  'ngTouch'
]);

kodiApp.factory('kodiRPCCaller', [
  '$interval',
  '$http',
  function($interval, $http) {
    var kodiRPCCaller = function() {
      this.init();
    };
    kodiRPCCaller.prototype = {
      'status': 'disconnected',
      'init': function() {
        console.log('kodiRPCCaller::init');
      },
      '_updateState': function() {
        console.log('kodiRPCCaller::_updateState');
        this._sendRequest('Player.GetActivePlayers');
      },
      '_sendRequest': function(method, params) {
        console.log('kodiRPCCaller::_sendRequest');
        $http.post('/jsonrpc?' + method, {
          'jsonrpc': '2.0',
          'method': method,
          'id': 1,
          'params': params
        }).
        success(function(data, status, headers, config) {
            this.status = 'connected';
        }).
        error(function(data, status, headers, config) {
            this.status = 'disconnected';
        });
      }
    };
    return kodiRPCCaller;
  }]
);

kodiApp.controller('kodiCirclePanelCtrl', [
  '$scope',
  'kodiRPCCaller',
  function($scope, kodiRPCCaller) {
    var caller = new kodiRPCCaller();

    $scope.circlePanelClick = function(method) {
      console.log('kodiCirclePanelCtrl::circlePanelClick::', method);
      //TODO: do not use private method
      caller._sendRequest(method);
    };
  }
]);

