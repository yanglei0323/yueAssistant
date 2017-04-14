index.controller('useGreetCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.user=user;
	$scope.btnText = '一键生成海报';
	$scope.loading=false;
	$scope.showcanvas=true;
	$scope.canvasImg="";
	$scope.title = "点击添加标题";
	$scope.desc = "点击添加海报描述";
	$scope.desc1 = "点击添加海报描述";
	$scope.desc2 = "点击添加海报描述";
	$scope.desc3 = "点击添加海报描述";
	var clientWidth = document.documentElement.clientWidth;
	var canvasWidth = Math.floor(clientWidth);
	var canvasHeight = Math.floor(clientWidth*1.83);
	$("#main").attr('width',canvasWidth+'px');
	$("#main").attr('height',canvasHeight+'px');
	console.log($scope.user);
	// 类型type
	var num = $routeParams.num;
	// 第几张图片
	$scope.page=1;
	$scope.showImg='../../assets/images/greet/type'+num+'/img_'+$scope.page+'.png';
	for(var c=1;c<3;c++){
		var preImg='../../assets/images/greet/type'+num+'/img_'+c+'.png';
		$('#starImg').append("<img src="+preImg+">");
	}
	// 完善信息页面跳转
	$scope.editInformation = function (e){
		e.stopPropagation();
		$location.path('editInformation');
	};
	// 立即使用
	$scope.useTemplatePage = function (e){
		e.stopPropagation();
		saveImageInfo();
		$scope.btnText = '长按保存至手机，再发到朋友圈炫耀';
		// saveImageInfo();
	};
	// 返回
	$scope.goBack = function (e){
		e.stopPropagation();
		$window.history.back();
	};
	// 点击添加文字
	$scope.chengeText = function (){
		if(num == 1 && $scope.page == 1){
        	$(".name-input-fixed-1").show();
        }
        else if(num == 1 && $scope.page == 2){
        	$(".name-input-fixed-2").show();
        }
	};
	// 完成添加文字
	$scope.updateText = function (){
		hechen();
		if(num == 1 && $scope.page == 1){
        	$(".name-input-fixed-1").fadeOut(50);
        }
        else if(num == 1 && $scope.page == 2){
        	$(".name-input-fixed-2").fadeOut(50);
        }
	};
	// 关闭弹窗
	$scope.closeText = function (e){
		e.stopPropagation();
		$scope.user.iscomplete = true;
	};
	// 切换图片
	$scope.changeImg =function (e){
		e.stopPropagation();
		$scope.loading=true;
		if($scope.page >=2){
			$scope.page=1;
			$scope.showImg='../../assets/images/greet/type'+num+'/img_'+$scope.page+'.png';
			$scope.loading=false;
		}else{
			$scope.page+=1;
			$scope.showImg='../../assets/images/greet/type'+num+'/img_'+$scope.page+'.png';
			$scope.loading=false;
		}
		hechen();
	};

	$(function(){
        hechen();
    });

    function hechen(){
    	$scope.btnText = '一键生成海报';
    	$scope.showcanvas=true;
        var mainCtx = getCanvasContext('main');
        var maxWidth = mainCtx.width;
        var maxHeight = mainCtx.height;
        mainCtx.clearRect(0,0,1000,1000);
        //因为没法直接读取本地图片 所以做了这部操作

        var starImg = new Image();
        starImg.src=$scope.showImg;
        starImg.onload=function(){
            //先把图片绘制在这里
            mainCtx.drawImage(starImg,0,0,canvasWidth,canvasHeight);
            if(num == 1 && $scope.page == 1){
            	//读取用户的文本
	            mainCtx.font = "normal bold 0.96rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#fff";
	            //从坐标点(50,50)开始绘制文字
	            var text1X=Math.floor(clientWidth*0.066);
	            var text1Xx=Math.floor(clientWidth*0.1466);
	            var text1Y=Math.floor(canvasHeight*0.145);
	            var text1Yy=Math.floor(canvasHeight*0.349);
	            mainCtx.fillText($scope.title,text1X,text1Y);

	            //读取用户的文本
	            mainCtx.font = "normal bold 0.4rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#0f0f0b";
	            mainCtx.fillText($scope.desc,text1Xx,text1Yy);
            }else if(num == 1 && $scope.page == 2){
            	//读取用户的文本
	            mainCtx.font = "normal bold 0.4rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#fff";
	            //从坐标点(50,50)开始绘制文字
	            var text2X=Math.floor(clientWidth*0.586);
	            var text2Y=Math.floor(canvasHeight*0.731);
	            var text2Yy=Math.floor(canvasHeight*0.6848);
	            var text2Yyy=Math.floor(canvasHeight*0.638);
	            mainCtx.fillText($scope.desc3,text2X,text2Y);

	            
	            mainCtx.fillText($scope.desc2,text2X,text2Yy);
	            mainCtx.fillText($scope.desc1,text2X,text2Yyy);
            }
            

        };

    }

    function getCanvasContext(id){
        return document.getElementById(id).getContext("2d");
    }

    function saveImageInfo() {
        $scope.showcanvas=false;
        var mycanvas = document.getElementById("main");
        var image = mycanvas.toDataURL("image/jpg");
        $scope.canvasImg =image;
        $scope.btnText = '长按保存至手机，再发到朋友圈炫耀';
    }

    function saveAsLocalImage(){
        var myCanvas = document.getElementById("main");
        var image = myCanvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
        window.location.href=image;
    }
}]);