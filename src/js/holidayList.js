index.controller('holidayListCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
    var type = $routeParams.num;
    $scope.dragon=type;
    $scope.imgList = [];
    if(type == 6){
        for(var m=1;m<7;m++){
            $scope.imgList.push('../../assets/images/holiday/sample/type'+type+'/img_'+m+'.png');
        }
    }else{
        for(var k=1;k<3;k++){
            $scope.imgList.push('../../assets/images/holiday/sample/type'+type+'/img_'+k+'.png');
        } 
    }
    // console.log(type);
    // 早安模板跳转
    $scope.useMornTemplate = function (num){
    	$location.path('useHoliday/'+type+'/'+num);
    };
}]);