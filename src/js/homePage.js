index.controller('homePageCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	var uuid = $routeParams.uuid;
	console.log(uuid);
	$scope.workTime = [];
	// 获取用户信息并存储
	$http.post('/user/mine.json', postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			$scope.isLogin = true;
			var user = resp.data.data;
			if(user.avatar === ''){
				user.avatar='../../assets/images/head-none.png';
			}else{
				user.avatar = picBasePath + user.avatar;
			}
			$scope.user = user;
			$scope.pointLabel=user.flags;
			$scope.hrefTel='tel:'+user.telephone;
			var worktime=user.workday;
			for(var i=0;i<worktime.length;i++){
				$scope.workTime.push(worktime[i]);
			}
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});

	var time = new Date();
    $scope.nowYear = time.getFullYear();
    // 点击预约弹出弹窗
    $scope.appointment = function (){
    	$('.prompt-fixed').show();
    };
    // 点击关闭弹窗
    $scope.promptFalse = function (){
    	$('.prompt-fixed').fadeOut(500);
    };

    $http.post('/user/unl/otherpage.json',{'uuid':uuid}, postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
}]);