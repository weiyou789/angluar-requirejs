define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    //控制器
    , 'modules/index/controllers/index'
    //服务
    , 'angular/angular-resource'
], function(console, angular, indexCtrl){
    'use strict';
    console.group('公共模块初始化');
    var indexModule = angular.module('indexModule', ['ngResource']);
    indexModule.controller('indexCtrl', indexCtrl);

    //llgkModule.controller('lockCtrl', lockCtrl);

    console.groupEnd();

    return indexModule;
});