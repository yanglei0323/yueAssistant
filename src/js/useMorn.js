index.controller('useMornCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.user=user;
	$scope.btnText = '立即使用';
	$scope.loading=false;
	$scope.showcanvas=true;
	$scope.canvasImg="";
	var clientWidth = document.documentElement.clientWidth;
	var canvasWidth = Math.floor(clientWidth);
	var canvasHeight = Math.floor(clientWidth*(1334/750));
	$("#main").css('width',canvasWidth+'px');
	$("#main").css('height',canvasHeight+'px');
	console.log($scope.user);
	if($scope.user.name.length >= 4){
		$scope.user.name=$scope.user.name[0]+$scope.user.name[1]+$scope.user.name[2]+$scope.user.name[3];
	}
	// 类型type
	var type = $routeParams.type;
	var num = $routeParams.num;
	// console.log(type+'---'+num);
	// 第几张图片
	// $scope.page=1;
	$scope.showImg='../../assets/images/morning/type'+type+'/img_'+num+'.png';
	// for(var c=1;c<6;c++){
	// 	var preImg='../../assets/images/goodnight/type'+num+'/img_'+c+'.png';
	// 	$('.hideImg').append("<img src="+preImg+">");
	// }
	// 完善信息页面跳转
	$scope.editInformation = function (){
		$location.path('editInformation');
	};
	// 立即使用
	$scope.useTemplatePage = function (){
		saveImageInfo();
		$scope.btnText = '长按保存至手机，再发到朋友圈炫耀';
		// saveImageInfo();
	};
	// 返回
	$scope.goBack = function (){
		$window.history.back();
	};
	// 关闭弹窗
	$scope.closeText = function (){
		$scope.user.iscomplete = true;
	};
	// 切换图片
	// $scope.changeImg =function (){
	// 	$scope.loading=true;
	// 	if($scope.page >=5){
	// 		$scope.page=1;
	// 		$scope.showImg='../../assets/images/morning/type'+num+'/img_'+$scope.page+'.png';
	// 		$scope.loading=false;
	// 	}else{
	// 		$scope.page+=1;
	// 		$scope.showImg='../../assets/images/morning/type'+num+'/img_'+$scope.page+'.png';
	// 		$scope.loading=false;
	// 	}
	// 	hechen();
	// };
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

    // var ratio = Math.floor(getPixelRatio(mainCtx));
    // console.log(ratio);
	$(function(){
        hechen();
    });
    function hechen(){
    	$scope.btnText = '立即使用';
    	$scope.showcanvas=true;
        var mydate = new Date();
        var date = mydate.getFullYear()+'/'+(mydate.getMonth()+1)+'/'+mydate.getDate();
        // 获取月份转换为英文缩写
        var mm = mydate.getMonth()+1;  
        switch (mm) {  
          case 1:  
            mm = "J A N";  
            break;  
          case 2:  
            mm = "F E B";  
            break;  
          case 3:  
            mm = "M A R";  
            break;  
          case 4:  
            mm = "A P R";  
            break;  
          case 5:  
            mm = "M A Y";  
            break;  
          case 6:  
            mm = "J U N";  
            break;  
          case 7:  
            mm = "J U L";  
            break;  
          case 8:  
            mm = "A U G";  
            break;  
          case 9:  
            mm = "S E P";  
            break;  
          case 10:  
            mm = "O C T";  
            break;  
          case 11:  
            mm = "N O V";  
            break;  
          case 12:  
            mm = "D E C";  
            break;  
        } 
        // 星期英文转换
        var week =mydate.getDay();
        switch (week) {  
          case 0:  
            week = "S U N D A Y";  
            break;  
          case 1:  
            week = "M O N D A Y";  
            break;  
          case 2:  
            week = "T U E S D A Y";  
            break;  
          case 3:  
            week = "W E D N E S D A Y";  
            break;  
          case 4:  
            week = "T H U R S D A Y";  
            break;  
          case 5:  
            week = "F R I D A Y";  
            break;  
          case 6:  
            week = "S A T U R D A Y";  
            break;  
        }
        //因为没法直接读取本地图片 所以做了这部操作

        var starImg = new Image();
        starImg.src=$scope.showImg;
        starImg.onload=function(){
            //先把图片绘制在这里
            mainCtx.drawImage(starImg,0,0,Math.floor(canvasWidth*2),Math.floor(canvasHeight*2));
            // 添加二维码
			// var pageqrcode = picBasePath + $scope.user.pageqrcode;
   //          var qrcodeImg = new Image();
    //         qrcodeImg.crossOrigin = "Anonymous"; 
   //          qrcodeImg.src = pageqrcode;
   //          qrcodeImg.onload=function(){
   //          	mainCtx.drawImage(qrcodeImg,(23/30)*canvasWidth,(47/54)*canvasHeight,(7/30)*canvasWidth,(7/30)*canvasWidth);
   //          };
            	if(type == 1){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "black";
		            mainCtx.textAlign="right";
		            //从坐标点(50,50)开始绘制文字
		            var text11X=Math.floor(clientWidth*0.744*2);
		            var text11Y=Math.floor(canvasHeight*0.95*2);
		            mainCtx.fillText("BY"+$scope.user.name,text11X,text11Y);
	            }else if(type == 2){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+30/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "black";
		            //从坐标点(50,50)开始绘制文字
		            var text22X=Math.floor(clientWidth*0.07*2);
		            var text22Y=Math.floor(canvasHeight*0.906*2);
		            var text22Yy=Math.floor(canvasHeight*0.943*2);
		            mainCtx.fillText("BY"+$scope.user.name,text22X,text22Y);
		            //设置时间填充颜色
		            // mainCtx.font = "small-caps bold 0.24rem STXinwei";
		            mainCtx.fillText(date,text22X,text22Yy);
	            }else if(type == 3){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+100/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "white";
		            //从坐标点(50,50)开始绘制文字
		            var text33X=Math.floor(clientWidth*0.103*2);
		            var text33Y=Math.floor(canvasHeight*0.87*2);
		            var text33Yy=Math.floor(canvasHeight*0.91*2);
		            var text33Yyy=Math.floor(canvasHeight*0.947*2);
		            mainCtx.fillText(mydate.getDate(),text33X,text33Y);
		            //设置时间填充颜色
		            mainCtx.font = "normal bold "+30/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text33X,text33Yy);
		            mainCtx.fillText("BY"+$scope.user.name,text33X,text33Yyy);
	            }else if(type == 4){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+34/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "black";
		            mainCtx.textAlign="right"; 
		            //从坐标点(50,50)开始绘制文字
		            var text44X=Math.floor(clientWidth*0.924*2);
		            var text44Y=Math.floor(canvasHeight*0.145*2);
		            var text44Yy=Math.floor(canvasHeight*0.184*2);
		            var text44Yyy=Math.floor(canvasHeight*0.223*2);
		            mainCtx.fillText(date,text44X,text44Y);
		            //设置时间填充颜色
		            // mainCtx.font = "small-caps bold 0.4rem STXinwei";
		            mainCtx.fillText(week,text44X,text44Yy);
		            mainCtx.fillText("BY"+$scope.user.name,text44X,text44Yyy);
	            }else if(type == 5){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+34/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#7a8776";
		            mainCtx.textAlign="right"; 
		            //从坐标点(50,50)开始绘制文字
		            var text55X=Math.floor(clientWidth*0.933*2);
		            var text55Y=Math.floor(canvasHeight*0.736*2);
		            mainCtx.fillText("BY"+$scope.user.name,text55X,text55Y);
		            //设置时间填充颜色
	            }else if(type == 6){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+34/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text66X=Math.floor(clientWidth*0.047*2);
		            var text66Y=Math.floor(canvasHeight*0.915*2);
		            mainCtx.fillText("BY"+$scope.user.name,text66X,text66Y);
		            //设置时间填充颜色
	            }else if(type == 7){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+30/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#000";
		            //从坐标点(50,50)开始绘制文字
		            var text77X=Math.floor(clientWidth*0.07*2);
		            var text77Y=Math.floor(canvasHeight*0.856*2);
		            var text77Yy=Math.floor(canvasHeight*0.883*2);
		            var text77Yyy=Math.floor(canvasHeight*0.91*2);
		            mainCtx.fillText(date,text77X,text77Y);
		            mainCtx.fillText(week,text77X,text77Yy);
		            mainCtx.fillText("BY"+$scope.user.name,text77X,text77Yyy);
	            }else if(type == 8){
	            	//读取用户的文本
	            	mainCtx.font = "normal bold "+100/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#96bfad";
		            //从坐标点(50,50)开始绘制文字
		            var text88X=Math.floor(clientWidth*0.07*2);
		            var text88Y=Math.floor(canvasHeight*0.106*2);
		            var text88Yy=Math.floor(canvasHeight*0.146*2);
		            var text88Yyy=Math.floor(canvasHeight*0.186*2);
		            mainCtx.fillText(mydate.getDate(),text88X,text88Y);
		            mainCtx.font = "normal bold "+30/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(week,text88X,text88Yy);
		            mainCtx.fillText("BY"+$scope.user.name,text88X,text88Yyy);
	            }else if(type == 9 && num==1){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "black";
		            //从坐标点(50,50)开始绘制文字
		            var text91X=Math.floor(clientWidth*0.064*2);
		            var text91Y=Math.floor(canvasHeight*0.8912*2);
		            for(var b=0;b<$scope.user.name.length;b++){
		            	mainCtx.fillText($scope.user.name[b],text91X,text91Y+Math.floor(canvasHeight*0.0275*2)*b);
		            }
	            }else if(type == 9 && num==2){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+45/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "black";
		            //从坐标点(50,50)开始绘制文字
		            var text92X=Math.floor(clientWidth*0.697*2);
		            var text92Xx=Math.floor(clientWidth*0.933*2);
		            var text92Y=Math.floor(canvasHeight*0.097*2);
		            var text92Yy=Math.floor(canvasHeight*0.1457*2);
		            var text92Yyy=Math.floor(canvasHeight*0.4003*2);
		            mainCtx.fillText((mydate.getMonth()+1)+'/'+mydate.getDate(),text92X,text92Y);
		            mainCtx.fillText(mydate.getFullYear(),text92X,text92Yy);

		            mainCtx.textAlign="right";
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText("BY"+$scope.user.name,text92Xx,text92Yyy);
	            }else if(type == 9 && num==3){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+86/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "black";
		            //从坐标点(50,50)开始绘制文字
		            var text93X=Math.floor(clientWidth*0.163*2);
		            var text93Y=Math.floor(canvasHeight*0.090*2);
		            var text93Yy=Math.floor(canvasHeight*0.147*2);
		            var text93Yyy=Math.floor(canvasHeight*0.2714*2);
		            mainCtx.fillText(mydate.getDate(),text93X,text93Y);
		            mainCtx.font = "normal bold "+38/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text93X,text93Yy);
		            mainCtx.font = "normal bold "+30/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText("BY"+$scope.user.name,text93X,text93Yyy);
	            }else if(type == 9 && num==4){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+124/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text94X=Math.floor(clientWidth*0.0587*2);
		            var text94Y=Math.floor(canvasHeight*0.091*2);
		            var text94Yy=Math.floor(canvasHeight*0.1224*2);
		            var text94Yyy=Math.floor(canvasHeight*0.1614*2);
		            var text94Yyyy=Math.floor(canvasHeight*0.2004*2);
		            mainCtx.fillText(mydate.getDate(),text94X,text94Y);
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text94X,text94Yy);
		            mainCtx.fillText(mydate.getFullYear(),text94X,text94Yyy);
		            mainCtx.fillText("BY"+$scope.user.name,text94X,text94Yyyy);
	            }else if(type == 9 && num==5){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            mainCtx.textAlign="center";
		            //从坐标点(50,50)开始绘制文字
		            var text95X=Math.floor(clientWidth*0.5*2);
		            var text95Y=Math.floor(canvasHeight*0.5732*2);
		            var text95Yy=Math.floor(canvasHeight*0.6167*2);
		            mainCtx.fillText(date,text95X,text95Y);
		            mainCtx.fillText("BY"+$scope.user.name,text95X,text95Yy);
	            }else if(type == 10 && num==1){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+72/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#434345";
		            mainCtx.textAlign="right";
		            //从坐标点(50,50)开始绘制文字
		            var text101X=Math.floor(clientWidth*0.9387*2);
		            var text101Y=Math.floor(canvasHeight*0.0795*2);
		            var text101Yy=Math.floor(canvasHeight*0.1244*2);
		            var text101Yyy=Math.floor(canvasHeight*0.1634*2);
		            mainCtx.fillText(mydate.getDate(),text101X,text101Y);
		            //设置时间填充颜色
		            mainCtx.font = "normal bold "+30/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text101X,text101Yy);
		            mainCtx.fillText("BY"+$scope.user.name,text101X,text101Yyy);
	            }else if(type == 10 && num==2){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+30/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text102X=Math.floor(clientWidth*0.1093*2);
		            var text102Y=Math.floor(canvasHeight*0.8476*2);
		            var text102Yy=Math.floor(canvasHeight*0.8806*2);
		            mainCtx.fillText(date,text102X,text102Y);
		            mainCtx.fillText("BY"+$scope.user.name,text102X,text102Yy);
	            }else if(type == 10 && num==3){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text103X=Math.floor(clientWidth*0.0613*2);
		            var text103Y=Math.floor(canvasHeight*0.3004*2);
		            mainCtx.fillText("BY"+$scope.user.name,text103X,text103Y);
	            }else if(type == 10 && num==4){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+124/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            mainCtx.textAlign="right";
		            //从坐标点(50,50)开始绘制文字
		            var text104X=Math.floor(clientWidth*0.952*2);
		            var text104Y=Math.floor(canvasHeight*0.0995*2);
		            var text104Yy=Math.floor(canvasHeight*0.1729*2);
		            var text104Yyy=Math.floor(canvasHeight*0.2119*2);
		            var text104Yyyy=Math.floor(canvasHeight*0.2509*2);
		            mainCtx.fillText(mydate.getDate(),text104X,text104Y);
		            //设置时间填充颜色
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text104X,text104Yy);
		            mainCtx.fillText(mydate.getFullYear(),text104X,text104Yyy);
		            mainCtx.fillText("BY"+$scope.user.name,text104X,text104Yyyy);
	            }else if(type == 10 && num==5){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+124/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text105X=Math.floor(clientWidth*0.0587*2);
		            var text105Y=Math.floor(canvasHeight*0.091*2);
		            var text105Yy=Math.floor(canvasHeight*0.1224*2);
		            var text105Yyy=Math.floor(canvasHeight*0.1614*2);
		            var text105Yyyy=Math.floor(canvasHeight*0.2004*2);
		            mainCtx.fillText(mydate.getDate(),text105X,text105Y);
		            mainCtx.font = "normal bold "+36/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text105X,text105Yy);
		            mainCtx.fillText(mydate.getFullYear(),text105X,text105Yyy);
		            mainCtx.fillText("BY"+$scope.user.name,text105X,text105Yyyy);
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
  //       var dom = document.createElement("a");
		// dom.href = image;
		// dom.download = new Date().getTime() + ".jpg";
		// dom.click();
    }

    function saveAsLocalImage(){
        var myCanvas = document.getElementById("main");
        var image = myCanvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
        window.location.href=image;
    }
}]);