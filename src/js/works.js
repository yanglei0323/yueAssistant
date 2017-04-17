index.controller('worksCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$timeout',
	function ($scope, $http, $window, $location, $rootScope,$timeout) {
	$scope.deleteImg = false;
	// 获取用户作品
	function getWorkList (){
		$http.post('/user/workslist.json', postCfg)
		.then(function (resp) {
			console.log(resp);
			if (1 === resp.data.code) {
				// 所有作品
				var allworks = resp.data.data.allworks;
				for(var i=0;i<allworks.length;i++){
					allworks[i].imgurl = picBasePath + allworks[i].imgurl;
				}
				$scope.allworks = [];
				$scope.allworks = allworks;

				// 主页作品
				var recommendworks = resp.data.data.recommendworks;
				for(var j=0;j<recommendworks.length;j++){
					recommendworks[j].imgurl = picBasePath + recommendworks[j].imgurl;
				}
				$scope.recommendworks = [];
				$scope.recommendworks = recommendworks;
			}
		}, function (resp) {
	        // alert('数据请求失败，请稍后再试！');
		});
	}
	getWorkList();
	
	// 删除主页作品
	$scope.deleteRecommendworks=function(item){
		var data={
			'add':[],
			'rm':[item.id]
		};
		$http.post('/user/setrecommend.json',data, postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				getWorkList();
			}
		}, function (resp) {
	        // alert('数据请求失败，请稍后再试！');
		});
	};
	// 选中全部作品为主页作品
	$scope.addAllworks=function(item){
		if($scope.recommendworks.length >=6){
			alert('最多只能设置6张图片作为主页作品展示！');
			return false;
		}
		var data={
			'add':[item.id],
			'rm':[]
		};
		$http.post('/user/setrecommend.json',data, postCfg)
		.then(function (resp) {
			console.log(resp);
			if (1 === resp.data.code) {
				getWorkList();
			}
		}, function (resp) {
	        // alert('数据请求失败，请稍后再试！');
		});
	};// 删除全部作品
	$scope.deleteAllworks=function(e,item){
		e.stopPropagation();
		var data={
			'worksid':[item.id]
		};
		$http.post('/user/deleteworks.json',data, postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				getWorkList();
			}
		}, function (resp) {
	        // alert('数据请求失败，请稍后再试！');
		});
	};
	// 删除全部作品按钮显示切换
	$scope.showDeleteBtn = function (){
		$scope.deleteImg = !$scope.deleteImg;
	};
	$scope.showPrompt=function(){
		alert('请从下方全部作品中选择！');
	};
	// 保存操作
	$scope.saveWorkImg = function (){
		$timeout(function () {
            $window.history.back();
        });
	};

	// 上传全部作品
	var data={
		'url':$window.location.href.split('#')[0]  
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
	$scope.updateWorkImg = function (){
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
	        alert('请选择图片!');
	        return false;
	    }
    	wx.uploadImage({
          localId: $scope.localId[0],
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
                $scope.serverId = [];
                $scope.serverId.push(res.serverId);
                var data1 = {
                    worksmediaid: $scope.serverId
                };
                $http.post('/user/uploadworks.json', data1,postCfg)
                .then(function (resp) {
				if (1 === resp.data.code) {
                    // var confirm = alert('作品上传成功!');
	                getWorkList();
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