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
var receiveCoupon = function (cardInfo, couponId, successCallback, faildCallback) {
  let that = this;
  let city = cardInfo.city
  let custid = cardInfo.custid
  let tvCardNumber = cardInfo.tvCardNum
  let serviceID = cardInfo.serviceID
  let qrKind = cardInfo.qrKind
  new RequestEngine().request(config.receiveCoupon, { city, custid, tvCardNumber, serviceID, qrKind, couponId }, { callBy: that, method: that.receiveCoupon, params: [cardInfo, couponId, successCallback, faildCallback] }, (success) => {
    successCallback(success)
  }, (faild) => {
    faildCallback(faild)
  });
}
var activityRegister = function (cardInfo,data,context) {
  let that = this;
  let city = cardInfo.city
  let custid = cardInfo.custid
  let tvCardNumber = cardInfo.tvCardNum
  let serviceID = cardInfo.serviceID
  let qrKind = cardInfo.qrKind
  new RequestEngine().request(config.activityRegister, { city, custid, tvCardNumber, serviceID, qrKind, name: data.name, phone:data.phone }, { callBy: that, method: that.activityRegister, params: [cardInfo, data, context] }, (success) => {
    context.setData({
      isShowPop:false
    })
    wx.showModal({
      title: '提示',
      content: '信息发送成功',
    })
  }, (faild) => {
    context.setData({
      isShowPop: false
    })
    wx.showModal({
      title: '提示',
      content: '信息发送失败',
    })
  });
}
module.exports.queryCouponsStatus = queryCouponsStatus;
module.exports.activityRegister = activityRegister;
module.exports.receiveCoupon = receiveCoupon;