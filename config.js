/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = "192.168.1.156"

var config = {

    // 下面的地址配合云端 Server 工作
    host,

    srcUrl: `http://${host}/`,
    // 登录地址，用于建立会话
    loginUrl: `http://${host}/wappweb/mcwx/mc-wx!login`,

    received_tickit_url: `http://${host}/wappweb/mcwx/mc-wx!queryUnuseCouponList`,

    used_tickit_url: `http://${host}/wappweb/mcwx/mc-wx!queryUsedCouponList`,
    
    queryWxUserCouponDetail: `http://${host}/wappweb/mcwx/mc-wx!queryWxUserCouponDetail`,

    // 测试的请求地址，用于测试会话
    requestUrl: `https://${host}/wappweb/merchantcoupon/tv/merchant-coupon!test`,
    
    useCoupon: `http://${host}/wappweb/mcwx/mc-wx!useCoupon`,

};


module.exports = config
