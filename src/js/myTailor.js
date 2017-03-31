index.controller('myTailorCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.user=user;
	// 获取定制进度
	$http.post('/user/customizedetail.json', postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			var customizeInfo =resp.data.data.customize;
			// customizeInfo.user.backimgurl = picBasePath + customizeInfo.user.backimgurl;
			$scope.customizeInfo = customizeInfo;
			$scope.progressFlag=$scope.customizeInfo.status;
			$scope.progressTitle='';
			if($scope.progressFlag){
				 switch ($scope.progressFlag) {
		            case 1:
						$scope.progressTitle='您的预约已经提交';
		                break;
		            case 2:
						$scope.progressTitle='已匹配专属编辑';
		                break;
		            case 3:
						$scope.progressTitle='编辑正在量身定制';
		                break;
		            case 4:
						$scope.progressTitle='您的专属定制已经完成';
		                break;
		        }
			}
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
	$scope.activeTab=1;
	// 获取文章列表
	$http.post('/user/customizelist.json', postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			var customizeList =resp.data.data.customizelist;
			for(i=0;i<customizeList.length;i++){
				customizeList[i].imgurl = picBasePath + customizeList[i].imgurl;
			}
			$scope.customizeList=customizeList;
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
	// 文章跳转
	$scope.showCustomize = function (customize){
		window.location.href = customize.jumpurl;
	};
}]);