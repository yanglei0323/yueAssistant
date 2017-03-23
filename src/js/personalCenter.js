index.controller('personalCenterCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	// 编辑个人信息跳转
	$scope.editInformation = function (){
		$location.path('editInformation');
	};
	// 私人订制跳转
	$scope.personalTailor = function (){
		$location.path('personalTailor');
	};
}]);