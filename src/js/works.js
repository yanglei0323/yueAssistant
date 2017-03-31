index.controller('worksCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	// 获取用户作品
	function getWorkList (){
		$http.post('/user/worklist.json', postCfg)
		.then(function (resp) {
			console.log(resp);
			if (1 === resp.data.code) {
				
			}
		}, function (resp) {
	        // alert('数据请求失败，请稍后再试！');
		});
	}
	getWorkList();
	
}]);