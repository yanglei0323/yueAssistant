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
	$("#main").css('width',canvasWidth+'px');
	$("#main").css('height',canvasHeight+'px');
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
		$scope.name = "";
		$scope.zhekou = "";
		$scope.lijian = "";
		$scope.starttime = "";
		$scope.endtime = "";
		$scope.starttime1 = "";
		$scope.endtime1 = "";
		$scope.starttime2 = "";
		$scope.endtime2 = "";
		$scope.starttime3 = "";
		$scope.endtime3 = "";
		$scope.discount = "";
		$scope.business = "";
		$scope.businessMonth = "";
		$scope.businessDate = "";
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
	var canvas= document.getElementById("main");
	var mainCtx = canvas.getContext('2d');
    canvas.width =canvasWidth*2;
    canvas.height = canvasHeight*2;
    // mainCtx.clearRect(0,0,1000,1000);
    // console.log(mainCtx.width+'----'+canvasWidth);

    // polyfill 提供了这个方法用来获取设备的 pixel ratio
    // var getPixelRatio = function(context) {
    //     var backingStore = context.backingStorePixelRatio ||
    //         context.webkitBackingStorePixelRatio ||
    //         context.mozBackingStorePixelRatio ||
    //         context.msBackingStorePixelRatio ||
    //         context.oBackingStorePixelRatio ||
    //         context.backingStorePixelRatio || 1;
    
    //     return (window.devicePixelRatio || 1) / backingStore;
    // };

    // var ratio = getPixelRatio(mainCtx);
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
        
        //因为没法直接读取本地图片 所以做了这部操作

        var starImg = new Image();
        starImg.src=$scope.showImg;
        starImg.onload=function(){
            //先把图片绘制在这里
            mainCtx.drawImage(starImg,0,0,canvasWidth*2,canvasHeight*2);
            	if(type == 1){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text11X=Math.floor(clientWidth*0.1133*2);
		            var text11Y=Math.floor(canvasHeight*0.88*2);
		            var text11Yy=Math.floor(canvasHeight*0.91*2);
		            var text11Yyy=Math.floor(canvasHeight*0.94*2);
		            mainCtx.fillText($scope.name,text11X,text11Y);
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text11X,text11Yy);
		            mainCtx.fillText(date,text11X,text11Yyy);
	            }else if(type == 2 && num==1){
		            mainCtx.drawImage(qrcodeImg,(8/75)*canvasWidth*2,(1106/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
		        	//读取用户的文本
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text22X=Math.floor(clientWidth*0.5733*2);
		            var text22Xx=Math.floor(clientWidth*0.704*2);
		            var text22Y=Math.floor(canvasHeight*0.3999*2);
		            var text22Yy=Math.floor(canvasHeight*0.6372*2);
		            var text22Yyy=Math.floor(canvasHeight*0.6672*2);
		            var text22Yyyy=Math.floor(canvasHeight*0.6972*2);
		            mainCtx.fillText($scope.zhekou,text22X,text22Y);
		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText($scope.name,text22Xx,text22Yy);
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text22Xx,text22Yyy);
		            mainCtx.fillText(date,text22Xx,text22Yyyy);
		        }else if(type == 2 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(558/750)*canvasWidth*2,(1120/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
		        	//读取用户的文本
		            mainCtx.font = "normal bold "+30/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#333";
		            //从坐标点(50,50)开始绘制文字
		            var text33X=Math.floor(clientWidth*0.3673*2);
		            var text33Xx=Math.floor(clientWidth*0.211*2);
		            var text33Y=Math.floor(canvasHeight*0.6567*2);
		            var text33Yy=Math.floor(canvasHeight*0.8685*2);
		            var text33Yyy=Math.floor(canvasHeight*0.8985*2);
		            var text33Yyyy=Math.floor(canvasHeight*0.9285*2);
		            mainCtx.fillText($scope.lijian,text33X,text33Y);

		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillStyle = "#fff";
		            mainCtx.fillText($scope.name,text33Xx,text33Yy);
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText(mm+'.'+week,text33Xx,text33Yyy);
		            mainCtx.fillText(date,text33Xx,text33Yyyy);
		        }else if(type == 3 && num==1){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(555/750)*canvasWidth*2,(1119/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
		        	//读取用户的文本
		            mainCtx.font = "normal bold "+100/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#b8742b";
		            //从坐标点(50,50)开始绘制文字
		            var text44X=Math.floor(clientWidth*0.1917*2);
		            var text44Xx=Math.floor(clientWidth*0.5803*2);
		            var text44Xxx=Math.floor(clientWidth*0.113*2);
		            var text44Y=Math.floor(canvasHeight*0.608*2);
		            var text44Yy=Math.floor(canvasHeight*0.8785*2);
		            var text44Yyy=Math.floor(canvasHeight*0.9085*2);
		            var text44Yyyy=Math.floor(canvasHeight*0.9385*2);
		            mainCtx.fillText($scope.starttime,text44X,text44Y);
		            mainCtx.fillText($scope.endtime,text44Xx,text44Y);

		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText($scope.name,text44Xxx,text44Yy);
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text44Xxx,text44Yyy);
		            mainCtx.fillText(date,text44Xxx,text44Yyyy);
		        }else if(type == 3 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*2,(786/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
		        	//读取用户的文本
		            mainCtx.font = "normal bold "+48/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text55X=Math.floor(clientWidth*0.246*2);
		            var text55Xx=Math.floor(clientWidth*0.5667*2);
		            var text55Xxx=Math.floor(clientWidth*0.113*2);
		            var text55Y=Math.floor(canvasHeight*0.463*2);
		            var text55Yy=Math.floor(canvasHeight*0.8785*2);
		            var text55Yyy=Math.floor(canvasHeight*0.9085*2);
		            var text55Yyyy=Math.floor(canvasHeight*0.9385*2);
		            mainCtx.fillText($scope.starttime1,text55X,text55Y);
		            mainCtx.fillText($scope.endtime1,text55Xx,text55Y);

		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText($scope.name,text55Xxx,text55Yy);
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text55Xxx,text55Yyy);
		            mainCtx.fillText(date,text55Xxx,text55Yyyy);
		        }else if(type == 4 && num==1){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*2,(1079/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
		        	//读取用户的文本
		            mainCtx.font = "normal bold "+48/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            //从坐标点(50,50)开始绘制文字
		            var text66X=Math.floor(clientWidth*0.347*2);
		            var text66Y=Math.floor(canvasHeight*0.58*2);
		            mainCtx.fillText($scope.discount,text66X,text66Y);
		        }else if(type == 4 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(306/750)*canvasWidth*2,(1090/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
		        	//读取用户的文本
		            mainCtx.font = "normal bold "+100/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#f02964";
		            //从坐标点(50,50)开始绘制文字
		            var text77X=Math.floor(clientWidth*0.246*2);
		            var text77Xx=Math.floor(clientWidth*0.236*2);
		            var text77Xxx=Math.floor(clientWidth*0.5373*2);
		            var text77Y=Math.floor(canvasHeight*0.422*2);
		            var text77Yy=Math.floor(canvasHeight*0.6808*2);
		            mainCtx.fillText($scope.discount,text77X,text77Y);
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText($scope.starttime2,text77Xx,text77Yy);
		            mainCtx.fillText($scope.endtime2,text77Xxx,text77Yy);
		        }else if(type == 5 && num==1){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(550/750)*canvasWidth*2,(1110/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
		        	//读取用户的文本
		            mainCtx.font = "normal bold "+100/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            //从坐标点(50,50)开始绘制文字
		            var text88X=Math.floor(clientWidth*0.1426*2);
		            var text88Xx=Math.floor(clientWidth*0.6013*2);
		            var text88Xxx=Math.floor(clientWidth*0.31*2);
		            var text88Xxxx=Math.floor(clientWidth*0.1333*2);

		            var text88Y=Math.floor(canvasHeight*0.4764*2);
		            var text88Yy=Math.floor(canvasHeight*0.7869*2);
		            var text88Yyy=Math.floor(canvasHeight*0.7669*2);
		            var text88Yyyy=Math.floor(canvasHeight*0.89*2);
		            var text88Yyyy1=Math.floor(canvasHeight*0.92*2);
		            var text88Yyyy2=Math.floor(canvasHeight*0.95*2);
		            mainCtx.fillText($scope.starttime3,text88X,text88Y);
		            mainCtx.fillText($scope.endtime3,text88Xx,text88Y);
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillStyle = "#fb5b64";
		            mainCtx.fillText($scope.business,text88Xxx,text88Yy);
		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText($scope.name,text88Xxxx,text88Yyyy);
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text88Xxxx,text88Yyyy1);
		            mainCtx.fillText(date,text88Xxxx,text88Yyyy2);
		        }else if(type == 5 && num==2){
		        	// 添加二维码
		            mainCtx.drawImage(qrcodeImg,(551/750)*canvasWidth*2,(1111/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
		        	//读取用户的文本
		            mainCtx.font = "normal bold "+30/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#f6c33b";
		            //从坐标点(50,50)开始绘制文字
		            var text99X=Math.floor(clientWidth*0.298*2);
		            var text99Xx=Math.floor(clientWidth*0.415*2);
		            var text99Xxx=Math.floor(clientWidth*0.1333*2);

		            var text99Y=Math.floor(canvasHeight*0.801*2);

		            var text99Yyy=Math.floor(canvasHeight*0.89*2);
		            var text99Yyy1=Math.floor(canvasHeight*0.92*2);
		            var text99Yyy2=Math.floor(canvasHeight*0.95*2);
		            mainCtx.fillText($scope.businessMonth,text99X,text99Y);
		            mainCtx.fillText($scope.businessDate,text99Xx,text99Y);

		            mainCtx.fillStyle = "#333";
		            mainCtx.fillText($scope.name,text99Xxx,text99Yyy);
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text99Xxx,text99Yyy1);
		            mainCtx.fillText(date,text99Xxx,text99Yyy2);
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