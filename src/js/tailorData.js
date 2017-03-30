index.controller('tailorDataCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	var wxdata={
		'url':window.location.href 
	};
	$http.post('/user/unl/wzinfo.json',wxdata, postCfg)
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


	$scope.lifemediaid=[];    //生活照列表用于上传
	$scope.workmediaid=[];    //工作照列表
	$scope.artmediaid=[];     //艺术照列表
	$scope.goodsmediaid=[];   //作品照列表
	$scope.lifeList=[];    //生活照列表用于显示
	$scope.workList=[];    //工作照列表
	$scope.artList=[];     //艺术照列表
	$scope.goodsList=[];   //作品照列表
	// 点击上传生活照
    $scope.addLifePhoto= function () {
    	if($scope.lifemediaid.length >= 3){
    		alert('最多可上传3张图片!');
            return false;
    	}
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              $scope.lifelocalid=res.localIds;
              if ($scope.lifelocalid.length === 0) {
                  alert('请选择图片!');
                  return false;
              }else{
              		// $scope.user.qrcode=$scope.lifemediaid[0];
              }
              uploadlife();
          }
      });
    };

    // 上传图片
    function uploadlife(){
    	wx.uploadImage({
          localId: $scope.lifelocalid[0],
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
          		$scope.lifeList.push($scope.lifelocalid[0]);
                $scope.lifemediaid.push(res.serverId);
          },
          fail: function (res) {
              alert('上传失败！');
          }
      });
    }
	
    // 点击上传工作照
    $scope.addWorkPhoto= function () {
    	if($scope.workmediaid.length >= 3){
    		alert('最多可上传3张图片!');
            return false;
    	}
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              $scope.worklocalid=res.localIds;
              if ($scope.worklocalid.length === 0) {
                  alert('请选择图片!');
                  return false;
              }else{
              		// $scope.user.qrcode=$scope.lifemediaid[0];
              }
              uploadwork();
          }
      });
    };

    // 上传图片
    function uploadwork(){
    	wx.uploadImage({
          localId: $scope.worklocalid[0],
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
          		$scope.workList.push($scope.worklocalid[0]);
                $scope.workmediaid.push(res.serverId);
          },
          fail: function (res) {
              alert('上传失败！');
          }
      });
    }


    // 点击上传艺术照
    $scope.addArtPhoto= function () {
    	if($scope.artmediaid.length >= 3){
    		alert('最多可上传3张图片!');
            return false;
    	}
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              $scope.artlocalid=res.localIds;
              if ($scope.artlocalid.length === 0) {
                  alert('请选择图片!');
                  return false;
              }else{
              		// $scope.user.qrcode=$scope.lifemediaid[0];
              }
              uploadart();
          }
      });
    };

    // 上传图片
    function uploadart(){
    	wx.uploadImage({
          localId: $scope.artlocalid[0],
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
          		$scope.artList.push($scope.artlocalid[0]);
                $scope.artmediaid.push(res.serverId);
          },
          fail: function (res) {
              alert('上传失败！');
          }
      });
    }


    // 点击上传作品照
    $scope.addGoodsPhoto= function () {
    	if($scope.goodsmediaid.length >= 3){
    		alert('最多可上传3张图片!');
            return false;
    	}
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
              $scope.goodslocalid=res.localIds;
              if ($scope.goodslocalid.length === 0) {
                  alert('请选择图片!');
                  return false;
              }else{
              		// $scope.user.qrcode=$scope.lifemediaid[0];
              }
              uploadgoods();
          }
      });
    };

    // 上传图片
    function uploadgoods(){
    	wx.uploadImage({
          localId: $scope.goodslocalid[0],
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
          		$scope.goodsList.push($scope.goodslocalid[0]);
                $scope.goodsmediaid.push(res.serverId);
          },
          fail: function (res) {
              alert('上传失败！');
          }
      });
    }

	$scope.toPayTailor = function (){
		
		if($scope.name === ''|| $scope.telephone===''|| $scope.education===''|| $scope.work===''|| $scope.activity===''|| $scope.magazine===''|| $scope.stars===''|| $scope.brand===''|| $scope.lifemediaid.length === 0|| $scope.workmediaid.length === 0|| $scope.artmediaid.length === 0|| $scope.goodsmediaid.length === 0){
			alert('有信息尚未填写，请完善后再保存');
			return false;
		}
		var data={
			'name':$scope.name,
			'telephone':$scope.telephone,
			'education':$scope.education,
			'work':$scope.work,
			'activity':$scope.activity,
			'magazine':$scope.magazine,
			'stars':$scope.stars,
			'brand':$scope.brand,
			'remark':$scope.remark,
			'lifemediaid':[],
			'workmediaid':[],
			'artmediaid':[],
			'goodsmediaid':[],
		};
		$http.post('/user/addcustomize.json',data, postCfg)
		.then(function (resp) {
			if (1 === resp.data.code) {
				console.log(resp);
				// 此处存储订单信息
				$location.path('payTailor');
			}
		}, function (resp) {
	        // alert('数据请求失败，请稍后再试！');
		});
	};

	
}]);