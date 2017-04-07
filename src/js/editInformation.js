index.controller('editInformationCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$timeout',
	function ($scope, $http, $window, $location, $rootScope,$timeout) {

	// 获取用户信息并展示
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.user=user;
	$scope.name=user.name;
	$scope.worktime=user.worktime;
	if(user.worklevel === null){
		$scope.worklevel='';
	}else{
		$scope.worklevel=user.worklevel.name;
	}
	
	$scope.storename=user.storename;
	$scope.storeplace=user.storeplace;
	$scope.cutprice=user.cutprice;
	$scope.colorpricelow=user.colorpricelow;
	$scope.colorpricehigh=user.colorpricehigh;
	$scope.permpricelow=user.permpricelow;
	$scope.permpricehigh=user.permpricehigh;
	$scope.pointLabel = user.flags;
	$scope.flagid = [];
	if(user.avatar === ''||user.avatar === '../../assets/images/head-none.png' ){
		$scope.user.avatar='../../assets/images/edit-headimg.png';
	}
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
		$('.prompt-fixed').fadeOut(10);
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
		$('.fixed-content').fadeOut(10);
	};
	var data={
		'url':window.location.href 
	};
	$http.post('/user/unl/wzinfo.json',data, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			wx.config({
			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: resp.data.data.appid, // 必填，公众号的唯一标识
			    timestamp: resp.data.data.timestamp, // 必填，生成签名的时间戳
			    nonceStr: resp.data.data.noncestr, // 必填，生成签名的随机串
			    signature: resp.data.data.signature,// 必填，签名，见附录1
			    jsApiList: [
			    	'chooseImage',
				    'uploadImage'
			    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
	// 点击上传
    $scope.localId = [];
    $scope.addPhoto= function () {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              $scope.localId = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              if ($scope.localId.length === 0) {
                  alert('请选择图片!');
                  return false;
              }else{
              		$scope.user.avatar=$scope.localId[0];
              }
              // if($scope.localId.length > 1) {
              //     Popup.alert('修改头像不支持多张图片,请重新上传');
              //     $scope.localId = [];
              //     return false;
              // }
              upload();
          }
      });
    };

    // 上传图片
    function upload(){
    	if ($scope.localId.length === 0) {
	        alert('请选择头像图片!');
	        return false;
	    }
    	wx.uploadImage({
          localId: $scope.localId[0],
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
                $scope.serverId = res.serverId;
                    var data1 = {
                    avatarmediaid: $scope.serverId
                };
                $http.post('/user/edit.json', data1,postCfg)
                .then(function (resp) {
				if (1 === resp.data.code) {
					var userinfo = resp.data.data;
					if(userinfo.avatar === ''){
						userinfo.avatar='../../assets/images/head-none.png';
					}else{
						userinfo.avatar = picBasePath + userinfo.avatar;
					}
					$scope.user = userinfo;
		            sessionStorage.setItem('user', JSON.stringify(userinfo));
				}else{
					alert(resp.data.reason);
				}
			}, function (resp) {
		        // alert('数据请求失败，请稍后再试！');
			});
          },
          fail: function (res) {
              alert('上传失败！');
          }
      });
    }
}]);