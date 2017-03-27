index.controller('editInformationCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$timeout',
	function ($scope, $http, $window, $location, $rootScope,$timeout) {

	// 获取用户信息并展示
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.user=user;
	$scope.name=user.name;
	$scope.worktime=user.worktime;
	$scope.worklevel=user.worklevel.name;
	$scope.storename=user.storename;
	$scope.storeplace=user.storeplace;
	$scope.cutprice=user.cutprice;
	$scope.colorpricelow=user.colorpricelow;
	$scope.colorpricehigh=user.colorpricehigh;
	$scope.permpricelow=user.permpricelow;
	$scope.permpricehigh=user.permpricehigh;
	$scope.pointLabel = user.flags;
	$scope.flagid = [];

	// 判断二维码上传状态
	if(user.qrcode === ''){
		$scope.qrState = '(未上传)';
	}else{
		$scope.qrState = '(已上传)';
	}

	// 获取店内等级列表
	$http.post('/user/unl/worklevel.json', postCfg)
	.then(function (resp) {
		// console.log(resp);
		if (1 === resp.data.code) {
			var levelList =resp.data.data.worklevel;
			for(var i=0;i<levelList.length;i++){
				levelList[i].selected = false;
			}
			$scope.levelList = levelList;
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});

	// 选择技术特点标签
	$scope.selectLabel = function (item){
		item.ischoose = !item.ischoose;
	};

	// 未填写信息时退出
	$scope.promptFalse = function (){
		$('.prompt-fixed').fadeOut();
		$timeout(function () {
            $window.history.back();
        });
	};
	// 未填写信息时继续填写
	$scope.promptTrue = function (){
		$('.prompt-fixed').fadeOut(500);
	};
	// 保存信息
	$scope.saveInformation = function (){
		for(var i=0;i<$scope.pointLabel.length;i++){
			if($scope.pointLabel[i].ischoose === true){
				$scope.flagid.push($scope.pointLabel[i].id);
			}
		}
		if($scope.name === '' ||$scope.worktime === ''||$scope.worklevelid === ''||$scope.storename === ''||$scope.storeplace === ''||$scope.cutprice === ''||$scope.colorpricelow === ''||$scope.colorpricehigh === ''||$scope.permpricelow === ''||$scope.permpricehigh === ''||$scope.flagid.length === 0){
			$('.prompt-fixed').show();
			return;
		}
		var data={
			'name':$scope.name,
			'worktime':$scope.worktime,
			'worklevelid':$scope.worklevelid,
			'storename':$scope.storename,
			'storeplace':$scope.storeplace,
			'cutprice':$scope.cutprice,
			'colorpricelow':$scope.colorpricelow,
			'colorpricehigh':$scope.colorpricehigh,
			'permpricelow':$scope.permpricelow,
			'permpricehigh':$scope.permpricehigh,
			'flagid':$scope.flagid
		};
		$http.post('/user/edit.json',data, postCfg)
		.then(function (resp) {
			// console.log(resp);
			if (-1 === resp.data.code) {
				// 用户未登录
				$scope.isLogin = false;
				$location.path('fast_login');
			}
			else if (1 === resp.data.code) {
				$scope.isLogin = true;
				alert('保存信息成功！');
				$location.path('/');
			}
		}, function (resp) {
	        // alert('数据请求失败，请稍后再试！');
		});
	};
	// 二维码上传页面跳转
	$scope.chooseQrcode = function (){
		$location.path('chooseQrcode');
	};
	// 显示店内等级标签区域
	$scope.showLevel = function (){
		$('.fixed-content').show();
	};
	// 选择发型师等级
	$scope.selectLevel = function (level){
		for(var i=0;i<$scope.levelList.length;i++){
			$scope.levelList[i].selected = false;
		}
		level.selected = !level.selected;
		$scope.worklevelid = level.id;
		$scope.worklevel=level.name;
		$('.fixed-content').fadeOut(500);
	};
}]);