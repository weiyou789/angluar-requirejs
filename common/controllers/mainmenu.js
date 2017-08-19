define([
    'jquery/nprogress'
], function(NProgress){
    'use strict';

    var initialize = function(module){

        //主菜单
        module.controller('mainmenuCtrl', ['$scope', 'action', 'auth', '$window', '$modal', '$q', '$location', function($scope, Action, Auth, $window, $modal, $q, $location){
            var uri = $location.path();
            var breadCrumbs = [];
            var sonCrumbs = [];
            var menufxCrumbs = [];
            //console.log(uri)
            $scope.mainmenu = [];
            $scope.menu = [];
            Action.menu().success(function(data){
                //把组下包含的uri抽出来，用于方便sidebar-menu指令验证当前组
                angular.forEach(data, function(item,key){
                    //console.log(item);
                    data[key].sonUris = [];
                     angular.forEach(item.son, function(route){
                     data[key].sonUris.push(route.uri);
                     });
                });
                $scope.menu = data;
            });

            Action.menufx().success(function(data){
                //把组下包含的uri抽出来，用于方便sidebar-menu指令验证当前组
                angular.forEach(data, function(item,key){
                    data[key].sonUris = [];
                    angular.forEach(item.son, function(route){
                        data[key].sonUris.push(route.uri);
                    });
                });
                $scope.menufx = data;
            });
            Action.mainmenu().success(function(data){
                $scope.mainmenu = data.testdata;
            });

            if(uri=="/index"){
                breadCrumbs.push({"name": "index",group:"index"});
                window.localStorage.breadCrumbs = JSON.stringify(breadCrumbs);
            }
            if(uri=="/ssbg"){
                breadCrumbs.push({"name": "ssbg",group:"ssbg"});
                window.localStorage.breadCrumbs = JSON.stringify(breadCrumbs);
            }
            if(uri=="/ztfx"){
                breadCrumbs.push({"name": "ztfx",group:"ztfx"});
                window.localStorage.breadCrumbs = JSON.stringify(breadCrumbs);
            }
            $scope.$on("$routeChangeStart", function(angularEvent, next){
                NProgress.start();
                if(angular.isUndefined(next.$$route)){
                    return ;
                }
                sonCrumbs = [];
                menufxCrumbs = [];
                angular.forEach($scope.mainmenu,function(obj){
                    if(next.$$route.originalPath == obj.uri){
                        breadCrumbs = [];
                        breadCrumbs.push({name:obj.name,group:obj.group});
                    }
                });
                console.log(breadCrumbs)
                angular.forEach($scope.menu,function(group){
                    angular.forEach(group.son,function(page){
                        if(next.$$route.controller == page.controller){
                            breadCrumbs = [];
                            sonCrumbs.push({name:page.name,group:group.group});
                            breadCrumbs.push({name:"",group:group.group});
                        }else if(page.inlink){
                            angular.forEach(page.inlink,function(initem){
                                if(next.$$route.controller==initem.controller){
                                    breadCrumbs = [];
                                    sonCrumbs.push({name:page.name,group:group.group});
                                    breadCrumbs.push({name:"",group:group.group});
                                }
                            })
                        }
                    })
                });
                angular.forEach($scope.menufx,function(group){
                    angular.forEach(group.son,function(page){
                        if(next.$$route.controller == page.controller){
                            breadCrumbs = [];
                            menufxCrumbs.push({name:page.name,group:group.group});
                            breadCrumbs.push({name:"",group:group.group});
                        }else if(page.inlink){
                            angular.forEach(page.inlink,function(initem){
                                if(next.$$route.controller==initem.controller){
                                    breadCrumbs = [];
                                    menufxCrumbs.push({name:page.name,group:group.group});
                                    breadCrumbs.push({name:"",group:group.group});
                                }
                            })
                        }
                    })
                });
                window.localStorage.breadCrumbs = JSON.stringify(breadCrumbs);
                window.localStorage.sonCrumbs = JSON.stringify(sonCrumbs);
                window.localStorage.menufxCrumbs = JSON.stringify(menufxCrumbs);
            });
            $scope.$on("$routeChangeSuccess", function(){
                NProgress.done();
            });
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});