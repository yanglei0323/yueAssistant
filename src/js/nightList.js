index.controller('nightListCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
    var type = $routeParams.num;
    $scope.imgList = [];
    $scope.imgSunList = [];//总数据列表
    var imgSunNum = 5; //图片总张数，需手动修改
    for(var k=1;k<(imgSunNum+1);k++){
        $scope.imgSunList.push('../../assets/images/goodnight/type'+type+'/img_'+k+'.png');
    }
    
    // console.log(type);
    // 早安模板跳转
    $scope.useMornTemplate = function (num){
        $location.path('useNight/'+type+'/'+num);
    };
    // 模拟瀑布流
    var listnum = 10; //每次最多请求10条数据
    if(listnum <= imgSunNum){
        for(var l=0;l<listnum;l++){
            $scope.imgList.push($scope.imgSunList[l]);
        }
    }else{
        listnum = imgSunNum;
        for(var m=0;m<listnum;m++){
            $scope.imgList.push($scope.imgSunList[m]);
        }
    }
    $(window).bind("scroll", function(event){
        var scrollTop=$(document).scrollTop();//滚动条
        var bottomTop=$(document).height()-$(window).height(); //文档高度减去屏幕高度
        if(scrollTop >= (bottomTop-10)){
            if(listnum >= imgSunNum){
                return;
            }else{
                listnum += 10;
                $scope.imgList = [];
                if(listnum <= imgSunNum){
                    for(var q=0;q<listnum;q++){
                        $scope.imgList.push($scope.imgSunList[q]);
                    }
                }else{
                    listnum = imgSunNum;
                    for(var s=0;s<listnum;s++){
                        $scope.imgList.push($scope.imgSunList[s]);
                    }
                }
            }
        }       
    });
}]);