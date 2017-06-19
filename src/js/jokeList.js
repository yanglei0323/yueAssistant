index.controller('jokeListCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
    var type = $routeParams.num;
    $scope.imgList = [];
    for(var k=1;k<11;k++){
        $scope.imgList.push('../../assets/images/joke/sample/type'+type+'/img_'+k+'.png');
    }
    $scope.type=type;
    // console.log(type);
    // 早安模板跳转
    $scope.useMornTemplate = function (num){
    	$location.path('usejoke/'+type+'/'+num);
    };
}]);