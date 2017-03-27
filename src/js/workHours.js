index.controller('workHoursCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$timeout',
	function ($scope, $http, $window, $location, $rootScope,$timeout) {
	var workdayList=[
		{'name':'星期一','iswork':'0'},
		{'name':'星期二','iswork':'0'},
		{'name':'星期三','iswork':'0'},
		{'name':'星期四','iswork':'0'},
		{'name':'星期五','iswork':'0'},
		{'name':'星期六','iswork':'0'},
		{'name':'星期日','iswork':'0'},
	];
	// 获取用户工作时间
	$http.post('/user/worktime.json', postCfg)
	.then(function (resp) {
		if (-1 === resp.data.code) {
			// 用户未登录
			$scope.isLogin = false;
			$location.path('fast_login');
		}
		else if (1 === resp.data.code) {
			$scope.isLogin = true;
			var workday=resp.data.data.workday;
			for(var i=0;i<workday.length;i++){
				workdayList[i].iswork = workday[i];
				$scope.workdayList = workdayList;
			}
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
	
	// 选择休息日
	$scope.selectWeek = function (week){
		if(week.iswork == 1){
			week.iswork =0;
		}else{
			week.iswork =1;
		}
	};

	// 保存信息
	$scope.saveInformation = function (){
		var workData='';
		for(var i=0;i<$scope.workdayList.length;i++){
			workData += $scope.workdayList[i].iswork;
		}
		var data={
			'workday':workData
		};
		$http.post('/user/edit.json',data, postCfg)
		.then(function (resp) {
			// console.log(resp);
			if (-1 === resp.data.code) {
				// 用户未登录
				$location.path('fast_login');
			}
			else if (1 === resp.data.code) {
				alert('保存信息成功！');
				$timeout(function () {
                    $window.history.back();
                });
			}
		}, function (resp) {
	        // alert('数据请求失败，请稍后再试！');
		});
	};
	
}]);