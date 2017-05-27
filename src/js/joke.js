index.controller('jokeshowCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	document.title='段子笑话';
	//模板跳转
	$scope.useTemplate = function (num){
		$location.path('jokeList/'+num);
	};
	
}]);