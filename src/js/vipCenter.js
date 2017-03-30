index.controller('vipCenterCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	// 获取vip列表信息
	$http.post('/user/vippage.json', postCfg)
	.then(function (resp) {
		console.log(resp);
		if (1 === resp.data.code) {
		}
	}, function (resp) {
        // alert('数据请求失败，请稍后再试！');
	});
	$scope.showMenu = function (){
		$('.up-muenu').show();
	};
	$scope.hideMenu = function (){
		$('.up-muenu').fadeOut(1000);
	};
}]);