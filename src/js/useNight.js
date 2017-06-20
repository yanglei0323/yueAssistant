index.controller('useNightCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.user=user;
	$scope.btnText = '立即使用';
	$scope.loading=false;
	$scope.showcanvas=true;
	$scope.canvasImg ="";
	var clientWidth = document.documentElement.clientWidth;
	var canvasWidth = Math.floor(clientWidth);
	var canvasHeight = Math.floor(clientWidth*1.83);
	$("#main").css('width',canvasWidth+'px');
	$("#main").css('height',canvasHeight+'px');
	console.log($scope.user);
	// if($scope.user.name.length >= 3){
	// 	$scope.user.name=$scope.user.name[0]+$scope.user.name[1];
	// }
	// 类型type
	var type = $routeParams.type;
	var num = $routeParams.num;
	// 第几张图片
	$scope.page=1;
	$scope.showImg='../../assets/images/goodnight/type'+type+'/img_'+num+'.png';
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
	// 		$scope.showImg='../../assets/images/goodnight/type'+num+'/img_'+$scope.page+'.png';
	// 		$scope.loading=false;
	// 	}else{
	// 		$scope.page+=1;
	// 		$scope.showImg='../../assets/images/goodnight/type'+num+'/img_'+$scope.page+'.png';
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

    // var ratio = getPixelRatio(mainCtx);
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
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#545454";
		            //从坐标点(50,50)开始绘制文字
		            var text11X=Math.floor(clientWidth*0.07*2);
		            var text11Y=Math.floor(canvasHeight*0.866*2);
		            var text11Yy=Math.floor(canvasHeight*0.897*2);
		            var text11Yyy=Math.floor(canvasHeight*0.923*2);
		            mainCtx.fillText($scope.user.name,text11X,text11Y);
		            //设置时间填充颜色
		            // mainCtx.font = "small-caps bold 0.24rem STXinwei";
		            mainCtx.fillText(mm+'.'+week,text11X,text11Yy);
		            mainCtx.fillText(date,text11X,text11Yyy);
	            }else if(type == 2){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text22X=Math.floor(clientWidth*0.625*2);
		            var text22Xx=Math.floor(clientWidth*0.826*2);
		            var text22Y=Math.floor(canvasHeight*0.716*2);
		            var text22Yy=Math.floor(canvasHeight*0.88*2);
		            var text22Yyy=Math.floor(canvasHeight*0.920*2);
		            for(var i=0;i<$scope.user.name.length;i++){
		            	mainCtx.fillText($scope.user.name[i],text22Xx,text22Y+Math.floor(canvasHeight*0.0437*2)*i);
		            }
		            mainCtx.fillText(mm+'.'+week,text22X,text22Yy);
		            //设置时间填充颜色
		            // mainCtx.font = "small-caps bold 0.24rem STXinwei";
		            mainCtx.fillText(date,text22X,text22Yyy);
	            }else if(type == 3){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "white";
		            //从坐标点(50,50)开始绘制文字
		            var text33X=Math.floor(clientWidth*0.066*2);
		            var text33Xx=Math.floor(clientWidth*0.80*2);
		            var text33Y=Math.floor(canvasHeight*0.076*2);
		            var text33Yy=Math.floor(canvasHeight*0.105*2);
		            var text33Yyy=Math.floor(canvasHeight*0.329*2);
		            mainCtx.fillText((mydate.getMonth()+1)+'/'+mydate.getDate(),text33X,text33Y);
		            //设置时间填充颜色
		            mainCtx.fillText(week,text33X,text33Yy);
		            for(var v=0;v<$scope.user.name.length;v++){
		            	mainCtx.fillText($scope.user.name[v],text33Xx,text33Yyy+Math.floor(canvasHeight*0.0437*2)*v);
		            }
	            }else if(type == 4){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+100/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "white";
		            //从坐标点(50,50)开始绘制文字
		            var text44X=Math.floor(clientWidth*0.103*2);
		            var text44Xx=Math.floor(clientWidth*0.80*2);
		            var text44Y=Math.floor(canvasHeight*0.87*2);
		            var text44Yy=Math.floor(canvasHeight*0.91*2);
		            var text44Yyy=Math.floor(canvasHeight*0.947*2);
		            var text44Yyyy=Math.floor(canvasHeight*0.329*2);
		            mainCtx.fillText(mydate.getDate(),text44X,text44Y);
		            //设置时间填充颜色
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text44X,text44Yy);
		            mainCtx.fillText(mydate.getFullYear(),text44X,text44Yyy);
		            for(var z=0;z<$scope.user.name.length;z++){
		            	mainCtx.fillText($scope.user.name[z],text44Xx,text44Yyyy+Math.floor(canvasHeight*0.0437*2)*z);
		            }
	            }else if(type == 5){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#545454";
		            //从坐标点(50,50)开始绘制文字
		            var text55X=Math.floor(clientWidth*0.103*2);
		            var text55Xx=Math.floor(clientWidth*0.80*2);
		            var text55Y=Math.floor(canvasHeight*0.90*2);
		            var text55Yy=Math.floor(canvasHeight*0.94*2);
		            var text55Yyy=Math.floor(canvasHeight*0.329*2);
		            mainCtx.fillText(mm+'.'+week,text55X,text55Y);
		            mainCtx.fillText(date,text55X,text55Yy);
		            mainCtx.fillStyle = "#fff";
		            for(var b=0;b<$scope.user.name.length;b++){
		            	mainCtx.fillText($scope.user.name[b],text55Xx,text55Yyy+Math.floor(canvasHeight*0.0437*2)*b);
		            }
		            //设置时间填充颜色
	            }else if(type == 6){
	            	//读取用户的文本
	            	mainCtx.font = "normal bold "+124/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text66X=Math.floor(clientWidth*0.07*2);
		            var text66Xx=Math.floor(clientWidth*0.479*2);
		            var text66Y=Math.floor(canvasHeight*0.106*2);
		            var text66Yy=Math.floor(canvasHeight*0.146*2);
		            var text66Yyy=Math.floor(canvasHeight*0.186*2);
		            var text66Yyyy=Math.floor(canvasHeight*0.434*2);
		            mainCtx.fillText(mydate.getDate(),text66X,text66Y);
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text66X,text66Yy);
		            mainCtx.fillText(mydate.getFullYear(),text66X,text66Yyy);
		            for(var s=0;s<$scope.user.name.length;s++){
		            	mainCtx.fillText($scope.user.name[s],text66Xx,text66Yyyy+Math.floor(canvasHeight*0.0437*2)*s);
		            }
	            }else if(type == 7){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#545454";
		            //从坐标点(50,50)开始绘制文字
		            var text77X=Math.floor(clientWidth*0.066*2);
		            var text77Y=Math.floor(canvasHeight*0.059*2);
		            var text77Yy=Math.floor(canvasHeight*0.088*2);
		            mainCtx.fillText(mm+'.'+week,text77X,text77Y);
		            //设置时间填充颜色
		            mainCtx.fillText(date,text77X,text77Yy);
	            }else if(type == 8){
	            	//读取用户的文本
	            	mainCtx.font = "normal bold "+124/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#1b273";
		            //从坐标点(50,50)开始绘制文字
		            var text88X=Math.floor(clientWidth*0.08*2);
		            var text88Y=Math.floor(canvasHeight*0.146*2);
		            var text88Yy=Math.floor(canvasHeight*0.186*2);
		            var text88Yyy=Math.floor(canvasHeight*0.226*2);
		            var text88Yyyy=Math.floor(canvasHeight*0.9078*2);
		            mainCtx.fillText(mydate.getDate(),text88X,text88Y);
		            mainCtx.font = "normal bold "+24/750*canvasWidth*2+"px myFirstFont";
		            mainCtx.fillText(mm+'.'+week,text88X,text88Yy);
		            mainCtx.fillText(mydate.getFullYear(),text88X,text88Yyy);
		            mainCtx.fillStyle = "#535353";
		            mainCtx.fillText("BY"+$scope.user.name,text88X,text88Yyyy);
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