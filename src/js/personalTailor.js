index.controller('personalTailorCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	// 获取定制信息
	$http.post('/user/customizepage.json', postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			resp.data.data.customizeimgurl = picBasePath + resp.data.data.customizeimgurl;
			$scope.customizeInfo=resp.data.data;
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
	// 定制信息填写
	$scope.tailorData = function (){
		$location.path('tailorData');
	};
	// 我的文章跳转
	$scope.toMyTailor = function (){
		$location.path('myTailor');
	};
	// 案例跳转
	$scope.showCustomize = function (){
		window.location.href = $scope.customizeInfo.customizeurl;
	};
	// 取消
	$scope.promptFalse = function (){
		$('.prompt-fixed').fadeOut();
	};
	// 去付款
	$scope.promptTrue = function (){
		$('.prompt-fixed').fadeOut();
		$location.path('compeletPayTailor');
	};
}]);