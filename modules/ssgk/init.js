define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    //控制器
    , 'modules/ssgk/controllers/ssgk'
    , 'modules/ssgk/controllers/hxymfx'
    , 'modules/ssgk/controllers/zdyymfx'
    , 'modules/ssgk/controllers/spbqb'
    , 'modules/ssgk/controllers/spbqbdef'
    , 'modules/ssgk/controllers/lock'
    //服务
    , 'angular/angular-resource'
], function(console, angular, ssgkCtrl,hxymfxCtrl,zdyymfxCtrl,spbqbCtrl,spbqbdefCtrl, lockCtrl){
    'use strict';
    console.group('公共模块初始化');
    var ssgkModule = angular.module('ssgkModule', ['ngResource']);
    ssgkModule.controller('ssgkCtrl', ssgkCtrl);
    ssgkModule.controller('hxymfxCtrl', hxymfxCtrl);
    ssgkModule.controller('zdyymfxCtrl', zdyymfxCtrl);
    ssgkModule.controller('spbqbCtrl', spbqbCtrl);
    ssgkModule.controller('spbqbdefCtrl', spbqbdefCtrl);

    //llgkModule.controller('lockCtrl', lockCtrl);

    console.groupEnd();

    return ssgkModule;
});