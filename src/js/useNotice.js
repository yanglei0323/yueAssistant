index.controller('useNoticeCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.user=user;
	$scope.btnText = '一键生成海报';
	$scope.loading=false;
	$scope.showcanvas=true;
	$scope.canvasImg="";
	$scope.name = "请添加";
	$scope.zhekou = "八";
	$scope.lijian = "000";
	$scope.starttime = "08";
	$scope.endtime = "24";
	$scope.starttime1 = "08:00";
	$scope.endtime1 = "24:00";
	$scope.starttime2 = "2017.05.01";
	$scope.endtime2 = "2017.05.05";
	$scope.starttime3 = "01";
	$scope.endtime3 = "05";
	$scope.discount = "00";
	$scope.business = "06";
	$scope.businessMonth = "05";
	$scope.businessDate = "01";
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
	$scope.showImg='../../assets/images/notice/type'+num+'/img_'+$scope.page+'.png';
	for(var c=1;c<3;c++){
		var preImg='../../assets/images/notice/type'+num+'/img_'+c+'.png';
		$('.hideImg').append("<img src="+preImg+">");
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
		if(num == 1){
        	$(".name-input-fixed").show();
        }else if(num == 2 && $scope.page==1){
        	$(".name-input-fixed-1").show();
        }else if(num == 2 && $scope.page==2){
        	$(".name-input-fixed-2").show();
        }else if(num == 3 && $scope.page==1){
        	$(".name-input-fixed-3").show();
        }else if(num == 3 && $scope.page==2){
        	$(".name-input-fixed-4").show();
        }else if(num == 4 && $scope.page==1){
        	$(".name-input-fixed-5").show();
        }else if(num == 4 && $scope.page==2){
        	$(".name-input-fixed-6").show();
        }else if(num == 5 && $scope.page==1){
        	$(".name-input-fixed-7").show();
        }else if(num == 5 && $scope.page==2){
        	$(".name-input-fixed-8").show();
        }
	};
	// 完成添加文字
	$scope.updateText = function (){
		hechen();
		if(num == 1){
			$(".name-input-fixed").fadeOut(50);
        }else if(num == 2 && $scope.page==1){
        	$(".name-input-fixed-1").fadeOut(50);
        }else if(num == 2 && $scope.page==2){
        	$(".name-input-fixed-2").fadeOut(50);
        }else if(num == 3 && $scope.page==1){
        	$(".name-input-fixed-3").fadeOut(50);
        }else if(num == 3 && $scope.page==2){
        	$(".name-input-fixed-4").fadeOut(50);
        }else if(num == 4 && $scope.page==1){
        	$(".name-input-fixed-5").fadeOut(50);
        }else if(num == 4 && $scope.page==2){
        	$(".name-input-fixed-6").fadeOut(50);
        }else if(num == 5 && $scope.page==1){
        	$(".name-input-fixed-7").fadeOut(50);
        }else if(num == 5 && $scope.page==2){
        	$(".name-input-fixed-8").fadeOut(50);
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
			$scope.showImg='../../assets/images/notice/type'+num+'/img_'+$scope.page+'.png';
			$scope.loading=false;
		}else{
			$scope.page+=1;
			$scope.showImg='../../assets/images/notice/type'+num+'/img_'+$scope.page+'.png';
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
    	var mydate = new Date();
        var date = mydate.getFullYear()+'/'+(mydate.getMonth()+1)+'/'+mydate.getDate();
        // 获取月份转换为英文缩写
        var mm = mydate.getMonth()+1;  
        switch (mm) {  
          case 1:  
            mm = "JAN";  
            break;  
          case 2:  
            mm = "FEB";  
            break;  
          case 3:  
            mm = "MAR";  
            break;  
          case 4:  
            mm = "APR";  
            break;  
          case 5:  
            mm = "MAY";  
            break;  
          case 6:  
            mm = "JUN";  
            break;  
          case 7:  
            mm = "JUL";  
            break;  
          case 8:  
            mm = "AUG";  
            break;  
          case 9:  
            mm = "SEP";  
            break;  
          case 10:  
            mm = "OCT";  
            break;  
          case 11:  
            mm = "NOV";  
            break;  
          case 12:  
            mm = "DEC";  
            break;  
        } 
        // 星期英文转换
        var week =mydate.getDay();
        switch (week) {  
          case 0:  
            week = "Sunday";  
            break;  
          case 1:  
            week = "Monday";  
            break;  
          case 2:  
            week = "Tuesday";  
            break;  
          case 3:  
            week = "Wednesday";  
            break;  
          case 4:  
            week = "Thursday";  
            break;  
          case 5:  
            week = "Friday";  
            break;  
          case 6:  
            week = "Saturday";  
            break;  
        }
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
            if(num == 1){
            	//读取用户的文本
	            mainCtx.font = "normal bold 0.48rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#fff";
	            //从坐标点(50,50)开始绘制文字
	            var text1X=Math.floor(clientWidth*0.1133);
	            var text1Y=Math.floor(canvasHeight*0.88);
	            var text1Yy=Math.floor(canvasHeight*0.91);
	            var text1Yyy=Math.floor(canvasHeight*0.94);
	            mainCtx.fillText($scope.name,text1X,text1Y);
	            mainCtx.font = "normal bold 0.32rem myFirstFont";
	            mainCtx.fillText(mm+'.'+week,text1X,text1Yy);
	            mainCtx.fillText(date,text1X,text1Yyy);
            }else if(num == 2 && $scope.page==1){
	        	//读取用户的文本
	            mainCtx.font = "normal bold 0.48rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#fff";
	            //从坐标点(50,50)开始绘制文字
	            var text2X=Math.floor(clientWidth*0.5733);
	            var text2Xx=Math.floor(clientWidth*0.704);
	            var text2Y=Math.floor(canvasHeight*0.3999);
	            var text2Yy=Math.floor(canvasHeight*0.6372);
	            var text2Yyy=Math.floor(canvasHeight*0.6672);
	            var text2Yyyy=Math.floor(canvasHeight*0.6972);
	            mainCtx.fillText($scope.zhekou,text2X,text2Y);
	            mainCtx.fillStyle = "#333";
	            mainCtx.fillText($scope.name,text2Xx,text2Yy);
	            mainCtx.font = "normal bold 0.32rem myFirstFont";
	            mainCtx.fillText(mm+'.'+week,text2Xx,text2Yyy);
	            mainCtx.fillText(date,text2Xx,text2Yyyy);
	        }else if(num == 2 && $scope.page==2){
	        	//读取用户的文本
	            mainCtx.font = "normal bold 0.4rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#333";
	            //从坐标点(50,50)开始绘制文字
	            var text3X=Math.floor(clientWidth*0.3673);
	            var text3Xx=Math.floor(clientWidth*0.211);
	            var text3Y=Math.floor(canvasHeight*0.6567);
	            var text3Yy=Math.floor(canvasHeight*0.8685);
	            var text3Yyy=Math.floor(canvasHeight*0.8985);
	            var text3Yyyy=Math.floor(canvasHeight*0.9285);
	            mainCtx.fillText($scope.lijian,text3X,text3Y);

	            mainCtx.font = "normal bold 0.48rem myFirstFont";
	            mainCtx.fillStyle = "#fff";
	            mainCtx.fillText($scope.name,text3Xx,text3Yy);
	            mainCtx.font = "normal bold 0.32rem myFirstFont";
	            mainCtx.fillStyle = "#333";
	            mainCtx.fillText(mm+'.'+week,text3Xx,text3Yyy);
	            mainCtx.fillText(date,text3Xx,text3Yyyy);
	        }else if(num == 3 && $scope.page==1){
	        	//读取用户的文本
	            mainCtx.font = "normal bold 1.133333rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#b8742b";
	            //从坐标点(50,50)开始绘制文字
	            var text4X=Math.floor(clientWidth*0.2017);
	            var text4Xx=Math.floor(clientWidth*0.5803);
	            var text4Xxx=Math.floor(clientWidth*0.113);
	            var text4Y=Math.floor(canvasHeight*0.608);
	            var text4Yy=Math.floor(canvasHeight*0.8785);
	            var text4Yyy=Math.floor(canvasHeight*0.9085);
	            var text4Yyyy=Math.floor(canvasHeight*0.9385);
	            mainCtx.fillText($scope.starttime,text4X,text4Y);
	            mainCtx.fillText($scope.endtime,text4Xx,text4Y);

	            mainCtx.font = "normal bold 0.48rem myFirstFont";
	            mainCtx.fillStyle = "#333";
	            mainCtx.fillText($scope.name,text4Xxx,text4Yy);
	            mainCtx.font = "normal bold 0.32rem myFirstFont";
	            mainCtx.fillText(mm+'.'+week,text4Xxx,text4Yyy);
	            mainCtx.fillText(date,text4Xxx,text4Yyyy);
	        }else if(num == 3 && $scope.page==2){
	        	//读取用户的文本
	            mainCtx.font = "normal bold 0.64rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#fff";
	            //从坐标点(50,50)开始绘制文字
	            var text5X=Math.floor(clientWidth*0.246);
	            var text5Xx=Math.floor(clientWidth*0.5667);
	            var text5Xxx=Math.floor(clientWidth*0.113);
	            var text5Y=Math.floor(canvasHeight*0.463);
	            var text5Yy=Math.floor(canvasHeight*0.8785);
	            var text5Yyy=Math.floor(canvasHeight*0.9085);
	            var text5Yyyy=Math.floor(canvasHeight*0.9385);
	            mainCtx.fillText($scope.starttime1,text5X,text5Y);
	            mainCtx.fillText($scope.endtime1,text5Xx,text5Y);

	            mainCtx.font = "normal bold 0.48rem myFirstFont";
	            mainCtx.fillText($scope.name,text5Xxx,text5Yy);
	            mainCtx.font = "normal bold 0.32rem myFirstFont";
	            mainCtx.fillText(mm+'.'+week,text5Xxx,text5Yyy);
	            mainCtx.fillText(date,text5Xxx,text5Yyyy);
	        }else if(num == 4 && $scope.page==1){
	        	//读取用户的文本
	            mainCtx.font = "normal bold 0.64rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#000";
	            //从坐标点(50,50)开始绘制文字
	            var text6X=Math.floor(clientWidth*0.347);
	            var text6Y=Math.floor(canvasHeight*0.58);
	            mainCtx.fillText($scope.discount,text6X,text6Y);
	        }else if(num == 4 && $scope.page==2){
	        	//读取用户的文本
	            mainCtx.font = "normal bold 1.333333rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#f02964";
	            //从坐标点(50,50)开始绘制文字
	            var text7X=Math.floor(clientWidth*0.246);
	            var text7Xx=Math.floor(clientWidth*0.236);
	            var text7Xxx=Math.floor(clientWidth*0.5373);
	            var text7Y=Math.floor(canvasHeight*0.422);
	            var text7Yy=Math.floor(canvasHeight*0.6808);
	            mainCtx.fillText($scope.discount,text7X,text7Y);
	            mainCtx.font = "normal bold 0.48rem myFirstFont";
	            mainCtx.fillStyle = "#333";
	            mainCtx.fillText($scope.starttime2,text7Xx,text7Yy);
	            mainCtx.fillText($scope.endtime2,text7Xxx,text7Yy);
	        }else if(num == 5 && $scope.page==1){
	        	//读取用户的文本
	            mainCtx.font = "normal bold 1.333333rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#000";
	            //从坐标点(50,50)开始绘制文字
	            var text8X=Math.floor(clientWidth*0.1426);
	            var text8Xx=Math.floor(clientWidth*0.6013);
	            var text8Xxx=Math.floor(clientWidth*0.31);
	            var text8Xxxx=Math.floor(clientWidth*0.1333);

	            var text8Y=Math.floor(canvasHeight*0.4764);
	            var text8Yy=Math.floor(canvasHeight*0.7869);
	            var text8Yyy=Math.floor(canvasHeight*0.7669);
	            var text8Yyyy=Math.floor(canvasHeight*0.89);
	            var text8Yyyy1=Math.floor(canvasHeight*0.92);
	            var text8Yyyy2=Math.floor(canvasHeight*0.95);
	            mainCtx.fillText($scope.starttime3,text8X,text8Y);
	            mainCtx.fillText($scope.endtime3,text8Xx,text8Y);
	            mainCtx.font = "normal bold 0.48rem myFirstFont";
	            mainCtx.fillStyle = "#fb5b64";
	            mainCtx.fillText($scope.business,text8Xxx,text8Yy);
	            mainCtx.fillStyle = "#333";
	            mainCtx.fillText($scope.name,text8Xxxx,text8Yyyy);
	            mainCtx.font = "normal bold 0.32rem myFirstFont";
	            mainCtx.fillText(mm+'.'+week,text8Xxxx,text8Yyyy1);
	            mainCtx.fillText(date,text8Xxxx,text8Yyyy2);
	        }else if(num == 5 && $scope.page==2){
	        	//读取用户的文本
	            mainCtx.font = "normal bold 0.48rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#f6c33b";
	            //从坐标点(50,50)开始绘制文字
	            var text9X=Math.floor(clientWidth*0.298);
	            var text9Xx=Math.floor(clientWidth*0.415);
	            var text9Xxx=Math.floor(clientWidth*0.1333);

	            var text9Y=Math.floor(canvasHeight*0.801);

	            var text9Yyy=Math.floor(canvasHeight*0.89);
	            var text9Yyy1=Math.floor(canvasHeight*0.92);
	            var text9Yyy2=Math.floor(canvasHeight*0.95);
	            mainCtx.fillText($scope.businessMonth,text9X,text9Y);
	            mainCtx.fillText($scope.businessDate,text9Xx,text9Y);

	            mainCtx.fillStyle = "#333";
	            mainCtx.fillText($scope.name,text9Xxx,text9Yyy);
	            mainCtx.font = "normal bold 0.32rem myFirstFont";
	            mainCtx.fillText(mm+'.'+week,text9Xxx,text9Yyy1);
	            mainCtx.fillText(date,text9Xxx,text9Yyy2);
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