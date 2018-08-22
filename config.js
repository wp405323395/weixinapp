/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = 'www.htrnpay.cn';
// var host = "192.168.2.118:8080"
var isHttps = ('www.htrnpay.cn' == host);
var isDebug = !isHttps;
var schema = isHttps ? 'https':'http';
var config = {
    // 下面的地址配合云端 Server 工作
    host,
    isDebug,
    srcUrl: `${schema}://${host}/`,
    // 登录地址，用于建立会话
    loginUrl: `${schema}://${host}/scanweb/qrwx/wx-order!login`,
    discoverUrl: `${schema}://${host}/scanweb/mcwx/mc-wx!queryCouponList`,
    mycoup: `${schema}://${host}/scanweb/mcwx/mc-wx!queryWxCouponList`,
    loadProduct: `${schema}://${host}/scanweb/mcwx/mc-wx!queryCouponDetailById`,
    useCoup: `${schema}://${host}/scanweb/mcwx/mc-wx!useCoupon`,
    receiveCoup: `${schema}://${host}/scanweb/mcwx/mc-wx!receiveCoupon`,
    received_tickit_url: `${schema}://${host}/scanweb/mcwx/mc-wx!queryUnuseCouponList`,
    deleteCoup: `${schema}://${host}/scanweb/mcwx/mc-wx!delCoupon`,
        
    businessAuther: `${schema}://${host}/scanweb/mcwx/merc-wx!doMercSettled`,
    queMercDetail: `${schema}://${host}/scanweb/mcwx/merc-wx!queMercDetail`,
    publishMercCoup: `${schema}://${host}/scanweb/mcwx/merc-wx!publishMercCoup`,
    

    used_tickit_url: `${schema}://${host}/scanweb/mcwx/mc-wx!queryUsedCouponList`,
    queryWxUserCouponDetail: `${schema}://${host}/scanweb/mcwx/mc-wx!queryWxUserCouponDetail`,
    uploadBusinessPic: `${schema}://${host}/scanweb/mcwx/file-upload!doUpload`,
    queMercSettled: `${schema}://${host}/scanweb/mcwx/merc-wx!queMercSettled`,
    loadAllCoup: `${schema}://${host}/scanweb/mcwx/merc-wx!queMercCoupListByStoreid`,

    uploadQrInfo: `${schema}://${host}/scanweb/mcwx/mc-wx!saveCardidOpenid?scene=`,
    useCouponByWxCode: `${schema}://${host}/scanweb/mcwx/mc-wx!useCouponByWxCode`,
    mercSureUseCoup: `${schema}://${host}/scanweb/mcwx/merc-wx!mercSureUseCoup`,
    queMercAssistListByStoreid: `${schema}://${host}/scanweb/mcwx/merc-wx!queMercAssistListByStoreid`,
    
    addStoreAssit: `${schema}://${host}/scanweb/mcwx/merc-wx!addStoreAssit`,
    createStoreAssistCode: `${schema}://${host}/scanweb/mcwx/merc-wx!createStoreAssistCode`,
    delAssistbyAssistid: `${schema}://${host}/scanweb/mcwx/merc-wx!delAssistbyAssistid`,
    giveAwayCoupon: `${schema}://${host}/scanweb/mcwx/mc-wx!giveAwayCoupon`,
    gainGiveAwayCoupon: `${schema}://${host}/scanweb/mcwx/mc-wx!gainGiveAwayCoupon`,


    querySalesList: `${schema}://${host}/scanweb/qrwx/wx-order!querySalesList`,
    queryCustInfo: `${schema}://${host}/scanweb/qrwx/wx-order!queryCustInfo`,
    doOrder: `${schema}://${host}/scanweb/qrwx/wx-order!doOrder`,
    wxPay: `${schema}://${host}/scanweb/qrwx/wx-order!wxPay`,
    queryOrderKeyno: `${schema}://${host}/scanweb/qrwx/wx-order!queryOrderKeyno`,
    queCustInfoByOpenid: `${schema}://${host}/scanweb/qrwx/wx-order!queCustInfoByOpenid`,
    
    listCandidate: `${schema}://${host}/scanweb/vot/vot-wx!listCandidate`,
    listWxQuestion: `${schema}://${host}/scanweb/vot/vot-wx!listWxQuestion`,
    doVot: `${schema}://${host}/scanweb/vot/vot-wx!doVot`,
    isHadVot: `${schema}://${host}/scanweb/vot/vot-wx!isHadVot`,
    queQrcodePutById: `${schema}://${host}/scanweb/qrwx/qrcode!queQrcodePutById`,
    doQueServSalesPkgInfo: `${schema}://${host}/scanweb/qrwx/wx-order!doQueServSalesPkgInfo`,
    recordPayFaild: `${schema}://${host}/scanweb/qrwx/wx-order!savePayErrMsg`
};


module.exports = config
