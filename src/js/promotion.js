index.controller('promotionCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	$scope.activeTab=1;
    // $("#morningNight-container").on("click", function () {               
    //     html2canvas($("#morningNight-container"), {
    //         height: $("#morningNight-container").outerHeight(),
    //         onrendered: function (canvas) {
    //             var url = canvas.toDataURL();
    //             //以下代码为下载此图片功能
    //             $(".test").attr('src',url);
    //         }
    //     });
    // });
    $scope.changeHomePage = function (index){
        var data={
            'displaytype':index
        };
        $http.post('/user/edit.json',data, postCfg)
        .then(function (resp) {
            // console.log(resp);
            if (-1 === resp.data.code) {
                // 用户未登录
                $scope.isLogin = false;
                $location.path('fast_login');
            }
            else if (1 === resp.data.code) {
                $scope.isLogin = true;
                // 获取用户信息并存储
                $http.post('/user/mine.json', postCfg)
                .then(function (resp) {
                    console.log(resp);
                    if (-1 === resp.data.code) {
                        // 用户未登录
                        $scope.isLogin = false;
                        // $location.path('fast_login');
                    }
                    else if (1 === resp.data.code) {
                        $scope.isLogin = true;
                        var user = resp.data.data;
                        if(user.avatar === ''){
                            user.avatar='../../assets/images/head-none.png';
                        }else{
                            user.avatar = picBasePath + user.avatar;
                        }
                        $scope.user = user;
                        sessionStorage.setItem('user', JSON.stringify(user));
                        alert('修改主页风格成功,可以去主页形象页面查看啦！');
                        if($scope.user.iscomplete === false){
                            return;
                        }
                        $location.path('homePage/'+$scope.user.uuid);
                    }
                }, function (resp) {
                    // alert('数据请求失败，请稍后再试！');
                });
            }
        }, function (resp) {
            // alert('数据请求失败，请稍后再试！');
        });
    };
}]);