//app.js
const util = require('utils/util');
const myLogin = require('netApi/login');
var mta = require('utils/mta_analysis.js');
App({
  onLaunch: function (options) {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //max_wang>>>>>>>>>>>>
    //util.my_openSetting();
    //myLogin.my_login();
    //max_wang<<<<<<<<<<<<
    //这是示例代码，应用的接入代码请到“应用管理”进行拷贝
    mta.App.init({
      "appID": "500484667",
      "eventID": "500484680",
      "statPullDownFresh": true,
      "statShareApp": true,
      "statReachBottom": true
    });
  },


  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})