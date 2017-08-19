define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    //控制器
    , 'modules/ssbg/controllers/ssbg'
    //服务
    , 'angular/angular-resource'
], function(console, angular, ssbgCtrl){
    'use strict';
    console.group('公共模块初始化');
    var ssbgModule = angular.module('ssbgModule', ['ngResource']);
    ssbgModule.controller('ssbgCtrl', ssbgCtrl);
    //llgkModule.controller('lockCtrl', lockCtrl);
    console.groupEnd();
    return ssbgModule;
});