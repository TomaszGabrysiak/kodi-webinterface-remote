var kodiApp = angular.module('kodiRemoteApp', [
  'ngTouch'
]);

kodiApp.controller('kodiCirclePanelCtrl', [
  '$scope',
  function($scope) {
    $scope.circlePanelClick = function(value) {
      console.log('circlePanelClick');
    };
  }
]);


