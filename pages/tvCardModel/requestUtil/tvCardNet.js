import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
let loadRecordHistory = function(context) {

  new Promise((resolve, reject) => {
    new RequestEngine().request(config.queCustInfoByOpenid, {}, { callBy: this, method: this.loadRecordHistory, params: [context] }, (success) => {
      resolve(success);
    }, (faild) => {
      reject(faild);
    });
  }).then(value => {
    if (value.custInfolist) {
      context.setData({
        custList: value.custInfolist
      });
    } else {
      context.setData({
        showNoDate: true
      })
    }
  }).catch(err => {
    context.setData({
      showNoDate:true
    })
  })

}

let loadTvCardInfo = function(context,cardNum,qrid) {

  new Promise((resolve, reject) => {
    var param = {
      tvCardNumber: context.tvCardNum,
      serviceID: context.serviceID,
      qrKind: context.qrKind
    };
    new RequestEngine().request(config.queryCustInfo, param, { callBy: this, method: this.loadTvCardInfo, params: [context, cardNum, qrid] }, (success) => {
      resolve(success);
    }, (faild) => {
      reject(faild);
    });
  }).then(value => {
    let cardInfo = value.custList[0];
    let url = `../pay/storeHall?qrid=${qrid}&tvCardNum=${context.tvCardNum}&custid=${cardInfo.custid}&serviceID=${context.serviceID}&qrKind=${context.qrKind}&addr=${cardInfo.addr}&custname=${cardInfo.custname}&mobile=${cardInfo.mobile}&city=${cardInfo.city}`;
    wx.redirectTo({
      url: url
    })
  }).catch(err => {
    wx.showModal({
      title: "获取用户信息失败，尝试下拉刷新页面获取信息",
      showCancel: false,
      confirmText: "确定"
    })
    return;
  });
}

module.exports.loadRecordHistory = loadRecordHistory;
module.exports.loadTvCardInfo = loadTvCardInfo;