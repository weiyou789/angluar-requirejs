define(function(){
    'use strict';

    var initialize = function(module){

        module
            .directive('mainMenu', [function(){
                return {
                    restrict: 'EA'
                    , replace: true
                    , template:
                        '<ul id="J_menuList" class="menu-list clearfix fl">' +
                        '<li data-ng-repeat="item in data" data-ng-class="{cur: checkActive(item.group)}">' +
                        '<a href="{{item.url}}">{{item.navName}}</a>' +
                        '</li>' +
                        '</ul>'
                    , scope: {
                        data: '='
                    }
                    , controller: [function(){
                        //判断当前菜单组是否被选中：包含当前url显示的页面
                        //该方法会在菜单出现交互后频繁调用，貌似ngClass会导致动态监听
                        this.checkActive = function(group){
                            var breadCrumbs = null;
                            if(!angular.isUndefined(window.localStorage.breadCrumbs)){
                                breadCrumbs = JSON.parse(window.localStorage.breadCrumbs);
                            }
                            var currentLoaction =  angular.isUndefined(breadCrumbs[0])? {"group":""} : breadCrumbs[0];
                            //alert(currentLoaction.group)
                            return (group === currentLoaction.group)? true: false;
                        };

                        //初始化链接中的动态参数
                        this.createLink = function(argObj){
                            return function(uri){
                                angular.forEach(argObj, function(value, key){
                                    uri = uri.replace(':'+key, value);
                                });
                                return uri;
                            };
                        }
                    }]
                    , link: function(scope, element, attrs, controller){
                        scope.checkActive = controller.checkActive;
                        scope.createLink = controller.createLink((new Function('return ' + attrs.args))());
                    }
                };
            }]);


        return module;
    };

    return {
        initialize: initialize
    };
});