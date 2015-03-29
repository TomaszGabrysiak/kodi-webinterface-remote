var kodiApp = angular.module('kodiRemoteApp', [
  'ngTouch',
  'ngRoute',
  'ngAnimate'
]).config(['$routeProvider', function($routeProvider) {

  $routeProvider
    .when('/settings', {
      templateUrl: '/templates/settings.html'
    })
    .when('/navigation', {
      templateUrl: '/templates/navigation.html',
      controller: 'kodiNavigationCtrl'
    })
    .when('/player', {
      templateUrl: '/templates/player.html'
    })
    .otherwise({
      redirectTo: '/navigation'
    });

}]);

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

kodiApp.controller('kodiNavigationCtrl', [
  '$scope',
  'kodiRPCCaller',
  function($scope, kodiRPCCaller) {
    var caller = new kodiRPCCaller();

    $scope.kodiNavigation = function(direction) {
      caller._sendRequest('Input.' + direction);
    };
  }
]);


kodiApp.controller('footerNavCtrl', [
  '$scope',
  '$location',
  function($scope, $location) {
    $scope.navigateTo = function(path) {
      $location.path(path);
    };
  }
]);

