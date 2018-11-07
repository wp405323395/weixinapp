//app.js
const myLogin = require('netApi/login');
App({
  onLaunch: function(ops) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    updateManager.onUpdateFailed(function () {
      // 新版本下载失败
    })

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
