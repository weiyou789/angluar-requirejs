define(function(){
    'use strict';

    return ['$scope', 'auth', function($scope, Auth){
        Auth.isLogined();

    }];
});