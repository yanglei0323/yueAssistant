index.controller('tailorDataCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	
	$scope.toPayTailor = function (){
		$location.path('payTailor');
	};
	
}]);