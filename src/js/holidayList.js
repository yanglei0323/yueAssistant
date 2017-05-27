index.controller('holidayListCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
    var type = $routeParams.num;
    $scope.dragon=type;
    $scope.imgList = [];
    for(var k=1;k<3;k++){
        $scope.imgList.push('../../assets/images/holiday/type'+type+'/img_'+k+'.png');
    }
    // console.log(type);
    // 早安模板跳转
    $scope.useMornTemplate = function (num){
    	$location.path('useHoliday/'+type+'/'+num);
    };
}]);