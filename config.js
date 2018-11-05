/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

var host = 'www.htrnpay.cn';
// var host = "192.168.2.110:8080"
// var host = "192.168.2.123:8080"
// var host = "192.168.2.108:8081"
 var host = "www.juzijumi.com:8181"
var isHttps = ('www.htrnpay.cn' == host);
var isDebug = !isHttps;
isDebug = true;
var schema = isHttps ? 'https':'http';
var config = {
    // 下面的地址配合云端 Server 工作
    host,
    isDebug,
    srcUrl: `${schema}://${host}/`,
    // 登录地址，用于建立会话
    loginUrl: `${schema}://${host}/scanweb/qrwx/wx-order!login`,

    querySalesList: `${schema}://${host}/scanweb/qrwx/wx-order!querySalesList`,
    queryCustInfo: `${schema}://${host}/scanweb/qrwx/wx-order!queryCustInfo`,
    wxPay: `${schema}://${host}/scanweb/qrwx/wx-order!wxPay`,
    queryOrderKeyno: `${schema}://${host}/scanweb/qrwx/wx-order!queryOrderKeyno`,
    queCustInfoByOpenid: `${schema}://${host}/scanweb/qrwx/wx-order!queCustInfoByOpenid`,
    
    listCandidate: `${schema}://${host}/scanweb/vot/vot-wx!listCandidate`,
    listWxQuestion: `${schema}://${host}/scanweb/vot/vot-wx!listWxQuestion`,
    doVot: `${schema}://${host}/scanweb/vot/vot-wx!doVot`,
    isHadVot: `${schema}://${host}/scanweb/vot/vot-wx!isHadVot`,
    queQrcodePutById: `${schema}://${host}/scanweb/qrwx/qrcode!queQrcodePutById`,
    doQueServSalesPkgInfo: `${schema}://${host}/scanweb/qrwx/wx-order!doQueServSalesPkgInfo`,
    recordPayFaild: `${schema}://${host}/scanweb/qrwx/wx-order!savePayErrMsg`,
    baseTrySee: `${schema}://${host}/scanweb/qrwx/qrcode!baseTrySee`,
    offlineBaseTrySee: `${schema}://${host}/scanweb/qrwx/qrcode!offlineBaseTrySee`,
    getFeedbackPaper: `${schema}://${host}/scanweb/qrwx/survey!getSurvey`, //查询调研数据
    setFeedbackPaper: `${schema}://${host}/scanweb/qrwx/survey!saveSurveyResult`, //发送调研结果
    saveFeedback: `${schema}://${host}/scanweb/qrwx/feedback!saveFeedback`, //小程序调研
    savePageLog: `${schema}://${host}/scanweb/qrwx/wx-order!savePageLog`, //记录页面数据
    doBossBizCharging: `${schema}://${host}/scanweb/qrwx/wx-pay!doBossBizCharging`,//充值
    queryServstEtime: `${schema}://${host}/scanweb/qrwx/wx-order!queryServstEtime`, //到期时间

    queryCouponsStatus: `${schema}://${host}/scanweb/active/coupon!queryCouponsStatus`,
    activityRegister: `${schema}://${host}/scanweb/active/buy-give!activityRegister`,
    receiveCoupon: `${schema}://${host}/scanweb/active/coupon!receiveCoupon`,
    queryUsrCanUseCoupons: `${schema}://${host}/scanweb/active/coupon!queryUsrCanUseCoupons`,
};


module.exports = config
