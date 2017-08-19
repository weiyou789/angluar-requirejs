define(function(){
    'use strict';

    var initialize = function(module){
        module.directive('kzAction', ['action', function(action){
            return {
                restrict: 'EA'
                , replace: true
                , template: '<a></a>'
                , scope: {}
                , link: function(scope, element, attrs){
                    action.link(attrs.name, attrs.group).success(function(response){
                        var data = angular.copy(response);
                        //console.log(response)
                        element.html('<i data-toggle="tooltip" data-placement="top" title="" data-trigger="hover"  data-original-title="'+ data.title +'" class="'+ data.icon + '"></i> <span class="text">' + data.title + '</span>');
                        //element.find('i').tooltip();

                        if(data.status == 0){
                            //TODO 需要判断当前用户是否有权限进行该操作
                            element.remove(); //若无权限，则不显示该链接
                            //element.addClass('disabled'); //若无权限，则禁用该链接
                            //element.attr('href', '');

                        }else{
                            if(!angular.isUndefined(data.uri)){
                                //替换uri中的动态参数
                                if(!angular.isUndefined(attrs.args) && ! /:(\s*)[,|}]/.test(attrs.args)){

                                    //把字符串转换成js对象
                                    var argObj = (new Function('return ' + attrs.args + ';'))();
                                    angular.forEach(argObj, function(value, key){
                                        data.uri = data.uri.replace(':'+key, value);
                                    });
                                }
                                element.attr('href', '#!' + data.uri);
                            }
                        }
                    });
                }
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});