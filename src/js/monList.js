index.controller('monListCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
    var type = $routeParams.num;
    var user=JSON.parse(sessionStorage.getItem('user'));
    $scope.user=user;
    $scope.imgList = [];
    for(var k=1;k<6;k++){
        $scope.imgList.push('../../assets/images/morning/type'+type+'/img_'+k+'.png');
    }
    // console.log(type);
    // 早安模板跳转
    $scope.useMornTemplate = function (num){
        $location.path('useMorn/'+type+'/'+num);
    	// window.location.href='../template/morning/index.html?type='+type+'&num='+num+'&uuid='+$scope.user.uuid;
    };
}]);