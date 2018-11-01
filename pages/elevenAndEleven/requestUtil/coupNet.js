import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var queryCouponsStatus = function (cardInfo, successCallback, faildCallback) {
  let that = this;
  let city = cardInfo.city
  let custid = cardInfo.custid
  let tvCardNumber = cardInfo.tvCardNum
  let serviceID = cardInfo.serviceID
  let qrKind = cardInfo.qrKind
  new RequestEngine().request(config.queryCouponsStatus, { city, custid, tvCardNumber, serviceID, qrKind }, { callBy: that, method: that.queryCouponsStatus, params: [cardInfo, successCallback, faildCallback] }, (success) => {
    successCallback(success)
  }, (faild) => {
    faildCallback(faild)
  });

}
module.exports.queryCouponsStatus = queryCouponsStatus;