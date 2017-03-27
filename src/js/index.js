var transFn = function(data) {
            return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        },
        picBasePath = 'http://101.200.205.162:8891';
var index = angular.module('index',
	['ngRoute', 'mobile-angular-ui', 'mobile-angular-ui.gestures', 'ngFileUpload', 'infinite-scroll']);
index.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {

	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl: '../html/home.html',
			controller: 'homeCtrl'
		})
		.when('/personalCenter', {
			templateUrl: '../html/personalCenter.html',
			controller: 'personalCenterCtrl'
		})
		.when('/editInformation', {
			templateUrl: '../html/editInformation.html',
			controller: 'editInformationCtrl'
		})
		.when('/chooseQrcode', {
			templateUrl: '../html/chooseQrcode.html',
			controller: 'chooseQrcodeCtrl'
		})
		.when('/personalTailor', {
			templateUrl: '../html/personalTailor.html',
			controller: 'personalTailorCtrl'
		})
		.when('/tailorData', {
			templateUrl: '../html/tailorData.html',
			controller: 'tailorDataCtrl'
		})
		.when('/payTailor', {
			templateUrl: '../html/payTailor.html',
			controller: 'payTailorCtrl'
		})
		.when('/myTailor', {
			templateUrl: '../html/myTailor.html',
			controller: 'myTailorCtrl'
		})
		.when('/vipCenter', {
			templateUrl: '../html/vipCenter.html',
			controller: 'vipCenterCtrl'
		})
		.when('/fast_login', {
			templateUrl: '../html/fast_login.html',
			controller: 'fastLoginCtrl'
		})
		.when('/works', {
			templateUrl: '../html/works.html',
			controller: 'worksCtrl'
		})
		.when('/workHours', {
			templateUrl: '../html/workHours.html',
			controller: 'workHoursCtrl'
		})
		.when('/morningNight', {
			templateUrl: '../html/morningNight.html',
			controller: 'morningNightCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);


// 获取地理位置并设置到localStorage中，通过code进行登录
(function init() {
	var code = getUrlParam('code');
	var state = getUrlParam('state');
        
    if (code) {
        // 通过code获取access_token等信息
        var data = {
            appid: 'wx6a71c9758aa42537',
            secret: '04a307f13f2ab8ffac45c02538cedce7',
            code: code,
            grant_type: 'authorization_code'
        };
        $.ajax({
            url: '/sns/oauth2/access_token',
            type: 'GET',
            data: data,
            async: false,
            success: function (resp) {
                resp = JSON.parse(resp);
                if (resp.errcode) {
                  alert(resp.errmsg);
                }
                else {
                  // 获取授权信息成功
                  var tldata = {
                    type: 'wx',
                    token: resp.access_token,
                    openid: resp.openid
                  };
					$.ajax({
			            url: '/user/unl/thirdlogin.json',
			            type: 'GET',
			            data: tldata,
			            async: false,
			            success: function (resp) {
			                if (1 === resp.code) {
								sessionStorage.setItem('login', '1');
	                      		sessionStorage.setItem('user', JSON.stringify(resp.data));
							}else if(2 === resp.code){
								sessionStorage.setItem('login', '1');
	                      		sessionStorage.setItem('user', JSON.stringify(resp.data));
								window.location.href = 'fast_login';
							}
			            },
			            error: function (resp) {
			                alert(resp);
			            }
			        });
                }
            },
            error: function () {
                alert('授权信息获取失败');
            }
        });
    }
	
	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
    	alert('当前浏览器不支持navigator.geolacation');
    }
})();

function showPosition(position) {
	var positionx =  position.coords.latitude,
	    positiony =  position.coords.longitude;
	localStorage.setItem('positionx', positionx);
	localStorage.setItem('positiony', positiony);
}

// 获取url参数
function getUrlParam(name){  
    //构造一个含有目标参数的正则表达式对象  
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
    //匹配目标参数  
    var r = window.location.search.substr(1).match(reg);  
    //返回参数值  
    if (r !== null) return unescape(r[2]);  
    return null;  
} 