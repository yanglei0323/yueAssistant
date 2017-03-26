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
	// 会员中心跳转
	$scope.goVipCenter = function (){
		$location.path('vipCenter');
	};
	// 我的作品跳转
	$scope.goWorks = function (){
		$location.path('works');
	};
	// 工作时间跳转
	$scope.goWorkHours = function (){
		$location.path('workHours');
	};
}]);