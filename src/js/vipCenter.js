index.controller('vipCenterCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	// 获取vip列表信息
	$http.post('/user/vippage.json', postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
			var vipList = resp.data.data.viplist;
			for(var i=0;i<vipList.length;i++){
				vipList[i].selected=false;
			}
			$scope.vipList = resp.data.data.viplist;
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
	$scope.vipid='';
	// 选择购买项目
	$scope.selectVip = function (vip){
		if(vip.selected === true){
			vip.selected =false;
			$scope.vipid = '';
		}else{
			for(var i=0;i<$scope.vipList.length;i++){
				$scope.vipList[i].selected=false;
			}
			vip.selected =true;
			$scope.vipid=vip.id;
		}
	};

	$scope.showMenu = function (){
		$('.up-muenu').show();
	};
	$scope.hideMenu = function (){
		$('.up-muenu').fadeOut(10);
	};

	// 确认购买
	$scope.buyVip = function (){
		if($scope.vipid === ''){
			alert('请选择要购买的会员选项');
			return false;
		}
		$http.post('/user/buyvip.json',{'vipid':$scope.vipid}, postCfg)
		.success(function (Resp) {
			console.log(Resp);
			if (1 === Resp.code) {
				// 生成订单成功
				var predata = {
					type: 'wz',
					orderid: Resp.data.id
				};
				// console.log(predata);
				$http.post('/pay/prepay.json', predata, postCfg)
				.success(function (resp) {
					console.log(resp);
					if (1 === resp.code) {
						// 预支付成功
						var data = resp.data;
						if (WeixinJSBridge) {
							WeixinJSBridge.invoke(
						       'getBrandWCPayRequest', {
						           "appId": data.appId,     //公众号名称，由商户传入     
						           "timeStamp": data.timeStamp.toString(),         //时间戳，自1970年以来的秒数     
						           "nonceStr": data.nonceStr, //随机串     
						           "package": data.package,     
						           "signType": data.signType,         //微信签名方式    
						           "paySign": data.paySign //微信签名 
						       },
						       function(res) {
						           if(res.err_msg == "get_brand_wcpay_request:ok" ) {
						               // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
						               alert('支付成功');
						               $location.path('/');
						           }
						           else {
						               alert('支付失败' + res.err_msg);
						           }
						       }
						   );
						}
					}
					else if (0 === resp.code) {
						alert(resp.reason);
					}
				})
				.error(function (resp) {
					// alert('数据请求失败!请稍后再试！');
				});
			}
			else if (0 === resp.code) {
				alert(resp.reason);
			}
		})
		.error(function (Resp) {
			// alert('数据请求失败!请稍后再试！');
		});
	};
}]);