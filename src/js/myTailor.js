index.controller('myTailorCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	$scope.activeTab=1;
	$scope.progressFlag=1;
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
	$scope.add = function (){
		if($scope.progressFlag <=3){
			$scope.progressFlag +=1;
		}
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
	};
	// 获取定制信息
	$http.post('/user/customizepage.json', postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
	// 获取定制进度
	$http.post('/user/customizedetail.json', postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
}]);