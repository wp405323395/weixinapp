const loginJs = require('./login.js');
const util = require('../utils/util.js');
var request = function (url, data,reqMethod, requestSuccess, requestFail, requestComplete) {
  wx.showNavigationBarLoading();
  wx.showToast({
    title: "loading",
    icon: "loading",
    duration: 30000
  });
  let user_token = wx.getStorageSync('user_token');
  let ua = wx.getStorageSync('user-agent');
  if (!util.textIsNotNull(ua)) {
    wx.getSystemInfo({
      success: function (res) {
        ua = {
         model : res.model,
         screenWidth : res.screenWidth,
         screenHeight : res.screenHeight,
         system : res.system,
         version : res.version,
         platform:'MCWX'
        }
      }
    });
  }
  console.log(url);
  wx.request({
    url: url,
    data: data,
    header: { 
      'Content-Type': 'application/json',
      'userAgent': ua,
      'Cookie': user_token },
    method: 'POST',
    dataType: 'txt',
    success: function (res) {
      console.log(res);
      var responseData = JSON.parse(res.data);
      var response_code = responseData.retCode;
      if (response_code == 102) {
        console.log("身份失效");
        wx.hideNavigationBarLoading();
        wx.hideToast();
        loginJs.clientLogin(reqMethod);
      } else {
        wx.hideNavigationBarLoading();
        wx.hideToast();
        requestSuccess(res);
      }
    },
    fail: function (res) { 
      console.log(res);
      wx.hideNavigationBarLoading();
      wx.hideToast();
      wx.showToast({
        title: "网络请求失败",
        icon: "loading",
        duration: 1500
      });
      requestFail(res);
      //max_wang 
      loginJs.clientLogin(reqMethod);
      //max_wang
    },
    complete: function (res) { 
      // wx.hideToast();
      wx.hideNavigationBarLoading();
       if (requestComplete != undefined) {
         requestComplete(res);
       }
    },
  })
}

module.exports = {
  request: request
}