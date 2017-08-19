define(function(){
    'use strict';
    return [{
        group: 'ztfx'
        , title: '专题分析'
        , icon: 'icon-home'
        , son:[
            {
                uri: '/ztfx'
                , controller: 'ztfxCtrl'
                , templateUrl: 'modules/ztfx/templetes/ztfx.html'
            }

        ]
    }]
});