index.controller('useCardCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.user=user;
	$scope.btnText = '生成海报';
	$scope.loading=false;
	$scope.showcanvas=true;
	$scope.canvasImg ="";
	var clientWidth = document.documentElement.clientWidth;
	var canvasWidth = Math.floor(clientWidth);
	var canvasHeight = Math.floor(clientWidth*1.83);
	$("#main").attr('width',canvasWidth+'px');
	$("#main").attr('height',canvasHeight+'px');
	$scope.updateImg='';
	// 设置图片初始数值
	$scope.dragX=0;
	$scope.dragY=0;
	$scope.pinchWidth=1;
	$scope.pinchHeight=1;
	if($scope.user.name.length >= 3){
		$scope.user.name=$scope.user.name[0]+$scope.user.name[1];
	}
	// 类型type
	var num = $routeParams.num;
	// 第几张图片
	$scope.page=1;
	$scope.showImg='../../assets/images/promotion/type4/img_'+num+'.png';
	// for(var c=1;c<6;c++){
	// 	var preImg='../../assets/images/promotion/type4/img_'+c+'.png';
	// 	$('#starImg').append("<img src="+preImg+">");
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
	// 		$scope.showImg='../../assets/images/promotion/type4/img_'+num+'.png';
	// 		$scope.loading=false;
	// 	}else{
	// 		$scope.page+=1;
	// 		$scope.showImg='../../assets/images/promotion/type4/img_'+num+'.png';
	// 		$scope.loading=false;
	// 	}
	// 	hechen();
	// };
	$('.upload').on('change', function() {
        var file = $(this)[0].files[0];
        if(!file) {//undefined
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);// 将文件以Data URL形式进行读入页面
        reader.onload = function() {
            var base64 = this.result;
            $scope.updateImg = base64;
            hechen();
        };

    });
    touch.on('#main', 'dragend', function(ev){
	    $scope.dragX=ev.x;
	    $scope.dragY=ev.y;
	    hechen();
	});
	touch.on('#main', 'pinchend', function(ev){
	    $scope.pinchWidth=ev.scale;
	    $scope.pinchHeight=ev.scale;
	    hechen();
	});
	$(function(){
        hechen();
    });

    function hechen(){
    	$scope.btnText = '生成海报';
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
        var mainCtx = getCanvasContext('main');
        var maxWidth = mainCtx.width;
        var maxHeight = mainCtx.height;
        mainCtx.clearRect(0,0,1000,1000);
        //因为没法直接读取本地图片 所以做了这部操作
        var starAvatar = new Image();
        starAvatar.src=$scope.updateImg;
        starAvatar.width=canvasWidth;
        starAvatar.height='auto';
        var starImg = new Image();
        starImg.src=$scope.showImg;
        starImg.onload=function(){
            if(num == 1){
            	//先把图片绘制在这里
			    mainCtx.drawImage(starAvatar,0,0,canvasWidth,canvasHeight,$scope.dragX,$scope.dragY,canvasWidth,canvasHeight);
	            mainCtx.drawImage(starImg,0,0,canvasWidth,canvasHeight);
            	//读取用户的文本
	            mainCtx.font = "normal bold 0.32rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#545454";
	            //从坐标点(50,50)开始绘制文字
	            var text1X=Math.floor(clientWidth*0.07);
	            var text1Y=Math.floor(canvasHeight*0.866);
	            var text1Yy=Math.floor(canvasHeight*0.897);
	            var text1Yyy=Math.floor(canvasHeight*0.923);
	            mainCtx.fillText($scope.user.name,text1X,text1Y);
	            //设置时间填充颜色
	            // mainCtx.font = "small-caps bold 0.24rem STXinwei";
	            mainCtx.fillText(mm+'.'+week,text1X,text1Yy);
	            mainCtx.fillText(date,text1X,text1Yyy);
            }else if(num == 2){
            	//先把图片绘制在这里
			    mainCtx.drawImage(starAvatar,0,0,canvasWidth,canvasHeight,$scope.dragX,$scope.dragY,$scope.pinchWidth,$scope.pinchHeight);
	            mainCtx.drawImage(starImg,0,0,canvasWidth,canvasHeight);
            	//读取用户的文本
	            mainCtx.font = "normal bold 0.4rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#fff";
	            //从坐标点(50,50)开始绘制文字
	            var text2X=Math.floor(clientWidth*0.625);
	            var text2Xx=Math.floor(clientWidth*0.826);
	            var text2Y=Math.floor(canvasHeight*0.716);
	            var text2Yy=Math.floor(canvasHeight*0.88);
	            var text2Yyy=Math.floor(canvasHeight*0.920);
	            for(var i=0;i<$scope.user.name.length;i++){
	            	mainCtx.fillText($scope.user.name[i],text2Xx,text2Y+Math.floor(canvasHeight*0.0437)*i);
	            }
	            mainCtx.fillText(mm+'.'+week,text2X,text2Yy);
	            //设置时间填充颜色
	            // mainCtx.font = "small-caps bold 0.24rem STXinwei";
	            mainCtx.fillText(date,text2X,text2Yyy);
            }else if(num == 3){
            	//读取用户的文本
	            mainCtx.font = "normal bold 0.42rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "white";
	            //从坐标点(50,50)开始绘制文字
	            var text3X=Math.floor(clientWidth*0.066);
	            var text3Xx=Math.floor(clientWidth*0.80);
	            var text3Y=Math.floor(canvasHeight*0.076);
	            var text3Yy=Math.floor(canvasHeight*0.105);
	            var text3Yyy=Math.floor(canvasHeight*0.329);
	            mainCtx.fillText((mydate.getMonth()+1)+'/'+mydate.getDate(),text3X,text3Y);
	            //设置时间填充颜色
	            mainCtx.fillText(week,text3X,text3Yy);
	            for(var v=0;v<$scope.user.name.length;v++){
	            	mainCtx.fillText($scope.user.name[v],text3Xx,text3Yyy+Math.floor(canvasHeight*0.0437)*v);
	            }
            }else if(num == 4){
            	//读取用户的文本
	            mainCtx.font = "normal bold 1.333333rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "white";
	            //从坐标点(50,50)开始绘制文字
	            var text4X=Math.floor(clientWidth*0.103);
	            var text4Xx=Math.floor(clientWidth*0.80);
	            var text4Y=Math.floor(canvasHeight*0.87);
	            var text4Yy=Math.floor(canvasHeight*0.91);
	            var text4Yyy=Math.floor(canvasHeight*0.947);
	            var text4Yyyy=Math.floor(canvasHeight*0.329);
	            mainCtx.fillText(mydate.getDate(),text4X,text4Y);
	            //设置时间填充颜色
	            mainCtx.font = "normal bold 0.4rem myFirstFont";
	            mainCtx.fillText(mm+'.'+week,text4X,text4Yy);
	            mainCtx.fillText(mydate.getFullYear(),text4X,text4Yyy);
	            for(var z=0;z<$scope.user.name.length;z++){
	            	mainCtx.fillText($scope.user.name[z],text4Xx,text4Yyyy+Math.floor(canvasHeight*0.0437)*z);
	            }
            }else if(num == 5){
            	//先把图片绘制在这里
			    mainCtx.drawImage(starAvatar,0,0,canvasWidth,canvasHeight,$scope.dragX,$scope.dragY,$scope.pinchWidth,$scope.pinchHeight);
	            mainCtx.drawImage(starImg,0,0,canvasWidth,canvasHeight);
            	//读取用户的文本
	            mainCtx.font = "normal bold 0.453333rem myFirstFont";
	            //设置用户文本填充颜色
	            mainCtx.fillStyle = "#545454";
	            //从坐标点(50,50)开始绘制文字
	            var text5X=Math.floor(clientWidth*0.103);
	            var text5Xx=Math.floor(clientWidth*0.80);
	            var text5Y=Math.floor(canvasHeight*0.90);
	            var text5Yy=Math.floor(canvasHeight*0.94);
	            var text5Yyy=Math.floor(canvasHeight*0.329);
	            mainCtx.fillText(mm+'.'+week,text5X,text5Y);
	            mainCtx.fillText(date,text5X,text5Yy);
	            mainCtx.fillStyle = "#fff";
	            for(var b=0;b<$scope.user.name.length;b++){
	            	mainCtx.fillText($scope.user.name[b],text5Xx,text5Yyy+Math.floor(canvasHeight*0.0437)*b);
	            }
	            //设置时间填充颜色
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
        $('.changeText').css('display','none');
        $scope.btnText = '长按保存至手机，再发到朋友圈炫耀';
    }

    function saveAsLocalImage(){
        var myCanvas = document.getElementById("main");
        var image = myCanvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
        window.location.href=image;
    }
}]);