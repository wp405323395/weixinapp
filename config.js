/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la

//var host = "192.168.2.104:8015"
//var host = 'www.htrnpay.cn';
http://120.79.229.253:8081/que/queByQrid
var host = "192.168.0.102:8025";
var isHttps = ('www.htrnpay.cn' == host);
var isDebug = !isHttps;
var schema = isHttps ? 'https':'http';
var config = {
    // 下面的地址配合云端 Server 工作
    host,
    isDebug,
    srcUrl: `${schema}://${host}/`,
    qrDetail: `${schema}://${host}/mobile/QRruleDetail.htm`,

};


module.exports = config
