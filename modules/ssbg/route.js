define(function(){
    'use strict';
    return [{
        group: 'ssbg'
        , title: '实时报告'
        , icon: 'icon-home'
        , son:[
            {
                uri: '/ssbg'
                , controller: 'ssbgCtrl'
                , templateUrl: 'modules/ssbg/templetes/ssbg.html'
            }

        ]
    }]
});