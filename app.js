define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    , 'common/init'
    , 'angular/angular-resource'
    , 'angular/angular-route'
    , 'angular/angular-animate'
    , 'angular/angular-strap'
], function(console, angular, common){
    'use strict';

    var initialize = function(needModules, routeRules){

        console.group('初始化主模块配置');

        var deps = ['ngResource', 'ngRoute', 'ngAnimate', '$strap.directives'];
        for(var index in needModules){
            deps.push(needModules[index].name);
        }
        console.info('获取主模块依赖的模块：', deps);

        var mainModule = angular.module('webOS', deps);

        console.groupEnd();
        console.info('定义该应用的主模块：', mainModule.name);

        mainModule.config(['$httpProvider', '$locationProvider', '$routeProvider', '$windowProvider', '$compileProvider', function($httpProvider, $locationProvider, $routeProvider, $windowProvider, $compileProvider){

            $locationProvider.html5Mode(false).hashPrefix('!');
            //解决跨域问题
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

            console.group('初始化主模块的路由规则');
            angular.forEach(routeRules, function(item){
                angular.forEach(item,function(val){
                    if(typeof(val) != 'undefined'){
                        angular.forEach(val.son, function(route){
                            if(route.inlink){
                                angular.forEach(route.inlink,function(link){
                                    console.info('增加子路由：', link.uri);
                                    $routeProvider.when(link.uri, {
                                        templateUrl: link.templateUrl
                                        , controller: link.controller
                                    });
                                });
                            }
                            if(!angular.isUndefined(route.uri)){
                                console.info('增加路由：', route.uri);
                                $routeProvider.when(route.uri, {
                                    templateUrl: route.templateUrl
                                    , controller: route.controller
                                });
                            }
                        });
                    }
                });
            });

            //TODO 避免硬编码
            $routeProvider.otherwise({
                redirectTo:'/index'
            });

            console.groupEnd();

            //TODO 为了兼容旧浏览器，需要增加其他浏览器端持久化token的方法
            if(window.localStorage.token){
                $httpProvider.defaults.headers.common['AUTH'] = 'MD ' + window.localStorage.token;
            }

            //响应拦截器，用于检查登录状态
            $httpProvider.interceptors.push(function($q){
                return {
                    'response': function(response){

                        //若返回的数据中指示该用户未登录，则触发跳转到登录页面
                        if(!angular.isUndefined(response.data)){
                            if(!angular.isUndefined(response.data.loginStatus) && response.data.loginStatus == 0){
                                delete window.localStorage.token;   //删除会话id
                                $windowProvider.$get().location.href = config.host + 'login.html';
                            }

                            if(!angular.isUndefined(response.data.allow) && response.data.allow == 0){
                                delete window.localStorage.token;   //删除会话id
                                $windowProvider.$get().location.href = config.host + 'login.html';
                            }
                        }

                        return response || $q.when(response);
                    }
                };
            });
        }]);

        //加载通用模块
        common.initialize(mainModule, routeRules);

        //日期控件的配置
        /*mainModule.value('$strapConfig', {
            datepicker: {
                language:  'zh-CN'
                , weekStart: 1
                , todayBtn:  1
                , autoclose: 1
                , todayHighlight: 1
                , keyboardNavigation: 1
                , pickerPosition: 'bottom-left'
                , format: 'yyyy-mm-dd'
            }
        });*/

        return mainModule;
    };

    return {
        initialize: initialize
    };
});