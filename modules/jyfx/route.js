define(function(){
    'use strict';
    return [
        {
            group: 'jyfx'
            , title: '流量分析'
            , icon: 'icon-home'
            , flag:'llfx'
            , ifMenu: true
            , son:[
            {
                uri: '/llgk'
                , controller: 'llgkCtrl'
                , templateUrl: 'modules/jyfx/templetes/llgk.html'
                , ifMenu: true
                , name: 'llgk'
                , title: '流量概况'
                , icon: 'icon-th'
                , api: ''
            },
            {
                uri: '/fxhxymfx'
                , controller: 'fxhxymfxCtrl'
                , templateUrl: 'modules/jyfx/templetes/fxhxymfx.html'
                , ifMenu: true
                , name: 'fxhxymfx'
                , title: '核心页面分析'
                , icon: 'icon-th'
                , api: ''
            },
            {
                uri: '/fxzdyymfx'
                , controller: 'fxzdyymfxCtrl'
                , templateUrl: 'modules/jyfx/templetes/fxzdyymfx.html'
                , ifMenu: true
                , name: 'fxzdyymfx'
                , title: '自定义页面分析'
                , icon: 'icon-th'
                , api: ''
            },
            {
                uri: '/zwly'
                , controller: 'zwlyCtrl'
                , templateUrl: 'modules/jyfx/templetes/zwly.html'
                , ifMenu: true
                , name: 'zwly'
                , title: '站外来源'
                , icon: 'icon-th'
                , api: ''
                ,inlink:[
                {
                    uri:'/outsidedef'
                    , controller: 'outsidedefCtrl'
                    , templateUrl: 'modules/ssgk/templetes/outsidedef.html'
                }
            ]
            }
        ]
        },
        {
        group: 'jyfx'
        , title: '商品分析'
        , icon: 'icon-home'
        , flag:'spfx'
        , son:[
            {
                uri: '/spgk'
                , controller: 'spgkCtrl'
                , templateUrl: 'modules/jyfx/templetes/spgk.html'
                , ifMenu: true
                , name: 'spgk'
                , title: '商品概况'
                , icon: 'icon-th'
                , api: ''
            }
            ,{
                uri: '/flfx'
                , controller: 'flfxCtrl'
                , templateUrl: 'modules/jyfx/templetes/flfx.html'
                , ifMenu: true
                , name: 'flfx'
                , title: '分类分析'
                , icon: 'icon-th'
                , api: ''
            }
        ]
    }]
});