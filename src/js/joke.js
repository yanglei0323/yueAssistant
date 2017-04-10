index.controller('jokeshowCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	//模板跳转
	$scope.useTemplate = function (num){
		$location.path('usejoke/'+num);
	};
	
}]);