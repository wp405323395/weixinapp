const loginUrl = require('../config').loginUrl;
const util = require('../utils/util');
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
  util.showToast({ title :'微信身份识别中...'});
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        wx.request({
          url: loginUrl,
          data: {
            formData: JSON.stringify({ loginCode: res.code})
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
            wx.hideNavigationBarLoading();
            wx.hideToast();
            if(successFun != null) {
              console.log('请求方法：', successFun)
              successFun.method.apply(successFun.callBy, successFun.params);
            }

          },

          fail: function ({errMsg}) {
            console.log('获取用户登录态失败！' + res.errMsg)
            if(failedFun != null) {
              failedFun();
            }
            util.showShortToast({
              title: "获取用户登录态失败！",
              icon: "loading"
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