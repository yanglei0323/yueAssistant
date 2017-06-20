index.controller('useHolidayCtrl',
	['$scope', '$http', '$window', '$location', '$rootScope','$routeParams',
	function ($scope, $http, $window, $location, $rootScope,$routeParams) {
	var user=JSON.parse(sessionStorage.getItem('user'));
	$scope.user=user;
	$scope.btnText = '一键生成海报';
	$scope.loading=false;
	$scope.showcanvas=true;
	$scope.showmodel=false;
	$scope.canvasImg="";
	$scope.name = "请添加";
	var clientWidth = document.documentElement.clientWidth;
	var canvasWidth = Math.floor(clientWidth);
	var canvasHeight = Math.floor(clientWidth*1.83);
	$("#main").css('width',canvasWidth+'px');
	$("#main").css('height',canvasHeight+'px');
	console.log($scope.user);
	if($scope.name.length >= 4){
		$scope.name=$scope.name[0]+$scope.name[1]+$scope.name[2];
	}
	// 类型type
	var type = $routeParams.type;
	var num = $routeParams.num;
	// 第几张图片
	$scope.page=1;
	$scope.showImg='../../assets/images/holiday/type'+type+'/img_'+num+'.png';
	// for(var c=1;c<3;c++){
	// 	var preImg='../../assets/images/holiday/type'+num+'/img_'+c+'.png';
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
		if($scope.showmodel){
			return;
		}
		if(type == 1 && num == 2){
        	$(".name-input-fixed").show();
        }
	};
	// 完成添加文字
	$scope.updateText = function (){
		if($scope.name.length >= 4){
			$scope.name=$scope.name[0]+$scope.name[1]+$scope.name[2];
		}
		hechen();
		$(".name-input-fixed").fadeOut(50);
	};
	// 关闭弹窗
	$scope.closeText = function (e){
		e.stopPropagation();
		$scope.user.iscomplete = true;
	};
	// 切换图片
	// $scope.changeImg =function (e){
	// 	e.stopPropagation();
	// 	$scope.showmodel = false;
	// 	$scope.loading=true;
	// 	if($scope.page >=2){
	// 		$scope.page=1;
	// 		$scope.showImg='../../assets/images/holiday/type'+num+'/img_'+$scope.page+'.png';
	// 		$scope.loading=false;
	// 	}else{
	// 		$scope.page+=1;
	// 		$scope.showImg='../../assets/images/holiday/type'+num+'/img_'+$scope.page+'.png';
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

        var starImg = new Image();
        starImg.src=$scope.showImg;
        starImg.onload=function(){
            //先把图片绘制在这里
            mainCtx.drawImage(starImg,0,0,canvasWidth*2,canvasHeight*2);
            	if(type == 1 && num == 2){
	            	//读取用户的文本
		            mainCtx.font = "normal bold "+40/750*canvasWidth*2+"px myFirstFont";
		            //设置用户文本填充颜色
		            mainCtx.fillStyle = "#fff";
		            //从坐标点(50,50)开始绘制文字
		            var text11X=Math.floor(clientWidth*0.153*2);
		            var text11Y=Math.floor(canvasHeight*0.335*2);
		            mainCtx.fillText($scope.name+"祝您",text11X,text11Y);
	            }else if(type == 3 && num == 1){
		            mainCtx.drawImage(qrcodeImg,(573/750)*canvasWidth*2,(1137/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
	            }else if(type == 3 && num == 2){
		            mainCtx.drawImage(qrcodeImg,(44/750)*canvasWidth*2,(1134/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
	            }else if(type == 5 && num == 1){
		            mainCtx.drawImage(qrcodeImg,(36/750)*canvasWidth*2,(1138/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
	            }else if(type == 5 && num == 2){
		            mainCtx.drawImage(qrcodeImg,(36/750)*canvasWidth*2,(1122/1334)*canvasHeight*2,(14/75)*canvasWidth*2,(14/75)*canvasWidth*2);
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