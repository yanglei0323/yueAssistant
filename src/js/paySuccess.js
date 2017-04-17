index.controller('paySuccessCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$timeout',
	function ($scope, $http, $window, $location, $rootScope,$timeout) {
	$timeout(function(){
		$location.path("/");
	},1000);
}]);