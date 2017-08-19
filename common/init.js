define([
    //标准库
    'lib/console-min'
    //服务
    , 'common/services/auth'
    , 'common/services/acl'
    , 'common/services/action'
    , 'common/services/menuserv'
    //指令
    , 'common/directives/action'
    , 'common/directives/sidebar-menu'
    , 'common/directives/main-menu'
    , 'common/directives/sidebar-menufx'
    , 'common/directives/footer'
    //控制器
    , 'common/controllers/menu'
    , 'common/controllers/mainmenu'
    , 'common/controllers/menufx'
], function(console, auth, acl, actionS,menuserv, actionD, siderbarMenu,mainMenu,menufxD,footer,menu,mainMenuC,menufxC){
    'use strict';

    var initialize = function(module, routeRules){
        console.group('通用模块初始化');

        console.info('初始化服务：', ['auth', 'acl', 'action']);
        //初始化服务
        auth.initialize(module, routeRules);
        acl.initialize(module, routeRules);
        actionS.initialize(module, routeRules);
        menuserv.initialize(module, routeRules);

        console.info('初始化指令：', ['action', 'siderbar-menu', 'bread-crumbs', 'table-fixed-header']);
        //初始化指令
        actionD.initialize(module);
        siderbarMenu.initialize(module);
        mainMenu.initialize(module);
        menufxD.initialize(module);
        footer.initialize(module);

        console.info('初始化控制器：', ['menu']);
        //初始化控制器
        menu.initialize(module);
        mainMenuC.initialize(module);
        menufxC.initialize(module);

        console.groupEnd();
        //console.log(routeRules)
        return module;
    }

    return {
        initialize: initialize
    };
});