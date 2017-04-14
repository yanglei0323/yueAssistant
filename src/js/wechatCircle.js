index.controller('wechatCircleCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.user=user;
	$scope.btnText = '立即使用';
	$scope.loading=false;
	console.log($scope.user);
	// 类型type
	var num = $routeParams.num;
	// 第几张图片
	$scope.page=1;
	$scope.showImg='../../assets/images/promotion/type'+num+'/img_'+$scope.page+'.png';
	// 完善信息页面跳转
	$scope.editInformation = function (){
		$location.path('editInformation');
	};
	// 立即使用
	$scope.useTemplatePage = function (){
		$scope.btnText = '长按保存至手机，再发到朋友圈炫耀';
	};
	// 返回
	$scope.goBack = function (){
		$window.history.back();
	};
	// 关闭弹窗
	$scope.closeText = function (){
		$scope.user.iscomplete = true;
	};
	// 切换图片
	$scope.changeImg =function (){
		$scope.loading=true;
		if($scope.page >=3){
			$scope.page=1;
			$scope.showImg='../../assets/images/promotion/type'+num+'/img_'+$scope.page+'.png';
			$scope.loading=false;
		}else{
			$scope.page+=1;
			$scope.showImg='../../assets/images/promotion/type'+num+'/img_'+$scope.page+'.png';
			$scope.loading=false;
		}
	};
}]);