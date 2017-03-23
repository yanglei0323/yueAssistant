index.controller('chooseQrcodeCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	
	
	$scope.updateQrcode = function (){
		$location.path('/');
	};
}]);