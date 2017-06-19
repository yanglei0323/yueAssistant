index.controller('useActiveCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.fastuse=true;
	$scope.user=user;
	$scope.btnText = '一键生成海报';
	$scope.loading=false;
	$scope.showcanvas=true;
	$scope.showmodel=false;
	$scope.canvasImg="";
	$scope.name = "请添加";
	$scope.startTime = "13:00";
	$scope.endTime = "18:00";
	$scope.startHour = "13";
	$scope.startMinute = "00";
	$scope.endHour = "18";
	$scope.endMinute = "00";
	$scope.startMonth = "05";
	$scope.startDate = "01";
	$scope.endMonth = "05";
	$scope.endDate = "15";
	$scope.colorPrice ="88";
	$scope.permPrice ="88";
	$scope.day ="2";
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
	$scope.showImg='../../assets/images/notice/type6/img_'+num+'.png';
	// 完善信息页面跳转
	$scope.editInformation = function (e){
		e.stopPropagation();
		$location.path('editInformation');
	};
	// 立即使用
	$scope.useTemplatePage = function (e){
		e.stopPropagation();
		saveImageInfo();
		$scope.showmodel=true;
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
		$scope.fastuse=true;
		$scope.name = "";
		$scope.startTime = "";
		$scope.endTime = "";
		$scope.startHour = "";
		$scope.startMinute = "";
		$scope.endHour = "";
		$scope.endMinute = "";
		$scope.startMonth = "";
		$scope.startDate = "";
		$scope.endMonth = "";
		$scope.endDate = "";
		$scope.colorPrice ="";
		$scope.permPrice ="";
		$scope.day ="";
		if($scope.showmodel){
			return;
		}
		if(num == 1){
        	$(".name-input-fixed").show();
        }else if(num == 2){
        	$(".name-input-fixed-1").show();
        }else if(num == 3){
        	$(".name-input-fixed-2").show();
        }else if(num == 4){
        	$(".name-input-fixed-3").show();
        }else if(num == 5){
        	$(".name-input-fixed-4").show();
        }else if(num == 6){
        	$(".name-input-fixed-5").show();
        }else if(num == 7){
        	$scope.fastuse=false;
        	hechen();
        	return;
        }else if(num == 8){
        	$(".name-input-fixed-7").show();
        }else if(num == 9){
        	$(".name-input-fixed-8").show();
        }else if(num == 10){
        	$(".name-input-fixed-9").show();
        }else if(num == 11){
        	$(".name-input-fixed-10").show();
        }
	};
	// 完成添加文字
	$scope.updateText = function (){
		hechen();
		if(num == 1){
			$(".name-input-fixed").fadeOut(50);
        }else if(num == 2 ){
        	$(".name-input-fixed-1").fadeOut(50);
        }else if(num == 3 ){
        	$(".name-input-fixed-2").fadeOut(50);
        }else if(num == 4 ){
        	$(".name-input-fixed-3").fadeOut(50);
        }else if(num == 5 ){
        	$(".name-input-fixed-4").fadeOut(50);
        }else if(num == 6 ){
        	$(".name-input-fixed-5").fadeOut(50);
        }else if(num == 7 ){
        	$(".name-input-fixed-6").fadeOut(50);
        }else if(num == 8 ){
        	$(".name-input-fixed-7").fadeOut(50);
        }else if(num == 9 ){
        	$(".name-input-fixed-8").fadeOut(50);
        }else if(num == 10 ){
        	$(".name-input-fixed-9").fadeOut(50);
        }else if(num == 11 ){
        	$(".name-input-fixed-10").fadeOut(50);
        }
        $scope.fastuse=false;
	};
	// 关闭弹窗
	$scope.closeText = function (e){
		e.stopPropagation();
		$scope.user.iscomplete = true;
	};
	// 切换图片
	// $scope.changeImg =function (e){
	// 	e.stopPropagation();
	// 	$scope.loading=true;
	// 	if($scope.page >=2){
	// 		$scope.page=1;
	// 		$scope.showImg='../../assets/images/notice/type6/img_'+num+'.png';
	// 		$scope.loading=false;
	// 	}else{
	// 		$scope.page+=1;
	// 		$scope.showImg='../../assets/images/notice/type6/img_'+num+'.png';
	// 		$scope.loading=false;
	// 	}
	// 	hechen();
	// };
	var mainCtx = getCanvasContext('main');
    mainCtx.width =canvasWidth;
    mainCtx.height = canvasHeight;
    // mainCtx.clearRect(0,0,1000,1000);
    // console.log(mainCtx.width+'----'+canvasWidth);

    // polyfill 提供了这个方法用来获取设备的 pixel ratio
    var getPixelRatio = function(context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
    
        return (window.devicePixelRatio || 1) / backingStore;
    };

    var ratio = getPixelRatio(mainCtx);
	$(function(){
        hechen();
    });
    // 生成个人主页二维码
	var pageqrcode= $('.hideImg').qrcode({width: 200,height: 200,correctLevel:0,text:'http://syrapi.yueyishujia.com/yueAssistant/build/html/homePage/'+$scope.user.uuid}).hide();   
	var qrcodecanvas=pageqrcode.find('canvas').get(0);  
	 // 添加二维码
	// var pageqrcode = picBasePath + $scope.user.pageqrcode;
	var pageqrcodeimg = qrcodecanvas.toDataURL('image/jpg');
    var qrcodeImg = new Image();
    // qrcodeImg.crossOrigin = "Anonymous"; 
    // qrcodeImg.setAttribute('crossOrigin', 'anonymous');
    qrcodeImg.src = pageqrcodeimg;

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
        // var mainCtx = getCanvasContext('main');
        // var maxWidth = mainCtx.width;
        // var maxHeight = mainCtx.height;
        // mainCtx.clearRect(0,0,1000,1000);
        //因为没法直接读取本地图片 所以做了这部操作

        var starImg = new Image();
        starImg.src=$scope.showImg;
        starImg.onload=function(){
            //先把图片绘制在这里
            mainCtx.drawImage(starImg,0,0,canvasWidth*ratio,canvasHeight*ratio);
            if (navigator.userAgent.match(/iphone/i)) {
            	if(num == 1){
		            mainCtx.drawImage(qrcodeImg,(36/750)*canvasWidth*ratio,(1142/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+60/750*canvasWidth+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            mainCtx.textAlign='left';
		            //从坐标点(50,50)开始绘制文字
		            var text11X=Math.floor(clientWidth*0.212);
		            var text11Xx=Math.floor(clientWidth*0.5767);
		            var text11Xxx=Math.floor(clientWidth*0.5);

		            var text11Y=Math.floor(canvasHeight*0.394);
		            var text11Yy=Math.floor(canvasHeight*0.3284);

		            mainCtx.fillText($scope.startTime,text11X,text11Y);
		            mainCtx.fillText($scope.endTime,text11Xx,text11Y);
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            mainCtx.textAlign='center';
		            mainCtx.fillText($scope.name,text11Xxx,text11Yy);

	            }else if(num == 2){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1152/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+34/750*canvasWidth+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text22X=Math.floor(clientWidth*0.5);
		            var text22Xx=Math.floor(clientWidth*0.5667);

		            var text22X1=Math.floor(clientWidth*0.2267);
		            var text22X2=Math.floor(clientWidth*0.3017);
		            var text22X3=Math.floor(clientWidth*0.3767);
		            var text22X4=Math.floor(clientWidth*0.6296);
		            var text22X5=Math.floor(clientWidth*0.6996);
		            var text22X6=Math.floor(clientWidth*0.7696);

		            var text22Y=Math.floor(canvasHeight*0.1147);
		            var text22Yy=Math.floor(canvasHeight*0.3082);
		            var text22Yyy=Math.floor(canvasHeight*0.737);

		            mainCtx.fillText(date,text22X,text22Y);

		            mainCtx.font = "normal bold "+48/750*canvasWidth+"px myFirstFont";
		            mainCtx.fillStyle = "#000";
		            mainCtx.fillText($scope.name,text22X,text22Yy);
		            //设置用户文本填充颜色
		            mainCtx.fillText($scope.startHour,text22X1,text22Yyy);
		            mainCtx.fillText($scope.startMinute,text22X3,text22Yyy);
		            mainCtx.fillText($scope.endHour,text22X4,text22Yyy);
		            mainCtx.fillText($scope.endMinute,text22X6,text22Yyy);

		            mainCtx.fillStyle = "#fff";
		            mainCtx.fillText(":",text22X2,text22Yyy);
		            mainCtx.fillText(":",text22X5,text22Yyy);
	            }else if(num == 3){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1114/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+48/750*canvasWidth+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text33X=Math.floor(clientWidth*0.5);
		            var text33Xx=Math.floor(clientWidth*0.5667);

		            var text33X1=Math.floor(clientWidth*0.2267);
		            var text33X2=Math.floor(clientWidth*0.3017);
		            var text33X3=Math.floor(clientWidth*0.3767);
		            var text33X4=Math.floor(clientWidth*0.6296);
		            var text33X5=Math.floor(clientWidth*0.6996);
		            var text33X6=Math.floor(clientWidth*0.7696);

		            var text33Y=Math.floor(canvasHeight*0.1147);
		            var text33Yy=Math.floor(canvasHeight*0.3082);
		            var text33Yyy=Math.floor(canvasHeight*0.802);

		            //设置用户文本填充颜色
		            mainCtx.fillText($scope.startHour,text33X1,text33Yyy);
		            mainCtx.fillText($scope.startMinute,text33X3,text33Yyy);
		            mainCtx.fillText($scope.endHour,text33X4,text33Yyy);
		            mainCtx.fillText($scope.endMinute,text33X6,text33Yyy);

		            mainCtx.fillText(":",text33X2,text33Yyy);
		            mainCtx.fillText(":",text33X5,text33Yyy);
	            }else if(num == 4){
		            mainCtx.drawImage(qrcodeImg,(64/750)*canvasWidth*ratio,(1126/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+36/750*canvasWidth+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text44X=Math.floor(clientWidth*0.747);
		            var text44Y=Math.floor(canvasHeight*0.922);
		            mainCtx.fillText($scope.name,text44X,text44Y);
	            }else if(num == 5){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1110/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+72/750*canvasWidth+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#244678";
		            mainCtx.textAlign='left';
		            //从坐标点(50,50)开始绘制文字
		            var text55X=Math.floor(clientWidth*0.2693);
		            var text55Xx=Math.floor(clientWidth*0.522);
		            var text55Xxx=Math.floor(clientWidth*0.69);

		            var text55Y=Math.floor(canvasHeight*0.3355);
		            var text55Yy=Math.floor(canvasHeight*0.4669);
		            var text55Yyy=Math.floor(canvasHeight*0.616);
		            var text55Yyyy=Math.floor(canvasHeight*0.701);
		            mainCtx.fillText($scope.startMonth,text55X,text55Y);
		            mainCtx.fillText($scope.startDate,text55Xx,text55Y);
		            mainCtx.fillText($scope.endMonth,text55X,text55Yy);
		            mainCtx.fillText($scope.endDate,text55Xx,text55Yy);


		            mainCtx.textAlign='center';
		            mainCtx.fillStyle = "#fff";
		            mainCtx.fillText($scope.colorPrice,text55Xxx,text55Yyy);
		            mainCtx.fillText($scope.permPrice,text55Xxx,text55Yyyy);

	            }else if(num == 6){
		            mainCtx.drawImage(qrcodeImg,(52/750)*canvasWidth*ratio,(1130/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+45/750*canvasWidth+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            mainCtx.textAlign='right';
		            //从坐标点(50,50)开始绘制文字
		            var text66X=Math.floor(clientWidth*0.951);
		            var text66Y=Math.floor(canvasHeight*0.244);
		            mainCtx.fillText($scope.name,text66X,text66Y);
	            }else if(num == 7){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1143/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	var date1 = mydate.getDate()+'/'+(mydate.getMonth()+1)+'/'+mydate.getFullYear();
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+48/750*canvasWidth+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text77X=Math.floor(clientWidth*0.5);
		            var text77Y=Math.floor(canvasHeight*0.6587);
		            mainCtx.fillText(date1,text77X,text77Y);
	            }else if(num == 8){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1136/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+300/750*canvasWidth+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#af0008";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text88X=Math.floor(clientWidth*0.5);
		            var text88Y=Math.floor(canvasHeight*0.7261);
		            mainCtx.fillText($scope.day,text88X,text88Y);
	            }else if(num == 9){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1109/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+48/750*canvasWidth+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text99X=Math.floor(clientWidth*0.51);
		            var text99Y=Math.floor(canvasHeight*0.509);
		            var text99Yy=Math.floor(canvasHeight*0.589);
		            mainCtx.fillText($scope.colorPrice,text99X,text99Y);
		            mainCtx.fillText($scope.permPrice,text99X,text99Yy);
	            }else if(num == 10){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1148/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+48/750*canvasWidth+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text110X=Math.floor(clientWidth*0.50);
		            var text110Xx=Math.floor(clientWidth*0.14);

		            var text110Y=Math.floor(canvasHeight*0.7364);
		            var text110Yy=Math.floor(canvasHeight*0.8052);
		            mainCtx.fillText($scope.name,text110X,text110Y);
		            //读取用户的文本
		            mainCtx.font = "normal bold "+72/750*canvasWidth+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#324ee9";
		            mainCtx.textAlign='left';
		            mainCtx.fillText($scope.startDate,text110Xx,text110Yy);
	            }
            }else{
            	if(num == 1){
		            mainCtx.drawImage(qrcodeImg,(36/750)*canvasWidth*ratio,(1142/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold 0.8rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            mainCtx.textAlign='left';
		            //从坐标点(50,50)开始绘制文字
		            var text1X=Math.floor(clientWidth*0.212);
		            var text1Xx=Math.floor(clientWidth*0.5767);
		            var text1Xxx=Math.floor(clientWidth*0.5);

		            var text1Y=Math.floor(canvasHeight*0.394);
		            var text1Yy=Math.floor(canvasHeight*0.3284);

		            mainCtx.fillText($scope.startTime,text1X,text1Y);
		            mainCtx.fillText($scope.endTime,text1Xx,text1Y);
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            mainCtx.textAlign='center';
		            mainCtx.fillText($scope.name,text1Xxx,text1Yy);

	            }else if(num == 2){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1152/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold 0.453333rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text2X=Math.floor(clientWidth*0.5);
		            var text2Xx=Math.floor(clientWidth*0.5667);

		            var text2X1=Math.floor(clientWidth*0.2267);
		            var text2X2=Math.floor(clientWidth*0.3017);
		            var text2X3=Math.floor(clientWidth*0.3767);
		            var text2X4=Math.floor(clientWidth*0.6296);
		            var text2X5=Math.floor(clientWidth*0.6996);
		            var text2X6=Math.floor(clientWidth*0.7696);

		            var text2Y=Math.floor(canvasHeight*0.1147);
		            var text2Yy=Math.floor(canvasHeight*0.3082);
		            var text2Yyy=Math.floor(canvasHeight*0.737);

		            mainCtx.fillText(date,text2X,text2Y);

		            mainCtx.font = "normal bold 0.533333rem myFirstFont";
		            mainCtx.fillStyle = "#000";
		            mainCtx.fillText($scope.name,text2X,text2Yy);
		            //设置用户文本填充颜色
		            mainCtx.fillText($scope.startHour,text2X1,text2Yyy);
		            mainCtx.fillText($scope.startMinute,text2X3,text2Yyy);
		            mainCtx.fillText($scope.endHour,text2X4,text2Yyy);
		            mainCtx.fillText($scope.endMinute,text2X6,text2Yyy);

		            mainCtx.fillStyle = "#fff";
		            mainCtx.fillText(":",text2X2,text2Yyy);
		            mainCtx.fillText(":",text2X5,text2Yyy);
	            }else if(num == 3){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1114/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold 0.64rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text3X=Math.floor(clientWidth*0.5);
		            var text3Xx=Math.floor(clientWidth*0.5667);

		            var text3X1=Math.floor(clientWidth*0.2267);
		            var text3X2=Math.floor(clientWidth*0.3017);
		            var text3X3=Math.floor(clientWidth*0.3767);
		            var text3X4=Math.floor(clientWidth*0.6296);
		            var text3X5=Math.floor(clientWidth*0.6996);
		            var text3X6=Math.floor(clientWidth*0.7696);

		            var text3Y=Math.floor(canvasHeight*0.1147);
		            var text3Yy=Math.floor(canvasHeight*0.3082);
		            var text3Yyy=Math.floor(canvasHeight*0.802);

		            //设置用户文本填充颜色
		            mainCtx.fillText($scope.startHour,text3X1,text3Yyy);
		            mainCtx.fillText($scope.startMinute,text3X3,text3Yyy);
		            mainCtx.fillText($scope.endHour,text3X4,text3Yyy);
		            mainCtx.fillText($scope.endMinute,text3X6,text3Yyy);

		            mainCtx.fillText(":",text3X2,text3Yyy);
		            mainCtx.fillText(":",text3X5,text3Yyy);
	            }else if(num == 4){
		            mainCtx.drawImage(qrcodeImg,(64/750)*canvasWidth*ratio,(1126/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold 0.48rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text4X=Math.floor(clientWidth*0.747);
		            var text4Y=Math.floor(canvasHeight*0.922);
		            mainCtx.fillText($scope.name,text4X,text4Y);
	            }else if(num == 5){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1110/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold 0.96rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#244678";
		            mainCtx.textAlign='left';
		            //从坐标点(50,50)开始绘制文字
		            var text5X=Math.floor(clientWidth*0.2693);
		            var text5Xx=Math.floor(clientWidth*0.522);
		            var text5Xxx=Math.floor(clientWidth*0.69);

		            var text5Y=Math.floor(canvasHeight*0.3355);
		            var text5Yy=Math.floor(canvasHeight*0.4669);
		            var text5Yyy=Math.floor(canvasHeight*0.616);
		            var text5Yyyy=Math.floor(canvasHeight*0.701);
		            mainCtx.fillText($scope.startMonth,text5X,text5Y);
		            mainCtx.fillText($scope.startDate,text5Xx,text5Y);
		            mainCtx.fillText($scope.endMonth,text5X,text5Yy);
		            mainCtx.fillText($scope.endDate,text5Xx,text5Yy);


		            mainCtx.textAlign='center';
		            mainCtx.fillStyle = "#fff";
		            mainCtx.fillText($scope.colorPrice,text5Xxx,text5Yyy);
		            mainCtx.fillText($scope.permPrice,text5Xxx,text5Yyyy);

	            }else if(num == 6){
		            mainCtx.drawImage(qrcodeImg,(52/750)*canvasWidth*ratio,(1130/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold 0.6rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            mainCtx.textAlign='right';
		            //从坐标点(50,50)开始绘制文字
		            var text6X=Math.floor(clientWidth*0.951);
		            var text6Y=Math.floor(canvasHeight*0.244);
		            mainCtx.fillText($scope.name,text6X,text6Y);
	            }else if(num == 7){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1143/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	var date11 = mydate.getDate()+'/'+(mydate.getMonth()+1)+'/'+mydate.getFullYear();
	            	//读取用户的文本
		            mainCtx.font = "normal bold 0.6rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text7X=Math.floor(clientWidth*0.5);
		            var text7Y=Math.floor(canvasHeight*0.6587);
		            mainCtx.fillText(date11,text7X,text7Y);
	            }else if(num == 8){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1136/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold 4.0rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#af0008";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text8X=Math.floor(clientWidth*0.5);
		            var text8Y=Math.floor(canvasHeight*0.7261);
		            mainCtx.fillText($scope.day,text8X,text8Y);
	            }else if(num == 9){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1109/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold 0.64rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text9X=Math.floor(clientWidth*0.51);
		            var text9Y=Math.floor(canvasHeight*0.509);
		            var text9Yy=Math.floor(canvasHeight*0.589);
		            mainCtx.fillText($scope.colorPrice,text9X,text9Y);
		            mainCtx.fillText($scope.permPrice,text9X,text9Yy);
	            }else if(num == 10){
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*ratio,(1148/1334)*canvasHeight*ratio,(14/75)*canvasWidth*ratio,(14/75)*canvasWidth*ratio);
	            	//读取用户的文本
		            mainCtx.font = "normal bold 0.64rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            mainCtx.textAlign='center';
		            //从坐标点(50,50)开始绘制文字
		            var text10X=Math.floor(clientWidth*0.50);
		            var text10Xx=Math.floor(clientWidth*0.14);

		            var text10Y=Math.floor(canvasHeight*0.7364);
		            var text10Yy=Math.floor(canvasHeight*0.8052);
		            mainCtx.fillText($scope.name,text10X,text10Y);
		            //读取用户的文本
		            mainCtx.font = "normal bold 0.96rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#324ee9";
		            mainCtx.textAlign='left';
		            mainCtx.fillText($scope.startDate,text10Xx,text10Yy);
	            }
            }
            
            

        };

    }

    function getCanvasContext(id){
        return document.getElementById(id).getContext("2d");
    }

    function saveImageInfo() {
        $scope.showcanvas=false;
        var mycanvas = document.getElementById("main");
        var image = mycanvas.toDataURL("image/jpeg",0.7);
        $scope.canvasImg =image;
        $scope.btnText = '长按保存至手机，再发到朋友圈炫耀';
    }

    function saveAsLocalImage(){
        var myCanvas = document.getElementById("main");
        var image = myCanvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
        window.location.href=image;
    }
}]);