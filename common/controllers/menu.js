define([
    'jquery/nprogress'
], function(NProgress){
    'use strict';
    //console.log(Newyy)
    var initialize = function(module){

        //主菜单
        module.controller('menuCtrl', ['$scope', 'action', 'auth', '$window', '$modal', '$q', '$location', function($scope, Action, Auth, $window, $modal, $q, $location){
            $scope.menu = [];
            $scope.mainmenu = [];
            Action.menu().success(function(data){
                //console.log(data)
                //把组下包含的uri抽出来，用于方便sidebar-menu指令验证当前组
                angular.forEach(data, function(item,key){
                    data[key].sonUris = [];
                    angular.forEach(item.son, function(route){
                        data[key].sonUris.push(route.uri);
                    });
                });
                //console.log(data)
                $scope.menu = data;

            });
            Action.mainmenu().success(function(data){
                $scope.mainmenu = data.testdata;
                //console.log(data);
            });
            var modalPromise = $modal({
                template: 'logout.html'
                , persist: true
                , show: false
                , backdrop: 'static'
                , scope: $scope
            });
            var modal = $q.when(modalPromise);
            //用于触发 退出系统的模态窗口
            $scope.modalWin = function(){
                modal.then(function(modalEl){
                    modalEl.modal('show');
                });
            };

            $scope.logout = function(){
                //清除用户信息
                window.localStorage.token = '';

                //跳转到登录页
                $window.location.href = config.host + 'login.html';
            };

            $scope.openStatus = 1;
            $scope.expansion = function(){
                $scope.openStatus = - $scope.openStatus;
            };
        }]);

        return module;
    };

    return {
        initialize: initialize
    };
});