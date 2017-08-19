define(function(){
    'use strict';
    return [
        {
            group: 'ssgk'
            , title: '实时概况'
            , icon: 'icon-home'
            , flag:'ssgk'
            , ifMenu: true
            , son:[
            {
                uri: '/ssgk'
                , controller: 'ssgkCtrl'
                , templateUrl: 'modules/ssgk/templetes/ssgk.html'
                , ifMenu: true
                , name: 'ssgk'
                , title: '实时概况'
                , icon: 'icon-th'
                , api: ''
            }
        ]
        },
        {
        group: 'ssgk'
        , title: '实时流量地图'
        , icon: 'icon-home'
        , flag:'sslldt'
        , son:[
            {
                uri: '/hxymfx'
                , controller: 'hxymfxCtrl'
                , templateUrl: 'modules/ssgk/templetes/hxymfx.html'
                , ifMenu: true
                , name: 'hxymfx'
                , title: '核心页面分析'
                , icon: 'icon-th'
                , api: ''
            }
            ,{
                uri: '/zdyymfx'
                , controller: 'zdyymfxCtrl'
                , templateUrl: 'modules/ssgk/templetes/zdyymfx.html'
                , ifMenu: true
                , name: 'zdyymfx'
                , title: '自定义页面分析'
                , icon: 'icon-th'
                , api: ''
            }
        ]
    },{
        group: 'ssgk'
        , title: '实时榜单'
        , icon: 'icon-home'
        , flag:'ssbd'
        , son:[
            {
                uri: '/spbqb'
                , controller: 'spbqbCtrl'
                , templateUrl: 'modules/ssgk/templetes/spbqb.html'
                , ifMenu: true
                , name: 'spbqb'
                , title: '商品百强榜'
                , icon: 'icon-th'
                , api: ''
                ,inlink:[
                    {
                        uri:'/spbqbdef'
                        , controller: 'spbqbdefCtrl'
                        , templateUrl: 'modules/ssgk/templetes/spbqbdef.html'
                    }
                ]
            }
        ]
    }]
});