//app.js
const myLogin = require('netApi/login');
console.log(App);
App({
  onLaunch: function(ops) {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    myLogin.my_login();

    if (ops.scene == 1044) {
      console.log(ops.shareTicket)
      wx.getShareInfo({
        shareTicket: ops.shareTicket,
        complete(res) {
          console.log(res)
        }
      })
    }
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

  globalData: {
    userInfo: null
  }
})
