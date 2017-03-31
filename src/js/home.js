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
			$location.path('fast_login');
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
	//早晚安跳转
	$scope.morningNight = function (){
		$location.path('morningNight');
	};
	//个人主页跳转
	$scope.goHomePage = function (){
		$location.path('homePage' + $scope.user.uuid);
	};
}]);