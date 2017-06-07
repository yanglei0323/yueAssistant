index.controller('useNoticeCtrl',
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
	var type = $routeParams.type;
	var num = $routeParams.num;
	// 第几张图片
	$scope.page=1;
	$scope.showImg='../../assets/images/notice/type'+type+'/img_'+num+'.png';
	// for(var c=1;c<3;c++){
	// 	var preImg='../../assets/images/notice/type'+num+'/img_'+c+'.png';
	// 	$('.hideImg').append("<img src="+preImg+">");
	// }
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
		if($scope.showmodel){
			return;
		}
		if(type == 1){
        	$(".name-input-fixed").show();
        }else if(type == 2 && num==1){
        	$(".name-input-fixed-1").show();
        }else if(type == 2 && num==2){
        	$(".name-input-fixed-2").show();
        }else if(type == 3 && num==1){
        	$(".name-input-fixed-3").show();
        }else if(type == 3 && num==2){
        	$(".name-input-fixed-4").show();
        }else if(type == 4 && num==1){
        	$(".name-input-fixed-5").show();
        }else if(type == 4 && num==2){
        	$(".name-input-fixed-6").show();
        }else if(type == 5 && num==1){
        	$(".name-input-fixed-7").show();
        }else if(type == 5 && num==2){
        	$(".name-input-fixed-8").show();
        }
	};
	// 完成添加文字
	$scope.updateText = function (){
		hechen();
		if(type == 1){
			$(".name-input-fixed").fadeOut(50);
        }else if(type == 2 && num==1){
        	$(".name-input-fixed-1").fadeOut(50);
        }else if(type == 2 && num==2){
        	$(".name-input-fixed-2").fadeOut(50);
        }else if(type == 3 && num==1){
        	$(".name-input-fixed-3").fadeOut(50);
        }else if(type == 3 && num==2){
        	$(".name-input-fixed-4").fadeOut(50);
        }else if(type == 4 && num==1){
        	$(".name-input-fixed-5").fadeOut(50);
        }else if(type == 4 && num==2){
        	$(".name-input-fixed-6").fadeOut(50);
        }else if(type == 5 && num==1){
        	$(".name-input-fixed-7").fadeOut(50);
        }else if(type == 5 && num==2){
        	$(".name-input-fixed-8").fadeOut(50);
        }
        $scope.fastuse=false;
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
		$scope.showmodel = false;
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
            if (navigator.userAgent.match(/iphone/i)) {
            	if(type == 1){
	            	//读取用户的文本
		            mainCtx.font = "normal bold 36px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text11X=Math.floor(clientWidth*0.1133);
		            var text11Y=Math.floor(canvasHeight*0.88);
		            var text11Yy=Math.floor(canvasHeight*0.91);
		            var text11Yyy=Math.floor(canvasHeight*0.94);
		            mainCtx.fillText($scope.name,text11X,text11Y);
		            mainCtx.font = "normal bold 24px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text11X,text11Yy);
		            mainCtx.fillText(date,text11X,text11Yyy);
	            }else if(type == 2 && num==1){
		            mainCtx.drawImage(qrcodeImg,(8/75)*canvasWidth,(1106/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
		        	//读取用户的文本
		            mainCtx.font = "normal bold 36px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text22X=Math.floor(clientWidth*0.5733);
		            var text22Xx=Math.floor(clientWidth*0.704);
		            var text22Y=Math.floor(canvasHeight*0.3999);
		            var text22Yy=Math.floor(canvasHeight*0.6372);
		            var text22Yyy=Math.floor(canvasHeight*0.6672);
		            var text22Yyyy=Math.floor(canvasHeight*0.6972);
		            mainCtx.fillText($scope.zhekou,text22X,text22Y);
		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText($scope.name,text22Xx,text22Yy);
		            mainCtx.font = "normal bold 24px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text22Xx,text22Yyy);
		            mainCtx.fillText(date,text22Xx,text22Yyyy);
		        }else if(type == 2 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(558/750)*canvasWidth,(1120/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
		        	//读取用户的文本
		            mainCtx.font = "normal bold 30px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#333";
		            //从坐标点(50,50)开始绘制文字
		            var text33X=Math.floor(clientWidth*0.3673);
		            var text33Xx=Math.floor(clientWidth*0.211);
		            var text33Y=Math.floor(canvasHeight*0.6567);
		            var text33Yy=Math.floor(canvasHeight*0.8685);
		            var text33Yyy=Math.floor(canvasHeight*0.8985);
		            var text33Yyyy=Math.floor(canvasHeight*0.9285);
		            mainCtx.fillText($scope.lijian,text33X,text33Y);

		            mainCtx.font = "normal bold 36px myFirstFont";
		            mainCtx.fillStyle = "#fff";
		            mainCtx.fillText($scope.name,text33Xx,text33Yy);
		            mainCtx.font = "normal bold 24px myFirstFont";
		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText(mm+'.'+week,text33Xx,text33Yyy);
		            mainCtx.fillText(date,text33Xx,text33Yyyy);
		        }else if(type == 3 && num==1){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(555/750)*canvasWidth,(1119/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
		        	//读取用户的文本
		            mainCtx.font = "normal bold 100px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#b8742b";
		            //从坐标点(50,50)开始绘制文字
		            var text44X=Math.floor(clientWidth*0.1917);
		            var text44Xx=Math.floor(clientWidth*0.5803);
		            var text44Xxx=Math.floor(clientWidth*0.113);
		            var text44Y=Math.floor(canvasHeight*0.608);
		            var text44Yy=Math.floor(canvasHeight*0.8785);
		            var text44Yyy=Math.floor(canvasHeight*0.9085);
		            var text44Yyyy=Math.floor(canvasHeight*0.9385);
		            mainCtx.fillText($scope.starttime,text44X,text44Y);
		            mainCtx.fillText($scope.endtime,text44Xx,text44Y);

		            mainCtx.font = "normal bold 36px myFirstFont";
		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText($scope.name,text44Xxx,text44Yy);
		            mainCtx.font = "normal bold 24px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text44Xxx,text44Yyy);
		            mainCtx.fillText(date,text44Xxx,text44Yyyy);
		        }else if(type == 3 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth,(786/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
		        	//读取用户的文本
		            mainCtx.font = "normal bold 48px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text55X=Math.floor(clientWidth*0.246);
		            var text55Xx=Math.floor(clientWidth*0.5667);
		            var text55Xxx=Math.floor(clientWidth*0.113);
		            var text55Y=Math.floor(canvasHeight*0.463);
		            var text55Yy=Math.floor(canvasHeight*0.8785);
		            var text55Yyy=Math.floor(canvasHeight*0.9085);
		            var text55Yyyy=Math.floor(canvasHeight*0.9385);
		            mainCtx.fillText($scope.starttime1,text55X,text55Y);
		            mainCtx.fillText($scope.endtime1,text55Xx,text55Y);

		            mainCtx.font = "normal bold 36px myFirstFont";
		            mainCtx.fillText($scope.name,text55Xxx,text55Yy);
		            mainCtx.font = "normal bold 24px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text55Xxx,text55Yyy);
		            mainCtx.fillText(date,text55Xxx,text55Yyyy);
		        }else if(type == 4 && num==1){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth,(1079/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
		        	//读取用户的文本
		            mainCtx.font = "normal bold 48px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            //从坐标点(50,50)开始绘制文字
		            var text66X=Math.floor(clientWidth*0.347);
		            var text66Y=Math.floor(canvasHeight*0.58);
		            mainCtx.fillText($scope.discount,text66X,text66Y);
		        }else if(type == 4 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth,(1090/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
		        	//读取用户的文本
		            mainCtx.font = "normal bold 100px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#f02964";
		            //从坐标点(50,50)开始绘制文字
		            var text77X=Math.floor(clientWidth*0.246);
		            var text77Xx=Math.floor(clientWidth*0.236);
		            var text77Xxx=Math.floor(clientWidth*0.5373);
		            var text77Y=Math.floor(canvasHeight*0.422);
		            var text77Yy=Math.floor(canvasHeight*0.6808);
		            mainCtx.fillText($scope.discount,text77X,text77Y);
		            mainCtx.font = "normal bold 36px myFirstFont";
		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText($scope.starttime2,text77Xx,text77Yy);
		            mainCtx.fillText($scope.endtime2,text77Xxx,text77Yy);
		        }else if(type == 5 && num==1){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(550/750)*canvasWidth,(1110/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
		        	//读取用户的文本
		            mainCtx.font = "normal bold 100px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            //从坐标点(50,50)开始绘制文字
		            var text88X=Math.floor(clientWidth*0.1426);
		            var text88Xx=Math.floor(clientWidth*0.6013);
		            var text88Xxx=Math.floor(clientWidth*0.31);
		            var text88Xxxx=Math.floor(clientWidth*0.1333);

		            var text88Y=Math.floor(canvasHeight*0.4764);
		            var text88Yy=Math.floor(canvasHeight*0.7869);
		            var text88Yyy=Math.floor(canvasHeight*0.7669);
		            var text88Yyyy=Math.floor(canvasHeight*0.89);
		            var text88Yyyy1=Math.floor(canvasHeight*0.92);
		            var text88Yyyy2=Math.floor(canvasHeight*0.95);
		            mainCtx.fillText($scope.starttime3,text88X,text88Y);
		            mainCtx.fillText($scope.endtime3,text88Xx,text88Y);
		            mainCtx.font = "normal bold 36px myFirstFont";
		            mainCtx.fillStyle = "#fb5b64";
		            mainCtx.fillText($scope.business,text88Xxx,text88Yy);
		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText($scope.name,text88Xxxx,text88Yyyy);
		            mainCtx.font = "normal bold 24px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text88Xxxx,text88Yyyy1);
		            mainCtx.fillText(date,text88Xxxx,text88Yyyy2);
		        }else if(type == 5 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(551/750)*canvasWidth,(1111/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
		        	//读取用户的文本
		            mainCtx.font = "normal bold 30px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#f6c33b";
		            //从坐标点(50,50)开始绘制文字
		            var text99X=Math.floor(clientWidth*0.298);
		            var text99Xx=Math.floor(clientWidth*0.415);
		            var text99Xxx=Math.floor(clientWidth*0.1333);

		            var text99Y=Math.floor(canvasHeight*0.801);

		            var text99Yyy=Math.floor(canvasHeight*0.89);
		            var text99Yyy1=Math.floor(canvasHeight*0.92);
		            var text99Yyy2=Math.floor(canvasHeight*0.95);
		            mainCtx.fillText($scope.businessMonth,text99X,text99Y);
		            mainCtx.fillText($scope.businessDate,text99Xx,text99Y);

		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText($scope.name,text99Xxx,text99Yyy);
		            mainCtx.font = "normal bold 24px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text99Xxx,text99Yyy1);
		            mainCtx.fillText(date,text99Xxx,text99Yyy2);
		        }
            }else{
            	if(type == 1){
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
	            }else if(type == 2 && num==1){
	            	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(8/75)*canvasWidth,(1106/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
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
		        }else if(type == 2 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(558/750)*canvasWidth,(1120/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
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
		        }else if(type == 3 && num==1){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(555/750)*canvasWidth,(1119/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
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
		        }else if(type == 3 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth,(786/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
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
		        }else if(type == 4 && num==1){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth,(1079/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
		        	//读取用户的文本
		            mainCtx.font = "normal bold 0.64rem myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            //从坐标点(50,50)开始绘制文字
		            var text6X=Math.floor(clientWidth*0.347);
		            var text6Y=Math.floor(canvasHeight*0.58);
		            mainCtx.fillText($scope.discount,text6X,text6Y);
		        }else if(type == 4 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth,(1090/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
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
		        }else if(type == 5 && num==1){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(550/750)*canvasWidth,(1110/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
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
		        }else if(type == 5 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(551/750)*canvasWidth,(1111/1334)*canvasHeight,(14/75)*canvasWidth,(14/75)*canvasWidth);
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