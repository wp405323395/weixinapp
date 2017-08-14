/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

//var host = "192.168.1.134"
var host = 'www.maywidehb.com';
var isHttps = true;
var schema = isHttps ? 'https':'http';
var config = {
    // 下面的地址配合云端 Server 工作
    host,
    srcUrl: `${schema}://${host}/`,
    // 登录地址，用于建立会话
    loginUrl: `${schema}://${host}/wappweb/mcwx/mc-wx!login`,
    discoverUrl: `${schema}://${host}/wappweb/mcwx/mc-wx!queryCouponList `,
    mycoup: `${schema}://${host}/wappweb/mcwx/mc-wx!queryWxCouponList`,
    loadProduct: `${schema}://${host}/wappweb/mcwx/mc-wx!queryCouponDetailById`,
    useCoup: `${schema}://${host}/wappweb/mcwx/mc-wx!useCoupon`,
    receiveCoup: `${schema}://${host}/wappweb/mcwx/mc-wx!receiveCoupon`,
    received_tickit_url: `${schema}://${host}/wappweb/mcwx/mc-wx!queryUnuseCouponList`,
    deleteCoup: `${schema}://${host}/wappweb/mcwx/mc-wx!delCoupon`,
        
    businessAuther: `${schema}://${host}/wappweb/mcwx/merc-wx!doMercSettled`,
    queMercDetail: `${schema}://${host}/wappweb/mcwx/merc-wx!queMercDetail`,
    publishMercCoup: `${schema}://${host}/wappweb/mcwx/merc-wx!publishMercCoup`,
    

    used_tickit_url: `${schema}://${host}/wappweb/mcwx/mc-wx!queryUsedCouponList`,
    queryWxUserCouponDetail: `${schema}://${host}/wappweb/mcwx/mc-wx!queryWxUserCouponDetail`,
    uploadBusinessPic: `${schema}://${host}/wappweb/mcwx/file-upload!doUpload`,
    queMercSettled: `${schema}://${host}/wappweb/mcwx/merc-wx!queMercSettled`
    

};


module.exports = config
