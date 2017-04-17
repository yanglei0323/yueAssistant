index.controller('homeCtrl',
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
	//模板跳转
	$scope.showTemplate = function (num){
		switch (num) {
			case 1:
				// 早晚安
				$location.path('morningNight');
				break;
			case 2:
				// 客照展示
				$location.path('guest');
				break;
			case 3:
				// 通知海报
				$location.path('notice');
				break;
			case 4:
				// 个人推广
				$location.path('promotion');
				break;
			case 5:
				// 节日问候
				$location.path('holiday');
				break;
			case 6:
				// 段子笑话
				$location.path('joke');
				break;
			case 7:
				// 生活日常
				$location.path('life');
				break;
		}
	};
	//个人主页跳转
	$scope.goHomePage = function (){
		if($scope.user.iscomplete === false){
			$('.prompt-fixed').show();
			return;
		}
		$location.path('homePage/'+$scope.user.uuid);
	};
	// 未填写信息时退出
	$scope.promptFalse = function (){
		$('.prompt-fixed').fadeOut(10);
	};
	// 未填写信息时继续填写
	$scope.promptTrue = function (){
		$('.prompt-fixed').fadeOut();
		$location.path('editInformation');
	};
}]);