index.controller('myTailorCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {
	$scope.activeTab=1;
	$scope.progressFlag=1;
	$scope.progressTitle='';
	if($scope.progressFlag){
		 switch ($scope.progressFlag) {
            case 1:
				$scope.progressTitle='您的预约已经提交';
                break;
            case 2:
				$scope.progressTitle='已匹配专属编辑';
                break;
            case 3:
				$scope.progressTitle='编辑正在量身定制';
                break;
            case 4:
				$scope.progressTitle='您的专属定制已经完成';
                break;
        }
	}
	$scope.add = function (){
		if($scope.progressFlag <=3){
			$scope.progressFlag +=1;
		}
		switch ($scope.progressFlag) {
            case 1:
				$scope.progressTitle='您的预约已经提交';
                break;
            case 2:
				$scope.progressTitle='已匹配专属编辑';
                break;
            case 3:
				$scope.progressTitle='编辑正在量身定制';
                break;
            case 4:
				$scope.progressTitle='您的专属定制已经完成';
                break;
        }
	};
}]);