index.controller('editInformationCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope',
	function ($scope, $http, $window, $location, $rootScope) {

	var pointLabel =[
		{name:'沙宣风格',selected:false},
		{name:'创意剪发',selected:false},
		{name:'私人订制',selected:false},
		{name:'韩式造型',selected:false},
		{name:'短发匠人',selected:false},
		{name:'烫染高手',selected:false},
		{name:'整体造型',selected:false},
		{name:'经典剪裁',selected:false}
	];
	$scope.pointLabel = pointLabel;
	$scope.selectLabel = function (item){
		item.selected = !item.selected;
	};
	$scope.saveInformation = function (){
		$location.path('/');
	};
	$scope.chooseQrcode = function (){
		$location.path('chooseQrcode');
	};
}]);