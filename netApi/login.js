const loginUrl = require('../config').loginUrl;
function my_login() {
  wx.checkSession({
    success: function () {
      //session 未过期，并且在本生命周期一直有效
      //clientLogin();
    },
    fail: function () {
      //登录态过期
      clientLogin(); //重新登录
    }
  });
}
function clientLogin(successFun,failedFun) {
  wx.hideNavigationBarLoading();
  wx.hideToast();
  wx.showNavigationBarLoading();
  wx.showToast({
    title: "loading",
    icon: "loading",
    duration: 30000
  });
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        wx.request({
          url: loginUrl,
          data: {
            loginCode: res.code
          },
          method: 'POST',
          header: {
            'content-type': 'application/json'
          },
          success: function (result) {
            let cookie = result.header['Set-Cookie'];
            try {
              wx.setStorageSync('user_token', cookie)
            } catch (e) {
            }
            if(successFun != null) {
              successFun.method.apply(successFun.callBy, successFun.params);
            }
            wx.hideNavigationBarLoading();
            wx.hideToast();
          },

          fail: function ({errMsg}) {
            console.log('获取用户登录态失败！' + res.errMsg)
            if(failedFun != null) {
              failedFun();
            }
            wx.hideNavigationBarLoading();
            wx.hideToast();
            wx.showToast({
              title: "获取用户登录态失败！",
              icon: "loading",
              duration: 1500
            });
          }
        })
      } else {
        console.log('获取用户登录态失败！' + res.errMsg)
      }
    }
  });
};
module.exports = {
  my_login: my_login,
  clientLogin: clientLogin
}