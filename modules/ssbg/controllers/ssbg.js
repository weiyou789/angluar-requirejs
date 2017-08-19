define([
    'config'
], function(config){
    'use strict';

    return ['$scope', 'auth', '$http','$rootScope', function($scope, Auth, $http,$rootScope){
        //console.log(config)
        //Auth.isLogined();
        $scope.mes = "你好";
    }];
});