define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    //控制器
    , 'modules/ztfx/controllers/ztfx'
    //服务
    , 'angular/angular-resource'
], function(console, angular, ztfxCtrl){
    'use strict';
    console.group('公共模块初始化');
    var ztfxModule = angular.module('ztfxModule', ['ngResource']);
    ztfxModule.controller('ztfxCtrl', ztfxCtrl);
    //llgkModule.controller('lockCtrl', lockCtrl);
    console.groupEnd();
    return ztfxModule;
});