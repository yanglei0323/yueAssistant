index.controller('chooseQrcodeCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	var user=JSON.parse(sessionStorage.getItem('user'));
	if(user.qrcode === ''){
		user.qrcode ='../../assets/images/edit-headimg.png';
	}else{
		user.qrcode = picBasePath + user.qrcode;
	}
	$scope.user=user;
	var data={
		'url':window.location.href 
	};
	$http.post('/user/unl/wzinfo.json',data, postCfg)
	.then(function (resp) {
		if (1 === resp.data.code) {
			wx.config({
			    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
              		$scope.user.qrcode=$scope.localId[0];
              }
              // if($scope.localId.length > 1) {
              //     Popup.alert('修改头像不支持多张图片,请重新上传');
              //     $scope.localId = [];
              //     return false;
              // }
          }
      });
    };

    // 上传图片
    $scope.upload = function (){
    	if ($scope.localId.length === 0) {
	        alert('请选择图片!');
	        return false;
	    }
    	wx.uploadImage({
          localId: $scope.localId[0],
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
                $scope.serverId = res.serverId;
                    var data1 = {
                    qrcodemediaid: $scope.serverId
                };
                $http.post('/user/edit.json', data1,postCfg)
                .then(function (resp) {
				if (1 === resp.data.code) {
					sessionStorage.setItem('user', JSON.stringify(resp.data.data));
                    var confirm = alert('二维码上传成功');
                  	confirm.then(function () {
	                    $window.history.back();
                    });
				}
			}, function (resp) {
		        // alert('数据请求失败，请稍后再试！');
			});
          },
          fail: function (res) {
              alert('上传失败！');
          }
      });
    };
}]);