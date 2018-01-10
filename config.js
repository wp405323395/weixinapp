/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la


//var host = 'www.maywidehb.com';
var host = "192.168.1.200:8080"
var isHttps = (host == 'www.maywidehb.com')?true:false;
var isDebug = true;
var schema = isHttps ? 'https':'http';
var srcHost = 'https://www.maywidehb.com/'
var config = {
    // 下面的地址配合云端 Server 工作
    host,
    isDebug,
    srcUrl: `${srcHost}`,
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

    queryCustInfo: `${schema}://${host}/wappweb/mcwx/order!queryCustInfo`,
    queryOrderKeyno: `${schema}://${host}/wappweb/mcwx/order!queryOrderKeyno`,
    querySalesList: `${schema}://${host}/wappweb/mcwx/order!querySalesList`,
    doOrder: `${schema}://${host}/wappweb/mcwx/order!doOrder`,
    uploadQrInfo: `${schema}://${host}/wappweb/mcwx/mc-wx!saveCardidOpenid?scene=`,
    useCouponByWxCode: `${schema}://${host}/wappweb/mcwx/mc-wx!useCouponByWxCode`,
    mercSureUseCoup: `${schema}://${host}/wappweb/mcwx/merc-wx!mercSureUseCoup`,
    queMercAssistListByStoreid: `${schema}://${host}/wappweb/mcwx/merc-wx!queMercAssistListByStoreid`,
    
    addStoreAssit: `${schema}://${host}/wappweb/mcwx/merc-wx!addStoreAssit`,
    createStoreAssistCode: `${schema}://${host}/wappweb/mcwx/merc-wx!createStoreAssistCode`,
    delAssistbyAssistid: `${schema}://${host}/wappweb/mcwx/merc-wx!delAssistbyAssistid`,
    giveAwayCoupon: `${schema}://${host}/wappweb/mcwx/mc-wx!giveAwayCoupon`,
    gainGiveAwayCoupon: `${schema}://${host}/wappweb/mcwx/mc-wx!gainGiveAwayCoupon`,
    queCustInfoByOpenid: `${schema}://${host}/wappweb/mcwx/order!queCustInfoByOpenid`,
    gainADInfo: `${schema}://${host}/wappweb/ad/ad!gainADInfo`,
    canTrySee: `${schema}://${host}/wappweb/ad/ad!canTrySee`,
    queryProduct: `${schema}://${host}/wappweb/mergeorder/merge-order!queryProduct`, 
    queryMergeOrderByProductId: `${schema}://${host}/wappweb/mergeorder/merge-order!queryMergeOrderByProductId`, 
    queryMergeOrderMembers:`${schema}://${host}/wappweb/mergeorder/merge-order!queryMergeOrderMembers`, 
    joininMergeOrder:      `${schema}://${host}/wappweb/mergeorder/merge-order!joininMergeOrder`, 
};


module.exports = config
