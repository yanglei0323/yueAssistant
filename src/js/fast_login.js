index.controller('fastLoginCtrl', ['$scope', '$http', '$window', '$location', '$interval','$timeout',
    function ($scope, $http, $window, $location, $interval,$timeout) {

    var phoneRe = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var codeRe = /^\d{4}$/;
    $scope.sendCodeText = '获取验证码';
    $scope.modalText = '';
    // 获取验证码
    $scope.getCode = function () {
        if ($scope.sending) {
            return;
        }
        if (!phoneRe.test($scope.phone)) {
            $scope.modalText='手机号码有误！';
            $('.prompt-container').show().fadeOut(2000);
            return;
        }
    	$http.post('/user/unl/sendlogin.json', {telephone: $scope.phone}, postCfg)
    	.then(function (resp) {
            console.log(resp);
    		if (1 === resp.data.code) {
                $scope.sending = true;
                var leftTime = 60;
    			var timer = $interval(function () {
                    if (leftTime > 0) {
                        $scope.sendCodeText = '重新发送(' + (leftTime--) + ')';
                    }
                    else {
                        $scope.sendCodeText = '发送验证码';
                        $scope.sending = false;
                        $interval.cancel(timer);
                    }
                }, 1000);
    		}
    	}, function (resp) {
    		// console.log(resp);
    	});
    };
    // 确认登录
    // $scope.confirmLogin = function () {
    //     if (-1 === checkParams()) {
    //         return;
    //     }
    // 	var data = {
    // 		telephone: $scope.phone,
    // 		check: $scope.code,
    //         type:1
    // 	};
    // 	$http.post('/user/unl/loginbytel.json', data, postCfg)
    // 	.then(function (resp) {
    //         if (1 === resp.data.code) {
    //             // console.log(resp);
    //             // 登录成功，将登录用户信息写到sessionStorage
    //             var user = resp.data.data;
    //             sessionStorage.setItem('user', JSON.stringify(user));
    //             console.log(user);
    //             // if (user.nickname === '') {
    //             //     // 昵称为空，跳转到完善信息页面
    //             //     $location.path('complete_info').search({type: 'modify'}).replace();
    //             //     return;
    //             // }
    //             $timeout(function () {
    //                 $window.history.back();
    //             });
    //         }
    //         else if (0 === resp.data.code) {
    //             $scope.modalText=resp.data.reason;
    //             $('.prompt-container').show().fadeOut(2000);
    //         }
    // 	}, function (resp) {
    //         // alert('数据请求失败，请稍后再试！');
    // 	});
    // };

    // 绑定手机
    $scope.confirmLogin = function () {
        if (-1 === checkParams()) {
            return;
        }
        var data = {
            telephone: $scope.phone,
            check: $scope.code,
            uuid:$scope.uuid
        };
        $http.post('/user/unl/bindtelephone.json', data, postCfg)
        .then(function (resp) {
            if (1 === resp.data.code) {
                var user = resp.data.data;
                sessionStorage.setItem('user', JSON.stringify(user));
                $timeout(function () {
                    $window.history.back();
                });
            }
            else if (0 === resp.data.code) {
                $scope.modalText=resp.data.reason;
                $('.prompt-container').show().fadeOut(2000);
            }else {
                $scope.modalText=resp.data.reason;
                $('.prompt-container').show().fadeOut(2000);
            }
        }, function (resp) {
            alert(resp.data.reason);
        });
    };

    function checkParams() {
        if (!phoneRe.test($scope.phone)) {
            $scope.modalText='手机号码有误！';
            $('.prompt-container').show().fadeOut(2000);
            return -1;
        }
        if (!codeRe.test($scope.code)) {
            $scope.modalText='验证码输入错误';
            $('.prompt-container').show().fadeOut(2000);
            return -1;
        }
        return 1;
    }
}]);