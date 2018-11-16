import RequestEngine from '../../../netApi/requestEngine.js';
var Promise = require('../../../libs/es6-promise.js').Promise;
var config = require('../../../config.js');
var appInstance = getApp()
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

let loadTvCardInfo = function (context) {
  
  new Promise((resolve, reject) => {
    var param = {
      tvCardNumber: appInstance.qrInfo.tvCardNum,
      serviceID: appInstance.qrInfo.serviceID,
      qrKind: appInstance.qrInfo.qrKind
    };
    new RequestEngine().request(config.queryCustInfo, param, { callBy: this, method: this.loadTvCardInfo, params: [context] }, (success) => {
      resolve(success);
    }, (faild) => {
      reject(faild);
    });
  }).then(value => {
    if (!value || !value.custList || value.custList.length==0) {
      throw '请求卡信息失败'
    }
    let cardInfo = value.custList[0];
    
    appInstance.cardInfo = {
      tvCardNum: appInstance.qrInfo.tvCardNum,
      serviceID: appInstance.qrInfo.serviceID,
      qrKind: appInstance.qrInfo.qrKind,
      qrid:'',
      custid: cardInfo.custid,
      custname: cardInfo.custname,
      addr: cardInfo.addr,
      mobile: cardInfo.mobile,
      city: cardInfo.city
    }
    if (appInstance.qrInfo.qrKind == 'A11') {
      wx.redirectTo({
        url: '/pages/elevenAndEleven/index'
      })
    } else {
      let url = `../pay/storeHall`;
      wx.redirectTo({
        url: url
      })
    }
    
  }).catch(err => {
    let title = err ? err : "获取用户信息失败，尝试下拉刷新页面获取信息"
    wx.showModal({
      title: title,
      showCancel: false,
      confirmText: "确定"
    })
  });
}

module.exports.loadRecordHistory = loadRecordHistory;
module.exports.loadTvCardInfo = loadTvCardInfo;