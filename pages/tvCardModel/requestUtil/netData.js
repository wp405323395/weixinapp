import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var netData = {
  loadPackage(cardInfo) {
    let city = cardInfo.city;
    let custid = cardInfo.custid;
    let tvCardNumber = cardInfo.tvCardNum;
    let serviceID = cardInfo.serviceID
    let qrKind = cardInfo.qrKind
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.querySalesList, {
        city,
        custid,
        tvCardNumber,
        serviceID,
        qrKind
      }, {
        callBy: this,
        method: this.loadPackage,
        params: [cardInfo]
      }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })
  },
  loadCurrentPackageInfo(cardInfo) {
    let city = cardInfo.city;
    let custid = cardInfo.custid;
    let tvCardNumber = cardInfo.tvCardNum;
    let serviceID = cardInfo.serviceID
    let qrKind = cardInfo.qrKind
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.doQueServSalesPkgInfo, {
        city,
        custid,
        tvCardNumber,
        serviceID,
        qrKind
      }, {
        callBy: this,
        method: this.loadCurrentPackageInfo,
        params: [cardInfo]
      }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })
  },
  baseTrySee(qrid, city) {
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.baseTrySee + `?qrid=${qrid}&city=${city}`, {}, {
        callBy: this,
        method: this.loadToast,
        params: [qrid, city]
      }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })

  },

  loadCards(custid) {
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.queryOrderKeyno, {
        custid: custid
      }, {
        callBy: this,
        method: this.loadCards,
        params: [custid]
      }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })
  },
  pay(param) {
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.wxPay, param, {
        callBy: this,
        method: this.pay,
        params: []
      }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })
  }
}
module.exports = netData;