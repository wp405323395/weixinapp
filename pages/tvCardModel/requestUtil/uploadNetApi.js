import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var uploadNetApi = {
  // 上传支付失败的接口
  payFaild(errMsg, city, custid, tvCardNum, serviceID, qrKind, salescode){
    new RequestEngine().request(config.recordPayFaild, { errMsg: errMsg, city: city, custid: custid, tvCardNumber: tvCardNum, serviceID: serviceID, qrKind: qrKind, salescode: salescode }, { callBy: this, method: this.uploadPayFaild, params: [errMsg, city, custid, tvCardNum, serviceID, qrKind, salescode] }, (success) => {
      console.log(success);
    }, (faild) => {
      console.log(faild)
    });
  },
  // 记录页面数据
  savePageLog(pageName, fatherPageName, isAccessWayByQr) {
    new RequestEngine(false).request(config.savePageLog, { pageName: pageName, fatherPageName: fatherPageName, isAccessWayByQr: isAccessWayByQr }, { callBy: this, method: this.savePageLog, params: [pageName, fatherPageName, isAccessWayByQr] }, (success) => {
      console.log(success);
    }, (faild) => {
      console.log(faild)
    });
  }
}
module.exports = uploadNetApi