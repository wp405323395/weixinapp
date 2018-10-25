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
      new RequestEngine().request(config.querySalesList, { city, custid, tvCardNumber, serviceID, qrKind }, { callBy: this, method: this.loadPackage, params: [cardInfo] }, (success) => {
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
      new RequestEngine().request(config.doQueServSalesPkgInfo, { city, custid, tvCardNumber, serviceID, qrKind }, { callBy: this, method: this.loadCurrentPackageInfo, params: [cardInfo] }, (success) => {
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
  }
}
module.exports = netData;


/**
 * import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var netData = {
  loadPackage(cardInfo) {

    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.querySalesList, { city: cardInfo.city, custid: cardInfo.custid, tvCardNumber: cardInfo.tvCardNumber, serviceID: cardInfo.serviceID, qrKind:cardInfo.qrKind }, { callBy: this, method: this.loadPackage, params: [cardInfo] }, (success) => {
        resolve(success);
      }, (faild) => {
        reject(faild);
      });
    })
  },
  loadCurrentPackageInfo(cardInfo) {
    return new Promise((resolve, reject) => {
      new RequestEngine().request(config.doQueServSalesPkgInfo, { city: cardInfo.city, custid: cardInfo.custid, tvCardNumber: cardInfo.tvCardNumber, serviceID: cardInfo.serviceID, qrKind: cardInfo.qrKind }, { callBy: this, method: this.loadCurrentPackageInfo, params: [cardInfo] }, (success) => {
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
  }
}
module.exports = netData;
 */