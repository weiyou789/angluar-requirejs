/**
 * Created with JetBrains WebStorm.
 * User: @kazaff
 * Date: 13-9-5
 * Time: 下午4:04
 */
define(function(){
    //定义要加载的模块
    return window.config = {
        host: 'http://localhost:8090/yingyan/'
        , domain: 'http://localhost:8090/yingyan/'
        , modules:[
            'modules/ssgk',
            'modules/index',
            'modules/ssbg',
            'modules/jyfx',
            'modules/ztfx'
        ]
    };
});