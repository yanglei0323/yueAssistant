index.controller('payTailorCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	
	
	$scope.toPay = function (){
		$location.path('personalTailor');
	};
}]);