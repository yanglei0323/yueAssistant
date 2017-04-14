index.controller('lifeCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	$scope.activeTab=1;
	if($rootScope.activeTablife){
        $scope.activeTab=$rootScope.activeTablife;
    }
    $scope.changeTab = function(index){
        $scope.activeTab=index;
        switch (index) {
            case 1:
                $rootScope.activeTablife = 1;
                break;
            case 2:
                $rootScope.activeTablife = 2;
                break;
            case 3:
                $rootScope.activeTablife = 3;
                break;
        }
    };
    // 模板跳转
    $scope.useMornTemplate = function (num){
    	window.location.href='../template/life/index.html?num='+num;
    };
}]);