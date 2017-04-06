index.controller('compeletPayTailorCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.user=user;
	// 获取定制进度
	$http.post('/user/customizedetail.json', postCfg)
	.then(function (resp) {
		// console.log(resp);
		if (1 === resp.data.code) {
			$scope.customizeOrder = resp.data.data.order;
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});


	$scope.toPay = function (){
		// $location.path('personalTailor');
		var predata = {
			type: 'wz',
			orderid: $scope.customizeOrder.id
		};
		// console.log(predata);
		$http.post('/pay/prepay.json', predata, postCfg)
		.success(function (resp) {
			// console.log(resp);
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
				               $location.path('personalTailor');
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
			alert(resp.reason);
		});
	};
}]);