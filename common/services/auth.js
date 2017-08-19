/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: 上午9:16
 */
define(['config'],function(Config){
    'use strict';

    var initialize = function(module){
        module.factory('auth', ['$window', function($window){
            return {
                isLogined: function(){
                    //TODO 为了兼容旧浏览器，需要增加其他浏览器端持久化token的方法
                    if(!window.localStorage.token){
                        //TODO 避免硬编码
                        //跳转到登录页
                        $window.location.href = Config.host + 'login.html';
                    }
                }
                , userInfo: function(user){
                    if(angular.isUndefined(user)){
                        return {
                            id: window.localStorage.userId
                            ,account: window.localStorage.userAccount
                            , name: window.localStorage.userName
                            , idCard: window.localStorage.userIdCard
                            , sex: window.localStorage.userSex
                            , type: window.localStorage.userType
                            , email: window.localStorage.userEmail
                            , qq: window.localStorage.userQq
                            , phone: window.localStorage.userPhone
                            , mobile: window.localStorage.userMobile
                            , info: window.localStorage.userInfo
                            , photo: window.localStorage.userPhoto
                        };
                    }else{
                        window.localStorage.userId = user.id || 0;
                        window.localStorage.userAccount = user.account || '';
                        window.localStorage.userName = user.name || '';
                        window.localStorage.userIdCard = user.idCard || '';
                        window.localStorage.userSex = user.sex || -1;
                        window.localStorage.userType = user.type || '';
                        window.localStorage.userEmail = user.email || '';
                        window.localStorage.userQq = user.qq || '';
                        window.localStorage.userPhone = user.phone || '';
                        window.localStorage.userMobile = user.mobile || '';
                        window.localStorage.userInfo = user.info || '';
                        window.localStorage.userPhoto = user.photo || './img/default-face.png';
                    }
                }
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});