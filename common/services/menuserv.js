/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-6
 * Time: 下午4:40
 */
define(function(){
    'use strict';
    var initialize = function(module){
        module.factory('menuserv', ["$http", function($http){
            return {
                getdata: function(argument){
                    return $http({
                        method: 'GET'
                        , //url: config.domain + 'acl/menu/' + encodeURIComponent(JSON.stringify(argument))
                        url: config.domain + 'data/data01.js'
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