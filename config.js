/**
 * 小程序配置文件
 */

// 此处主机域名是腾讯云解决方案分配的域名
// 小程序后台服务解决方案：https://www.qcloud.com/solution/la


var host = "www.juzijumi.com";
//var host = "localhost:8025";
var isHttps = ('www.juzijumi.com' == host);
var isDebug = !isHttps;
var schema = isHttps ? 'https':'http';
var config = {
    // 下面的地址配合云端 Server 工作
    schema:schema,
    host,
    isDebug,
    srcUrl: `${schema}://${host}/`,
    qrDetail: `${schema}://${host}/mobile/QRruleDetail.htm`,

};


module.exports = config
