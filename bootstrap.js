'use strict';

require.config({
    baseUrl: '.'
    , paths: {
        'angular': 'lib/angularJS'
        , 'jquery' : 'lib/jquery'
        ,'echarts':'lib/echarts'
    }
    , shim: {
         'angular/angular-resource': ['angular/angular']
        , 'angular/angular-route': ['angular/angular']
        , 'angular/angular-animate': ['angular/angular']
        , 'angular/angular-strap': ['angular/angular']
        ,'jquery/newyingyan': {
            exports: 'Newyy'
            ,deps:['jquery/jquery','echarts']
        }
        , 'angular/angular': {
            exports: 'angular'
            , deps: ['jquery/jquery']
        }
        , 'lib/console-min': {
            exports: 'console'
        }

    }
});

require([
    'require'

    , 'lib/console-min'
    , 'utils/loader'
    , 'jquery/jquery'
    , 'angular/angular'
    ,'config'
    , 'jquery/newyingyan'

    //公共代码
    , 'app'
    , 'common/services/auth'
    , 'common/services/acl'
    , 'common/services/action'
    , 'common/directives/action'
    , 'common/directives/sidebar-menu'
    , 'common/directives/sidebar-menufx'
    , 'common/directives/main-menu'
    , 'common/directives/footer'
    , 'common/controllers/menu'
    , 'common/controllers/mainmenu'
    , 'common/controllers/menufx'
    , 'common/init'
    //业务代码
    , 'modules/ssgk/controllers/ssgk'
    , 'modules/ssgk/controllers/hxymfx'
    , 'modules/ssgk/controllers/zdyymfx'
    , 'modules/ssgk/controllers/spbqb'
    , 'modules/ssgk/controllers/spbqbdef'
    , 'modules/ssgk/init'
    , 'modules/ssgk/route'
    , 'modules/index/controllers/index'
    , 'modules/index/init'
    , 'modules/index/route'
    , 'modules/ztfx/controllers/ztfx'
    , 'modules/ztfx/init'
    , 'modules/ztfx/route'
    , 'modules/jyfx/controllers/flfx'
    , 'modules/jyfx/controllers/fxhxymfx'
    , 'modules/jyfx/controllers/fxzdyymfx'
    , 'modules/jyfx/controllers/llgk'
    , 'modules/jyfx/controllers/spgk'
    , 'modules/jyfx/controllers/zwly'
    , 'modules/jyfx/init'
    , 'modules/jyfx/route'

], function(require, console, loader, jquery, angular, config){
    console.group('webOS应用');

    console.group('判断浏览器是否内置支持json');
    if(!window.JSON){
        console.log('不支持，加载JSON2');
        require(['lib/json2']);
    }else{
        console.log('支持');
    }
    console.groupEnd();

    console.group('以后不后悔');
    if(!Function.prototype.bind){
        console.log('不支持，加载es5-shim');
        require(['lib/es5-shim']);
    }else{
        console.log('支持');
    }
    console.groupEnd();

    console.group('确定要加载的模块');
    console.info('应用要加载的业务模块：', config.modules);
    console.groupEnd();

    var deps = ['./app'].concat(loader.loadRouteRules(config.modules), loader.loadModules(config.modules));
    require(deps, function(){

        console.info('requireJS的导入的模块：', arguments);
        console.group('计算要创建的路由规则数据');

        //由于每个合法的模块都会包含init.js和route.js，所以这两类文件的个数应该是相等的
        var routes = [];
        for(var index = 1, max = (arguments.length - 1) / 2; index <= max; index++){
            routes.push(arguments[index]);
        }

        console.info('需要定义的路由数据：', routes);
        console.groupEnd();
        console.group('计算要加载的业务模块');

        var modules = [];
        for(var index = (arguments.length - 1) / 2 + 1, max = arguments.length; index < max; index++ ){
            if(typeof(arguments[index]) == 'undefined'){
                throw new Error('欲加载的模块配置文件不符合AMD语法');
            }

            modules.push(arguments[index]);
        }

        console.info('需要加载的业务模块：', modules);
        console.groupEnd();

        var mainModule = arguments[0].initialize(modules, routes);

        console.info('主模块赋予根DOM');

        angular.bootstrap(window.document, [mainModule.name]);
    });
});