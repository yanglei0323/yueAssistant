index.controller('noticeListCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
    var type = $routeParams.num;
    $scope.imgList = [];
    for(var k=1;k<5;k++){
        $scope.imgList.push('../../assets/images/notice/sample/type'+type+'/img_'+k+'.png');
    }
    // console.log(type);
    // 早安模板跳转
    $scope.useMornTemplate = function (num){
    	$location.path('useNotice/'+type+'/'+num);
    };
}]);