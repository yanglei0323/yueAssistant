index.controller('personalCenterCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	// 获取用户信息并存储
	$http.post('/user/mine.json', postCfg)
	.then(function (resp) {
		console.log(resp);
		if (-1 === resp.data.code) {
			// 用户未登录
			$scope.isLogin = false;
			// $location.path('fast_login');
		}
		else if (1 === resp.data.code) {
			$scope.isLogin = true;
			var user = resp.data.data;
			if(user.avatar === ''){
				user.avatar='../../assets/images/head-none.png';
			}else{
				user.avatar = picBasePath + user.avatar;
			}
			$scope.user = user;
            sessionStorage.setItem('user', JSON.stringify(user));
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
	// 编辑个人信息跳转
	$scope.editInformation = function (){
		// $location.path('editInformation');
		window.location.href = '/yueAssistant/build/html/editInformation';
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
		// $location.path('works');
		window.location.href = '/yueAssistant/build/html/works';
	};
	// 工作时间跳转
	$scope.goWorkHours = function (){
		$location.path('workHours');
	};
}]);