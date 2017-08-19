/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-10
 * Time: 上午10:02
 */
define(function(){
    'use strict';

    var initialize = function(module, routeRules){

        module.factory('action', ['acl', '$q', '$location','menuserv', function(acl, $q, $location,menuserv){
            var data = routeRules;
            //console.log(data);
            //用于获取指定名称的链接数据，action指令使用
            var link = function(name, group){

                var link = {};
                angular.forEach(data, function(item){
                    if(item && item.group == group){
                        angular.forEach(item.son, function(route){
                            if(route.name == name){
                                link = route;
                                return false;
                            }
                        });
                        return false;
                    }
                });

                if(angular.isUndefined(link.status)){
                    //去后端获取
                    var promise = acl.status(link.api);
                    promise.then(function(response){
                        //缓存结果
                        link.status = response.data;
                        response.data = link;
                    });
                    return promise;
                }else{
                    var deferred = $q.defer();
                    deferred.resolve(link);
                    deferred.promise.success = function(fn){
                        deferred.promise.then(function(response){
                            fn(response);
                        });
                    };

                    return deferred.promise;
                }
            };

            //用于主菜单的方法
            var menu = function(){
                var menu = [];
                angular.forEach(data, function(item){
                    //console.log(item)
                    angular.forEach(item,function(val){
                        //console.log(val)

                        var group = {};
                        group.group = val.group;
                        group.title = val.title;
                        group.icon = val.icon;
                        group.flag = val.flag;
                        group.son = [];
                        angular.forEach(val.son, function(route){
                            if(route.ifMenu){
                                group.son.push(route);
                            }
                        });
                        if(group.son.length){
                            menu.push(group);
                        }
                    });

                });
                //console.log(menu);
                //去后端验证该用户对菜单项是否有权限操作
                //过滤掉后端验证权限不需要的属性，减少http传输的数据
                var argument = [];
                angular.forEach(menu, function(item){
                    var group = {};
                    group.group = item.group;
                    group.son = [];

                    angular.forEach(item.son, function(route){
                        if(angular.isUndefined(route.status)){
                            var info = {};
                            info.name = route.name;
                            info.api = route.api;
                            group.son.push(info);
                        }
                    });

                    argument.push(group);
                });

                var flag = false;
                angular.forEach(argument, function(item){
                    if(item.son.length){
                        flag = true;
                    }
                });

                //若已经存在缓存，则直接返回
                if(!flag){

                    var deferred = $q.defer();
                    deferred.resolve(menu);
                    deferred.promise.success = function(fn){
                        deferred.promise.then(function(response){
                            fn(response);
                        });
                    };

                    return deferred.promise;
                }

                //去后端验证

                var promise = acl.verify(argument);
                var arr = [];
                promise.then(function(response){
                    //处理验证的结果，并缓存到data中，以后就不需要重复请求了
                    angular.forEach(response.data, function(item){
                        //处理menu，用于视图菜单显示
                        angular.forEach(menu,function(menuItem, menuKey){
                            if(menuItem.flag==item.flag){
                                //arr[menuKey] = menuItem;
                                arr.push(menuItem);
                            }
                        });
                    });
                    response.data = arr;//给response赋值
                });
                return promise;
            };
            var menufx = function(){
                var menu = [];
                angular.forEach(data, function(item){
                    //console.log(item)
                    angular.forEach(item,function(val){
                        //console.log(val)

                        var group = {};
                        group.group = val.group;
                        group.title = val.title;
                        group.icon = val.icon;
                        group.flag = val.flag;
                        group.son = [];
                        angular.forEach(val.son, function(route){
                            if(route.ifMenu){
                                group.son.push(route);
                            }
                        });
                        if(group.son.length){
                            menu.push(group);
                        }
                    });

                });
                //console.log(menu);
                //去后端验证该用户对菜单项是否有权限操作
                //过滤掉后端验证权限不需要的属性，减少http传输的数据
                var argument = [];
                angular.forEach(menu, function(item){
                    var group = {};
                    group.group = item.group;
                    group.son = [];

                    angular.forEach(item.son, function(route){
                        if(angular.isUndefined(route.status)){
                            var info = {};
                            info.name = route.name;
                            info.api = route.api;
                            group.son.push(info);
                        }
                    });

                    argument.push(group);
                });

                var flag = false;
                angular.forEach(argument, function(item){
                    if(item.son.length){
                        flag = true;
                    }
                });

                //若已经存在缓存，则直接返回
                if(!flag){

                    var deferred = $q.defer();
                    deferred.resolve(menu);
                    deferred.promise.success = function(fn){
                        deferred.promise.then(function(response){
                            fn(response);
                        });
                    };

                    return deferred.promise;
                }

                //去后端验证

                var promise = acl.verifyfx(argument);
                var arr = [];
                promise.then(function(response){
                    //处理验证的结果，并缓存到data中，以后就不需要重复请求了
                    angular.forEach(response.data, function(item){
                        //处理menu，用于视图菜单显示
                        angular.forEach(menu,function(menuItem, menuKey){
                            if(menuItem.flag==item.flag){
                                //arr[menuKey] = menuItem;
                                arr.push(menuItem);
                            }
                        });
                    });
                    response.data = arr;//给response赋值
                });
                return promise;
            };

            var mainmenu = function(){
                var mainmenu = [];

                /*angular.forEach(data, function(item){
                    if(item){
                        var group = {};
                        group.group = item.group;
                        group.title = item.title;
                        group.icon = item.icon;
                        group.son = [];
                        angular.forEach(item.son, function(route){
                            if(route.ifMenu){
                                group.son.push(route);
                            }
                        });

                        if(group.son.length){
                            menu.push(group);
                        }
                    }
                });

                //去后端验证该用户对菜单项是否有权限操作
                //过滤掉后端验证权限不需要的属性，减少http传输的数据
                var argument = [];
                angular.forEach(menu, function(item){
                    var group = {};
                    group.group = item.group;
                    group.son = [];

                    angular.forEach(item.son, function(route){
                        if(angular.isUndefined(route.status)){
                            var info = {};
                            info.name = route.name;
                            info.api = route.api;
                            group.son.push(info);
                        }
                    });

                    argument.push(group);
                });

                var flag = false;
                angular.forEach(argument, function(item){
                    if(item.son.length){
                        flag = true;
                    }
                });*/

                //若已经存在缓存，则直接返回
                /*if(!flag){

                    var deferred = $q.defer();
                    deferred.resolve(menu);
                    deferred.promise.success = function(fn){
                        deferred.promise.then(function(response){
                            fn(response);
                        });
                    };

                    return deferred.promise;
                }*/

                //去后端验证
                var argument = [];
                var promise = menuserv.getdata(argument);
                promise.then(function(response){
                    //console.log(response)
                    //处理验证的结果，并缓存到data中，以后就不需要重复请求了
                    /*angular.forEach(response.data, function(item){

                        //处理menu，用于视图菜单显示
                        angular.forEach(menu, function(menuItem, menuKey){
                            if(menuItem.group == item.group){

                                angular.forEach(item.son, function(route){
                                    angular.forEach(menuItem.son, function(sonItem, sonKey){
                                        if(sonItem.name == route.name){

                                            menuItem.son[sonKey].status = route.status;
                                            return false;
                                        }
                                    });
                                });

                                menu[menuKey] = menuItem;
                                return false;
                            }
                        });
                    });*/
                    mainmenu  = response;
                    //response.data = menu;//给response赋值
                });
                return promise;
            };

            var findRoute = function(uri){

                var result = {};

                angular.forEach(data, function(group){
                    angular.forEach(group.son, function(route){
                        if(!angular.isUndefined(route.uri)){
                            var reg = new RegExp(route.uri.replace(/:\w*/g, '(.*)'), 'ig');
                            if(reg.test(uri)){

                                result = {
                                    group:  group.group
                                    , title: group.title
                                    , icon: group.icon
                                    , route: {
                                        uri: route.uri
                                        , controller: route.controller
                                        , templateUrl: route.templateUrl
                                        , ifMenu: route.ifMenu
                                        , name: route.name
                                        , title: route.title
                                        , icon: route.icon
                                        , api: route.api
                                    }
                                };

                                return false;
                            }
                        }
                    });

                    if(!angular.isUndefined(result.group)){
                        return false;
                    }
                });

                return result;
            };

            var forward = function(name, group, args){

                var link = '';

                angular.forEach(data, function(item){
                    if(item && item.group == group){
                        angular.forEach(item.son, function(route){
                            if(route.name == name){
                                link = route.uri;
                                return false;
                            }
                        });
                        return false;
                    }
                });

                angular.forEach(args, function(value, key){
                    link = link.replace(':'+key, value);
                });

                $location.path(link);
            };

            return {
                link: link
                , menu: menu
                ,mainmenu: mainmenu
                ,menufx:menufx
                , findRoute: findRoute
                , forward: forward
                , data: data
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});