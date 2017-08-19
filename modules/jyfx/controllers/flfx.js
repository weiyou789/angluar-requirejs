define([
    'config'
], function(config){
    'use strict';
    return ['$scope', 'auth', '$http','$rootScope', function($scope, Auth, $http,$rootScope){
        //Auth.isLogined();
        $scope.mes = "测试";
        var callback = function() {
            var _mc = arguments[0];
            var _itm = arguments[1];
            var _pt = _itm.parent();
            var _dataarea = _pt.find('.data-pop');
            var _datatable = _pt.siblings();
            var len = this.opts.data.length;
            _mc.on('click', function(params) {
                var _color = params.color,
                    _val = params.data.value,
                    _name = params.data.name,
                    _per = params.percent;
                for (var i = 0; i < len; i++) {
                    _mc.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: i
                    });
                }
                _mc.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: params.dataIndex
                });
                _dataarea.css('background', _color);
                _dataarea.find('b').css('borderTopColor', _color);
                _dataarea.find('strong').text(_name);
                _dataarea.find('p').eq(0).text(_val + '个访客');
                _dataarea.find('p').eq(1).text('占比' + _per + '%');
                _datatable.css('borderColor', _color);
                _datatable.find('.left-arrow1').css('borderRightColor', _color);
            })
        };
        var checkback = function() {
            var _this = this;
            var _data = _this.data('arr');
            var _pbox = arguments[0];
            if (_data.length > 3) {
                return false;
            } else {
                _pbox.parent().removeClass('open');
                //console.log(_data)
            }
        };
        Newyy.renderChannelChart({
            id: 'chart1',
            color: ['#f55a6b', '#fd7c29', '#fbc22a', '#bee700', '#89ca41', '#00dcb1', '#62b8cb', '#2f849b', '#7b50c0', '#cb6ddf'],
            data: [{
                value: 335,
                name: '硬广'
            }, {
                value: 310,
                name: '红孩子-硬广'
            }, {
                value: 234,
                name: '搜索'
            }, {
                value: 135,
                name: '红孩子-搜索'
            }, {
                value: 1548,
                name: '导航'
            }, {
                value: 435,
                name: '直接流量'
            }, {
                value: 261,
                name: '红孩子-网站'
            }, {
                value: 135,
                name: '广告联盟'
            }, {
                value: 713,
                name: '其他'
            }, {
                value: 173,
                name: 'EDM'
            }],
            defsel: 0,
            type: 'pie',
            fn: callback
        });
        Newyy.renderChannelChart({
            id: 'chart2',
            color: ['#f47c88', '#fc9753', '#ffce55', '#caec2c', '#a0d468', '#0fe4bf', '#80c7d6', '#5a9bb0', '#9573cd', '#d58ae5'],
            data: [{
                value: 335,
                name: '-'
            }, {
                value: 310,
                name: 'list'
            }, {
                value: 234,
                name: 'search'
            }, {
                value: 135,
                name: '不祥'
            }, {
                value: 1548,
                name: '促销页'
            }, {
                value: 435,
                name: '功能页'
            }, {
                value: 355,
                name: '商品详情页'
            }, {
                value: 218,
                name: '营销产品'
            }, {
                value: 156,
                name: '频道页'
            }, {
                value: 642,
                name: '首页'
            }],
            defsel: 0,
            type: 'pie',
            iconf:config.host+ 'assets/images/chartico',
            fn: callback
        });
        Newyy.sectable();
        Newyy.clickshow({
            evObj: $('.setbtn')
        });
        Newyy.diycheck('diycheck', 3, 3, checkback);
        Newyy.diycheck('diycheck1', 3, 3, checkback);
        Newyy.allclick({
            evObj: $('#sec-table'),
            list: '.sort',
            fn: function() {
                //console.log(this);后台开发方法，this就是当前点击的元素
            }
        });
        Newyy.allclick({
            evObj: $('#channel'),
            fn: function() {
                //console.log(this);后台开发方法，this就是当前点击的元素
            }
        });
        Newyy.allclick({
            evObj: $('#channel1'),
            fn: function() {
                //console.log(this);后台开发方法，this就是当前点击的元素
            }
        });
        /*Newyy.renderChannelChart({
            id: 'trendchart',
            timeArr: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
            curData: [2571296, 1642076, 1253549, 1103772, 1154933, 975191, 2008227, 3952152, 2779092, 5015732, 5957072, 5541254, 5197585, 5319141, 5447887, 5590428, 5580906, 4903339, 4381367, 125285],
            compareData: [1887250, 1152593, 869623, 742374, 676378, 727811, 1470415, 2230158, 3077535, 4055910, 4804120, 4524081, 4126187, 4240524, 4315941, 4435622, 4396123, 3856298, 3475809, 3888193, 4510846, 4622470, 4222968, 2875199],
            type: 'line'
        });

        Newyy.renderChannelChart({
            id: 'trendchart1',
            timeArr: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
            curData: [2571296, 1642076, 1253549, 1103772, 1154933, 975191, 2008227, 3952152, 2779092, 5015732, 5957072, 5541254, 5197585, 5319141, 5447887, 5590428, 5580906, 4903339, 4381367, 125285],
            compareData: [1887250, 1152593, 869623, 742374, 676378, 727811, 1470415, 2230158, 3077535, 4055910, 4804120, 4524081, 4126187, 4240524, 4315941, 4435622, 4396123, 3856298, 3475809, 3888193, 4510846, 4622470, 4222968, 2875199],
            type: 'line'
        });*/
    }];
});