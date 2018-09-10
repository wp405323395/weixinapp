import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var netData = {
  loadPackage(city, custid, tvCardNumber, serviceID, qrKind) {
    let that = this;
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.querySalesList, { city, custid, tvCardNumber, serviceID, qrKind }, { callBy: that, method: that.loadPackage, params: [city, custid, tvCardNumber, serviceID, qrKind] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })
  },
  loadCurrentPackageInfo(city, custid, tvCardNumber, serviceID, qrKind) {
    let that = this;
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.doQueServSalesPkgInfo, { city, custid, tvCardNumber, serviceID, qrKind }, { callBy: that, method: that.loadCurrentPackageInfo, params: [city, custid, tvCardNumber, serviceID, qrKind] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })
  },
  loadToast(qrid, city) {
    let that = this;
    return new Promise((resolve,reject)=>{
      new RequestEngine().request(config.baseTrySee + `?qrid=${qrid}&city=${city}`, {}, { callBy: that, method: that.loadToast, params: [qrid, city] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })

  },

  loadCards(custid) {
    let that = this;
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.queryOrderKeyno, { custid: custid }, { callBy: that, method: that.loadCards, params: [custid] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })

  },
  pay(param) {
    let that = this;
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.wxPay, param, { callBy: that, method: that.pay, params: [] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })
  },
}
module.exports = netData;