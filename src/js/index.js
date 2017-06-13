var transFn = function(data) {
            return $.param(data);
        },
        postCfg = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: transFn
        },
        picBasePath = 'http://47.92.29.81:8891';
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
		.when('/compeletPayTailor', {
			templateUrl: '../html/compeletPayTailor.html',
			controller: 'compeletPayTailorCtrl'
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
		.when('/useMorn/:type/:num', {
			templateUrl: '../html/useMorn.html',
			controller: 'useMornCtrl'
		})
		.when('/monList/:num', {
			templateUrl: '../html/monList.html',
			controller: 'monListCtrl'
		})
		.when('/promList/:num', {
			templateUrl: '../html/promList.html',
			controller: 'promListCtrl'
		})
		.when('/nightList/:num', {
			templateUrl: '../html/nightList.html',
			controller: 'nightListCtrl'
		})
		.when('/noticeList/:num', {
			templateUrl: '../html/noticeList.html',
			controller: 'noticeListCtrl'
		})
		.when('/useNight/:type/:num', {
			templateUrl: '../html/useNight.html',
			controller: 'useNightCtrl'
		})
		.when('/useCard/:num', {
			templateUrl: '../html/useCard.html',
			controller: 'useCardCtrl'
		})
		.when('/joke', {
			templateUrl: '../html/joke.html',
			controller: 'jokeshowCtrl'
		})
		.when('/jokeList/:num', {
			templateUrl: '../html/jokeList.html',
			controller: 'jokeListCtrl'
		})
		.when('/usejoke/:type/:num', {
			templateUrl: '../html/usejoke.html',
			controller: 'usejokeCtrl'
		})
		.when('/holiday', {
			templateUrl: '../html/holiday.html',
			controller: 'holidayCtrl'
		})
		.when('/holidayList/:num', {
			templateUrl: '../html/holidayList.html',
			controller: 'holidayListCtrl'
		})
		.when('/greetList/:num', {
			templateUrl: '../html/greetList.html',
			controller: 'greetListCtrl'
		})
		.when('/useHoliday/:type/:num', {
			templateUrl: '../html/useHoliday.html',
			controller: 'useHolidayCtrl'
		})
		.when('/useGreet/:type/:num', {
			templateUrl: '../html/useGreet.html',
			controller: 'useGreetCtrl'
		})
		.when('/wechatCircle/:type/:num', {
			templateUrl: '../html/wechatCircle.html',
			controller: 'wechatCircleCtrl'
		})
		.when('/promotion', {
			templateUrl: '../html/promotion.html',
			controller: 'promotionCtrl'
		})
		.when('/guest', {
			templateUrl: '../html/guest.html',
			controller: 'guestCtrl'
		})
		.when('/homePage/:uuid', {
			templateUrl: '../html/homePage.html',
			controller: 'homePageCtrl'
		})
		.when('/changeHomePage/:num', {
			templateUrl: '../html/changeHomePage.html',
			controller: 'changeHomePageCtrl'
		})
		.when('/life', {
			templateUrl: '../html/life.html',
			controller: 'lifeCtrl'
		})
		.when('/notice', {
			templateUrl: '../html/notice.html',
			controller: 'noticeCtrl'
		})
		.when('/useNotice/:type/:num', {
			templateUrl: '../html/useNotice.html',
			controller: 'useNoticeCtrl'
		})
		.when('/useActive/:num', {
			templateUrl: '../html/useActive.html',
			controller: 'useActiveCtrl'
		})
		.when('/paySuccess', {
			templateUrl: '../html/paySuccess.html',
			controller: 'paySuccessCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);


// 获取地理位置并设置到localStorage中，通过code进行登录
(function init() {
	var code = getUrlParam('code');
        
    if (code) {
        // 通过code获取access_token等信息
        var data = {
            appid: 'wx45618195d7038b9d',                    //小悦科技公众号配置信息
            secret: '7156c0de543979bbb701006487a4e04a',
            code: code,
            grant_type: 'authorization_code'
        };
        $.ajax({
            url: '/sns/oauth2/access_token',
            type: 'GET',
            data: data,
            async: false,
            success: function (resp) {
            	// alert('授权成功');
                resp = JSON.parse(resp);
                if (resp.errcode) {
                  // alert(resp.errmsg);
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
								window.location.href = 'fast_login';
							}else if(0 === resp.code){
								// alert(resp.reason);
							}
			            },
			            error: function (resp) {
			                // alert(resp);
			            }
			        });
                }
            },
            error: function () {
                alert('授权信息获取失败');
            }
        });
    }
    // 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
    var useragent = navigator.userAgent;
    if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
        // 这里警告框会阻塞当前页面继续加载
        alert('已禁止本次访问：请用微信内置浏览器访问本页面！');
        // 以下代码是用javascript强行关闭当前页面
        var opened = window.open('about:blank', '_self');
        opened.opener = null;
        opened.close();
    }
	
	// if (navigator.geolocation) {
 //    	navigator.geolocation.getCurrentPosition(showPosition);
 //    }
 //    else {
 //    	alert('当前浏览器不支持navigator.geolacation');
 //    }
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