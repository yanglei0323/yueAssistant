index.controller('homeCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	$scope.personalCenter = function (){
		$location.path('personalCenter');
	};
}]);