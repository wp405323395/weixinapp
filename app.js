//app.js
const loginUrl = require('config').loginUrl;
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 10000
    });
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    if (wx.openSetting) {
      wx.openSetting({
        success: (res) => {
          console.log(JSON.stringify(res));
        }
      })
    } else {
      console.log('不支持 wx.openSetting');
    }
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: loginUrl,
            data: {
              loginCode: res.code
            },
            ////////
            method: 'POST',
            header: {
              'content-type': 'application/json'
            },
            success: function (result) {
              wx.hideNavigationBarLoading();
              wx.hideToast();

            },

            fail: function ({errMsg}) {
              wx.hideNavigationBarLoading();
              wx.hideToast();
            }
            /////////
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
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
