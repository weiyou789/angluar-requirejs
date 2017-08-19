define(function(){
    'use strict';

    var initialize = function(module){

        module
            .directive('kzSidebarMenu', ["$timeout",function($timeout){
                return {
                    restrict: 'EA'
                    , replace: true
                    , template:
                        '<ul id="J_levelList" class="l1-list">' +
                        '<li data-ng-repeat="item in data">' +
                        '<a><em class="open"></em> {{ item.title }}</a>' +
                        '<dl class="l2-list">' +
                        '<dd data-ng-repeat="operation in item.son" data-ng-class="{cur: checkActive(operation.name)}">' +
                        '<a data-ng-href="#!{{ createLink(operation.uri) }}">{{ operation.title }}</a>' +
                        '</dd>' +
                        '</dl>' +
                        '</li>' +
                        '</ul>'
                    , scope: {
                        data: '='
                    }
                    , controller: [function(){
                        //判断当前菜单组是否被选中：包含当前url显示的页面
                        //该方法会在菜单出现交互后频繁调用，貌似ngClass会导致动态监听
                        this.checkActive = function(name){
                            var sonCrumbs = null;
                            if(!angular.isUndefined(window.localStorage.sonCrumbs)){
                                sonCrumbs = JSON.parse(window.localStorage.sonCrumbs);
                            }
                            //console.log(sonCrumbs)
                            var currentLoactions =  angular.isUndefined(sonCrumbs[0])? {"name":""} : sonCrumbs[0];
                            return (name === currentLoactions.name)? true: false;
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
                        $timeout(function(){
                            //console.log(element.find("a"))
                        },10)

                        /*scope.toggle = function(target){
                            //alert(target)
                            angular.forEach(scope.data, function(item){
                                if(target !== item){
                                    item.show = false;
                                }
                            });

                            target.show = !target.show;
                        };*/
                    }
                };
            }])
            /*.directive('slideSwitch', ['$animate', function($animate){
                return function(scope, element, attrs){
                    scope.$watch(attrs.slideSwitch, function(value){
                        if(value){
                            $animate.addClass(element, 'slideSwitchAnimate');
                        }else{
                            $animate.removeClass(element, 'slideSwitchAnimate');
                        }
                    });
                }
            }])
            .animation('.slideSwitchAnimate', function(){
                return {
                    addClass: function(element, className){
                        element.slideDown();
                    },
                    removeClass: function(element, className){
                        element.slideUp();
                    }
                }
            });*/

        return module;
    };

    return {
        initialize: initialize
    };
});