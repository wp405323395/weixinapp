//app.js
const myLogin = require('netApi/login');
App({
  onLaunch: function(ops) {
 
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  cardInfo:{
    tvCardNum: null,
    serviceID: null,
    qrKind: null,
    qrid: null,
    custid: null,
    custname: null,
    addr: null,
    mobile: null,
    city: null
  },
  qrInfo:{
    tvCardNum :null,
    qrKind :null,
    serviceID :null
  },
  qrid:null,
  scene:null,
  globalData: {
    userInfo: null
  },
  initIsFestival: function (timeInterval) {
    let date = new Date(2018, 10, 11);
    let dateNow = new Date();
    let dateDistin = date.getTime() - dateNow.getTime();
    if (dateDistin < timeInterval * 24 * 60 * 60 * 1000 && dateDistin > 0) {
      return true;
    }
    return false;
  },
})
