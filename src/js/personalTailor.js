index.controller('personalTailorCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	
	$scope.tailorData = function (){
		$location.path('tailorData');
	};
	$scope.toMyTailor = function (){
		$location.path('myTailor');
	};
}]);