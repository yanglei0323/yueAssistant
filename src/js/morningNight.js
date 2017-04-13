index.controller('morningNightCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	$scope.activeTab=1;
	if($rootScope.activeTabMorn){
        $scope.activeTab=$rootScope.activeTabMorn;
    }
    $scope.changeTab = function(index){
        $scope.activeTab=index;
        switch (index) {
            case 1:
                $rootScope.activeTabMorn = 1;
                break;
            case 2:
                $rootScope.activeTabMorn = 2;
                break;
        }
    };
    // 早安模板跳转
    $scope.useMornTemplate = function (num){
    	$location.path('useMorn/'+num);
    };
}]);