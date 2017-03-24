index.controller('vipCenterCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	
	$scope.showMenu = function (){
		$('.up-muenu').show();
	};
	$scope.hideMenu = function (){
		$('.up-muenu').fadeOut(1000);
	};
}]);