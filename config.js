/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

//var host = "192.168.1.109:8080"
var host = 'www.maywidehb.com';
var isHttps = true;
var isDebug = true;
var schema = isHttps ? 'https':'http';
var config = {
    // 下面的地址配合云端 Server 工作
    host,
    isDebug,
    srcUrl: `${schema}://${host}/`,
    // 登录地址，用于建立会话
    loginUrl: `${schema}://${host}/wappweb/mcwx/mc-wx!login`,
    discoverUrl: `${schema}://${host}/wappweb/mcwx/mc-wx!queryCouponList`,
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
    queMercSettled: `${schema}://${host}/wappweb/mcwx/merc-wx!queMercSettled`,
    loadAllCoup: `${schema}://${host}/wappweb/mcwx/merc-wx!queMercCoupListByStoreid`,

    uploadQrInfo: `${schema}://${host}/wappweb/mcwx/mc-wx!saveCardidOpenid?scene=`,
    useCouponByWxCode: `${schema}://${host}/wappweb/mcwx/mc-wx!useCouponByWxCode`,
    mercSureUseCoup: `${schema}://${host}/wappweb/mcwx/merc-wx!mercSureUseCoup`,
    queMercAssistListByStoreid: `${schema}://${host}/wappweb/mcwx/merc-wx!queMercAssistListByStoreid`,
    
    addStoreAssit: `${schema}://${host}/wappweb/mcwx/merc-wx!addStoreAssit`,
    createStoreAssistCode: `${schema}://${host}/wappweb/mcwx/merc-wx!createStoreAssistCode`,
    delAssistbyAssistid: `${schema}://${host}/wappweb/mcwx/merc-wx!delAssistbyAssistid`,
    giveAwayCoupon: `${schema}://${host}/wappweb/mcwx/mc-wx!giveAwayCoupon`,
    gainGiveAwayCoupon: `${schema}://${host}/wappweb/mcwx/mc-wx!gainGiveAwayCoupon`,


    querySalesList: `${schema}://${host}/wappweb/qrwx/wx-order!querySalesList`,
    queryCustInfo: `${schema}://${host}/wappweb/qrwx/wx-order!queryCustInfo`,
    doOrder: `${schema}://${host}/wappweb/qrwx/wx-order!doOrder`,
    queryOrderKeyno: `${schema}://${host}/wappweb/qrwx/wx-order!queryOrderKeyno`,
    queCustInfoByOpenid: `${schema}://${host}/wappweb/qrwx/wx-order!queCustInfoByOpenid`,
};


module.exports = config
