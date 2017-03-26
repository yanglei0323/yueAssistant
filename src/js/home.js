index.controller('homeCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	// 个人中心跳转
	$scope.personalCenter = function (){
		$location.path('personalCenter');
	};
	// 登录跳转
	$scope.setIn = function (){
		$location.path('fast_login');
	};
	//VIP会员跳转
	$scope.vipCenter = function (){
		$location.path('vipCenter');
	};
}]);