index.controller('homePageCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
	var uuid = $routeParams.uuid;
	$scope.workTime = [];
	
	// 获取他人用户信息
	$http.post('/user/unl/otherpage.json',{'uuid':uuid}, postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			var user = resp.data.data;
			user.avatar = picBasePath + user.avatar;
			user.qrcode = picBasePath + user.qrcode;
			$scope.pointLabel=user.userflags;
			$scope.hrefTel='tel:'+user.telephone;
			var worktime=user.workday;
			for(var i=0;i<worktime.length;i++){
				$scope.workTime.push(worktime[i]);
			}
			for(var j=0;j<user.workslist.length;j++){
				user.workslist[j] = picBasePath + user.workslist[j];
			}
			$scope.user = user;
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
    // 获取分享信息
	$http.post('/user/mypage/share.json', postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
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
			    	'checkJsApi',
					'onMenuShareAppMessage',
					'onMenuShareTimeline'
			    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			wx.ready(function () {
			//分享给朋友
			wx.onMenuShareAppMessage({
				title: "美业设计助手·一键生成美图", // 分享标题
				desc: "让美业人的每一条朋友圈，都在这里找到模板", // 分享描述
				link: window.location.href, // 分享链接
				imgUrl: "http://sheji.yanzijia.cn/static/img/share.jpg", // 分享图标
				type: 'link', // 分享类型,music、video或link，不填默认为link
				dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
				// 用户确认分享后执行的回调函数
				//$.diyAlert("分享成功！");
				},
				cancel: function () {
				// 用户取消分享后执行的回调函数
				//alert("用户取消分享！");
				}
			});
			//分享到朋友圈
			wx.onMenuShareTimeline({
				title: "小悦助手·一键生成美图", // 分享标题
				desc: "让美业人的每一条朋友圈，都在这里找到模板", // 分享描述
				link: window.location.href, // 分享链接
				imgUrl: "http://sheji.yanzijia.cn/static/img/share.jpg", // 分享图标
				success: function () {
				// 用户确认分享后执行的回调函数
				//$.diyAlert("分享到朋友圈成功！");
				},
				cancel: function () {
				// 用户取消分享后执行的回调函数
				}
				});
			});
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
}]);