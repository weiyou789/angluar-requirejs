define([
    //标准库
    'lib/console-min'
    , 'angular/angular'
    //控制器
    , 'modules/jyfx/controllers/llgk'
    , 'modules/jyfx/controllers/fxhxymfx'
    , 'modules/jyfx/controllers/fxzdyymfx'
    , 'modules/jyfx/controllers/zwly'
    , 'modules/jyfx/controllers/spgk'
    , 'modules/jyfx/controllers/flfx'
    , 'modules/jyfx/controllers/outsidedef'
    , 'modules/jyfx/controllers/lock'
    //服务
    , 'angular/angular-resource'
], function(console, angular, llgkCtrl,fxhxymfxCtrl,fxzdyymfxCtrl,zwlyCtrl,spgkCtrl,flfxCtrl,outsidedefCtrl, lockCtrl){
    'use strict';
    console.group('公共模块初始化');
    var jyfxModule = angular.module('jyfxModule', ['ngResource']);
    jyfxModule.controller('llgkCtrl', llgkCtrl);
    jyfxModule.controller('fxhxymfxCtrl', fxhxymfxCtrl);
    jyfxModule.controller('fxzdyymfxCtrl', fxzdyymfxCtrl);
    jyfxModule.controller('zwlyCtrl', zwlyCtrl);
    jyfxModule.controller('spgkCtrl', spgkCtrl);
    jyfxModule.controller('flfxCtrl', flfxCtrl);
    jyfxModule.controller('outsidedefCtrl', outsidedefCtrl);

    //llgkModule.controller('lockCtrl', lockCtrl);

    console.groupEnd();

    return jyfxModule;
});