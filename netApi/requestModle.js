const loginJs = require('./login.js');
var request = function (url, data,reqMethod, requestSuccess, requestFail, requestComplete) {
  wx.showNavigationBarLoading();
  wx.showToast({
    title: "loading",
    icon: "loading",
    duration: 30000
  });
  let user_token = wx.getStorageSync('user_token');
  console.log('2_user_token:::' + user_token);
  wx.request({
    url: url,
    data: data,
    header: { 
      'Content-Type': 'application/json',
      'Cookie': user_token },
    method: 'POST',
    dataType: 'txt',
    success: function (res) {
      var responseData = JSON.parse(res.data);
      var response_code = responseData.retCode;
      if (response_code == 102) {
        console.log("身份失效");
        loginJs.clientLogin(reqMethod);
      } else {
        wx.hideNavigationBarLoading();
        wx.hideToast();
        requestSuccess(res);
      }
    },
    fail: function (res) { 
      wx.hideNavigationBarLoading();
      wx.hideToast();
      requestFail(res);
    },
    complete: function (res) { 
      wx.hideNavigationBarLoading();
      wx.hideToast();
      requestComplete(res);
    },
  })
}

module.exports = {
  request: request
}