define(function(){
    'use strict';

    var initialize = function(module){
        module
            .directive('yyFooter', [function(){
                return {
                    restrict: 'EA'
                    , replace: true
                    , templateUrl:'component/_footer.html'
                    , scope: {}
                };
            }]);


        return module;
    };
    return {
        initialize: initialize
    };
});