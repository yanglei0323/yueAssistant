index.controller('guestCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
    document.title='客照展示';
    var user=JSON.parse(sessionStorage.getItem('user'));
    $scope.user=user;
    $scope.activeTab=1;
    if($rootScope.activeTab){
        $scope.activeTab=$rootScope.activeTab;
    }
	$scope.loading=false;
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
    $scope.changeTab = function(index){
        $scope.activeTab=index;
        switch (index) {
            case 1:
                $rootScope.activeTab = 1;
                break;
            case 2:
                $rootScope.activeTab = 2;
                break;
        }
    };

    //模板跳转
    $scope.useGuest = function (num){
        window.location.href='../template/guest/index.html?num='+num+"&uuid="+$scope.user.uuid;
    };
}]);