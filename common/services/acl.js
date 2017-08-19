/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-6
 * Time: 下午4:40
 */
define(function(){
    'use strict';
    var initialize = function(module){
        module.factory('acl', ["$http", function($http){
            return {
                verify: function(argument){
                    return $http({
                        method: 'GET'
                        , //url: config.domain + 'acl/menu/' + encodeURIComponent(JSON.stringify(argument))
                        url: config.domain + 'data/menudata.js'
                    });
                }
                ,verifyfx: function(argument){
                    return $http({
                        method: 'GET'
                        , //url: config.domain + 'acl/menu/' + encodeURIComponent(JSON.stringify(argument))
                        url: config.domain + 'data/fxmenudata.js'
                    });
                }
                , status: function(api){
                    return $http({
                        method: 'GET'
                        , url: config.domain + 'acl/api/' + encodeURIComponent(api)
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