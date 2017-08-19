var echarts = require("echarts");
var Newyy = (function($, win) {
    $.method = $.method || {};
    $.method = {
        clickshow: function(options) {
            this.clickshow.def = {
                evObj: null,
                openClass: "open"
            };
            var opts = $.extend(this.clickshow.def, options);
            var evObj = opts.evObj,
                openClass = opts.openClass;
            var timer = null;


            var _this = this;
            if (!typeof evObj == "object") {
                return false
            }
            evObj.each(function() {
                $(this).on('click', function(e) {
                    e.stopPropagation();
                    var _pt = $(this).parent();
                    if (_pt.hasClass(openClass)) {
                        _pt.removeClass(openClass);
                    } else {
                        _pt.addClass(openClass)
                        var _btn = $(this).siblings().find('.q-btn');
                        if (_btn.length > 0) {
                            var _sort = $('#sec-table').find('.sort').find('em');
                            var arr = [];
                            _sort.each(function(a) {
                                arr.push($(this).text())
                            });
                            _this.checkdef($(this).siblings(), arr);
                        }
                    }

                });
            });
            $('body', 'html').click(function() {
                $('.setting').removeClass('open');
            });
            $('.setting').click(function(e) {
                e.stopPropagation();
            })
        },
        checkdef: function(obj, arr) {
            var _btn = obj.find('.q-btn');
            var _err = obj.find('.err');
            var allspan = obj.find('span');
            var allarr = [];
            allspan.removeClass('cur');
            _err.hide();
            allspan.each(function() {
                $(this)[0]['flag'] = $.trim($(this).text());
            });
            for (var i = 0; i < arr.length; i++) {
                allspan.each(function() {
                    if ($(this)[0]['flag'] == arr[i]) {
                        $(this).addClass('cur');
                    }
                })
            }
            _btn.data('arr', arr);
            //console.log(allarr);
        },
        allclick: function(options) {
            this.allclick.def = {
                evObj: null,
                openClass: "cur",
                list: 'li',
                fn: ''
            };
            var opts = $.extend(this.allclick.def, options);
            var evObj = opts.evObj,
                openClass = opts.openClass,
                _fn = opts.fn;
            if (!typeof evObj == "object") {
                return false
            }
            evObj.each(function() {
                $(this).on('click', opts.list, function(e) {
                    var _isSelf = $(this).hasClass(openClass);
                    $(this).addClass(openClass).siblings().removeClass(openClass);
                    _fn && _fn.call($(this), e, _isSelf);
                })
            })

        },
        selectclick: function(fn) {
            var _source = $('.source-select');
            _source.each(function() {
                var _pts = $(this).parents().siblings('span');
                var _pt = $(this).parents('.setting');
                $(this).on('click', 'a', function() {
                    $(this).addClass('on').siblings().removeClass('on');
                    _pts.find('b').text($(this).text());
                    _pt.removeClass('open');
                    fn && fn.call($(this));
                })
            })
        },
        diycheck: function(id, max, def, fn) {
            var _chp = $('#' + id);
            var _btn = _chp.find('.q-btn');
            var _err = _chp.find('.err');
            var i = def || 0;
            var arr = [];
            var _span = null;
            /*var _span = _chp.find('.cur');
            _span.each(function(){
                arr.push($.trim($(this).text()));
            });
            _btn.data('arr',arr);*/
            _chp.on('click', 'span', function() {
                    if ($(this).hasClass('cur')) {
                        $(this).removeClass('cur');
                        i--;
                    } else {
                        i++;
                        $(this).addClass('cur');
                    }
                    _span = $('#' + id).find('.cur');
                    arr = [];
                    _span.each(function() {
                        arr.push($.trim($(this).text()));
                    });
                    if (arr.length > max) {
                        _err.show();
                    } else {
                        _err.hide();
                    }
                    _btn.data('arr', arr);
                })
                //console.log(arr);
            _btn.on('click', function() {
                fn.call($(this), _chp)
            })
        },
        sectable: function() {
            var _table = $('#sec-table');
            _table.on('click', '.tt-first', function() {
                var _pt = $(this).parents('dl');
                if (_pt.hasClass('open')) {
                    _pt.removeClass('open');
                } else {
                    _pt.addClass('open');
                }
            })
        },
        deviceChange: function(el, category) {
            alert('你点击' + category);
        },
        renderChannelChart: function(options) {
            this.renderChannelChart.def = {
                id: '',
                data: '',
                type: '',
                color: '',
                iconf: null,
                defsel: null,
                timeArr: '',
                curData: '',
                compareData: '',
                fn: ''
            };
            if (!Array.prototype.forEach) {
                Array.prototype.forEach = function(fun) {
                    var len = this.length;
                    if (typeof fun != "function")
                        throw new TypeError();

                    var thisp = arguments[1];
                    for (var i = 0; i < len; i++) {
                        if (i in this)
                            fun.call(thisp, this[i], i, this);
                    }
                };
            }
            var opts = this.opts = $.extend(this.renderChannelChart.def, options);
            var item = $("#" + opts.id);
            if (item.length <= 0) {
                return false;
            }
            var mainChart = echarts.init(item[0]);
            var _color = opts.color,
                _data = opts.data,
                legarr = [],
                _fn = opts.fn,
                timeArr = opts.timeArr,
                curData = opts.curData,
                compareData = opts.compareData;

            //console.log(legarr)
            var settings = (function(type) {
                if (type == "line") {
                    return {

                        color: ['#ade653', '#51ddf4'],
                        tooltip: {
                            trigger: 'axis',
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                            borderColor: '#b4aead',
                            borderWidth: 1,
                            color: '#e1e1e1',
                            axisPointer: {
                                lineStyle: {
                                    width: 1,
                                    color: '#ff9900'
                                }
                            },
                            formatter: function(params) {
                                var str1, str2;
                                if (params.length == 2) {
                                    if (params[0].dataIndex == params[1].dataIndex) {
                                        str1 = '<br><span style="color:#ade653">' + params[0].seriesName + ':  </span>' + (common.addKannma(params[0].value) + "").replace(undefined, 0);
                                        str2 = '<br><span style="color:#51def4">' + params[1].seriesName + ':  </span>' + (common.addKannma(params[1].value) + "").replace(undefined, 0);
                                        return params[1].name + ' - ' + params[1].name.split(":")[0] + ':59' + str1 + str2;
                                    } else if (params[0].dataIndex < params[1].dataIndex) {
                                        str1 = '<br><span style="color:#ade653">' + params[1].seriesName + ':  </span>' + (common.addKannma(params[1].value) + "").replace(undefined, 0);
                                        return params[1].name + ' - ' + params[1].name.split(":")[0] + ':59' + str1;
                                    } else if (params[0].dataIndex > params[1].dataIndex) {
                                        str1 = '<br><span style="color:#ade653">' + params[0].seriesName + ':  </span>' + (common.addKannma(params[0].value) + "").replace(undefined, 0);
                                        return params[0].name + ' - ' + params[0].name.split(":")[0] + ':59' + str1;
                                    }
                                } else if (params.length == 1) {
                                    if (params[0].seriesName == '本期') {
                                        str1 = '<br><span style="color:#ade653">' + params[0].seriesName + ':  </span>' + (common.addKannma(params[0].value) + "").replace(undefined, 0);
                                    } else if (params[0].seriesName == '对比期') {
                                        str1 = '<br><span style="color:#51def4">' + params[0].seriesName + ':  </span>' + (common.addKannma(params[0].value) + "").replace(undefined, 0);
                                    }
                                    return params[0].name + ' - ' + params[0].name.split(":")[0] + ':59' + str1;
                                }
                            },
                            textStyle: {
                                color: '#000'
                            }
                        },
                        title: {
                            show: false
                        },
                        grid: {
                            containLabel: true,
                            left: '5%'
                        },
                        legend: { //右上角标记
                            data: ['本期', '对比期'],
                            right: '2%',
                            itemWidth: 10
                        },

                        xAxis: [{
                            type: 'category',
                            boundaryGap: false,
                            data: timeArr,
                            max: 'dataMax',
                            splitLine: { //分割线
                                show: false
                            },

                            scala: true
                        }],
                        yAxis: [{
                            type: 'value',
                            splitNumber: 4 //Y轴分割段数
                        }],
                        series: [{
                            name: '本期',
                            type: 'line',
                            smooth: true,
                            zlevel: 1,
                            clipOverflow: true,
                            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA8UExURUxpcf////////////////////////////////////////////////vjnv/////89f312vvnqv3vxf3vx2i4dKUAAAANdFJOUwAC+dirilrgUwaUXPMYqBPOAAAAoklEQVQYGW2RiRKDIAxEw2EBkSjw///aDUeHtsQZIU83JAuRRPDW6ctYH1raXt7wCOMHVcdEsh6qYWF3ySnlegsV6LF50ogHCSoEt7CUQF2gCO38T1ZUiGSZywoLsyWoccYS0JNmXgi2zJquHcQwX/Is8u1B25Z+m9fSvJIx62ygInnJ8N0QweVjCKkTn1m3h/ns1sGof5NRIURch3Y29ut4A30GEFOnirPiAAAAAElFTkSuQmCC',
                            symbolSize: 10,
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: 'default',
                                        color: '#ade653',
                                        opacity: 0.7
                                    },
                                    lineStyle: {
                                        color: '#fae29c'
                                    }
                                }

                            },
                            data: curData

                        }, {
                            name: '对比期',
                            type: 'line',
                            smooth: true,
                            clipOverflow: false,
                            //symbol: 'circle',//线上的锚点
                            symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA8UExURUxpcf///////////////////////////////////////////1Dd9f///1Xf9Wfi9uz8/5ns+cHz+7nx+wFVPHoAAAAMdFJOUwDaApT6iq1W4gbzp94pn8cAAACzSURBVBgZbZHRFoQgCESpLLVEs/7/X3cGcV92OWp6YRBJhJbjlcK5XDHb0Za4qNsSna77RPzuq2Gyu7daW79JCSM2Ty2l1FLrgwMy5ARGMgw0ZQbekzAcGaIcqt2C4KGzqx4CdRvKsTboJagyYM5SVYOcgCRm2BjEY4bcPSa3i76hfpGXRExxsZK8eE9ansDiWX14Z+A7ninyryGybnAr6sVQ3UbrkOG3yWhfjkcKIR3+Oz7xng+jg0xf+QAAAABJRU5ErkJggg==', //线上的锚点

                            symbolSize: 10,
                            itemStyle: {
                                normal: {
                                    areaStyle: {
                                        type: 'default',
                                        color: '#51ddf4',
                                        opacity: 1
                                    },
                                    lineStyle: {
                                        color: '#51ddf4'
                                    }
                                }
                            },
                            data: compareData
                        }]

                    }
                } else if (type == "pie") {
                    _data.forEach(function(o, i) {
                        if (opts.iconf) {
                            legarr = [].concat.call(legarr, {
                                icon: 'image://' + opts.iconf + i + '.png',
                                name: o.name
                            });
                        } else {
                            legarr = [].concat.call(legarr, {
                                icon: 'circle',
                                name: o.name
                            });
                        }
                    });
                    return {
                        grid: {
                            containLabel: true
                        },
                        color: _color,
                        legend: {
                            orient: 'vertical',
                            left: '35%',
                            top: '53%',
                            selectedMode: false,
                            itemWidth: 10,
                            itemHeight: 10,
                            data: legarr
                        },
                        series: [{
                            type: 'pie',
                            radius: '80%',
                            center: ['50%', '30%'],
                            data: _data,

                            label: {
                                normal: {
                                    show: false
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            minAngle: 10,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }]
                    }
                }
            })(opts.type);
            mainChart.setOption(settings);
            if (!isNaN(opts.defsel)) {
                mainChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: 0
                });
            }
            _fn && _fn.call(this, mainChart, item);
        }
    };
    return $.method;
})(jQuery, window);