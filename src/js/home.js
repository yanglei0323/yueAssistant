index.controller('homeCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	document.title='美图助手';
	// 获取用户信息并存储
	$http.post('/user/mine.json', postCfg)
	.then(function (resp) {
		console.log(resp);
		if (-1 === resp.data.code) {
			// 用户未登录
			$scope.isLogin = false;
			// $location.path('fast_login');
		}
		else if (1 === resp.data.code) {
			$scope.isLogin = true;
			var user = resp.data.data;
			if(user.avatar === ''){
				user.avatar='../../assets/images/head-none.png';
			}else{
				user.avatar = picBasePath + user.avatar;
			}
			$scope.user = user;
            sessionStorage.setItem('user', JSON.stringify(user));
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
	// 个人中心跳转
	$scope.personalCenter = function (){
		$location.path('personalCenter');
	};
	// 登录跳转
	$scope.setIn = function (){
		// $location.path('fast_login');
	};
	//VIP会员跳转
	$scope.vipCenter = function (){
		$location.path('vipCenter');
	};
	//模板跳转
	$scope.showTemplate = function (num){
		if($scope.user.iscomplete === false){
			$('.prompt-fixed').show();
			return;
		}
		switch (num) {
			case 1:
				// 早晚安
				$location.path('morningNight');
				break;
			case 2:
				// 客照展示
				$location.path('guest');
				break;
			case 3:
				// 通知海报
				$location.path('notice');
				break;
			case 4:
				// 个人推广
				$location.path('promotion');
				break;
			case 5:
				// 节日问候
				$location.path('holiday');
				break;
			case 6:
				// 段子笑话
				$location.path('joke');
				break;
			case 7:
				// 生活日常
				$location.path('life');
				break;
		}
	};
	//个人主页跳转
	$scope.goHomePage = function (){
		if($scope.user.iscomplete === false){
			$('.prompt-fixed').show();
			return;
		}
		// $location.path('homePage/'+$scope.user.uuid);

		window.location.href = '/yueAssistant/build/html/homePage/'+$scope.user.uuid;
	};
	// 未填写信息时退出
	$scope.promptFalse = function (){
		$('.prompt-fixed').fadeOut(10);
	};
	// 未填写信息时继续填写
	$scope.promptTrue = function (){
		$('.prompt-fixed').fadeOut();
		$location.path('editInformation');
	};
	// var wxdata={
	// 	'url':$window.location.href.split('#')[0]  
	// };
	// $http.post('/user/unl/wzinfo.json',wxdata, postCfg)
	// .then(function (resp) {
	// 	if (1 === resp.data.code) {
	// 		wx.config({
	// 		    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	// 		    appId: resp.data.data.appid, // 必填，公众号的唯一标识
	// 		    timestamp: resp.data.data.timestamp, // 必填，生成签名的时间戳
	// 		    nonceStr: resp.data.data.noncestr, // 必填，生成签名的随机串
	// 		    signature: resp.data.data.signature,// 必填，签名，见附录1
	// 		    jsApiList: [
	// 		    	'checkJsApi',
	// 				'onMenuShareAppMessage',
	// 				'onMenuShareTimeline'
	// 		    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	// 		});
	// 		wx.ready(function () {
	// 		//分享给朋友
	// 		wx.onMenuShareAppMessage({
	// 			title: "美图助手", // 分享标题
	// 			desc: '美图助手', // 分享描述
	// 			link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx45618195d7038b9d&redirect_uri=http://syrapi.yueyishujia.com/yueAssistant/build/html/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect', // 分享链接
	// 			imgUrl: 'http://syrapi.yueyishujia.com/yueAssistant/assets/images/logo.png', // 分享图标
	// 			type: 'link', // 分享类型,music、video或link，不填默认为link
	// 			dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
	// 			success: function () {
	// 			// 用户确认分享后执行的回调函数
	// 			//$.diyAlert("分享成功！");
	// 			},
	// 			cancel: function () {
	// 			// 用户取消分享后执行的回调函数
	// 			//alert("用户取消分享！");
	// 			}
	// 		});
	// 		//分享到朋友圈
	// 		wx.onMenuShareTimeline({
	// 			title: "美图助手", // 分享标题
	// 			desc: '美图助手', // 分享描述
	// 			link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx45618195d7038b9d&redirect_uri=http://syrapi.yueyishujia.com/yueAssistant/build/html/&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect', // 分享链接
	// 			imgUrl: 'http://syrapi.yueyishujia.com/yueAssistant/assets/images/logo.png', // 分享图标
	// 			success: function () {
	// 			// 用户确认分享后执行的回调函数
	// 			//$.diyAlert("分享到朋友圈成功！");
	// 			},
	// 			cancel: function () {
	// 			// 用户取消分享后执行的回调函数
	// 			}
	// 			});
	// 		});
	// 	}
	// }, function (resp) {
 //        // alert('数据请求失败，请稍后再试！');
	// });
}]);