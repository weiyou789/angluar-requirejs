define(function(){
    'use strict';
    return [{
        group: 'index'
        , title: '首页'
        , icon: 'icon-home'
        , son:[
            {
                uri: '/index'
                , controller: 'indexCtrl'
                , templateUrl: 'modules/index/templetes/index.html'
            }

        ]
    }]
});