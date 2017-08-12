const loginJs = require('./login.js');
const util = require('../utils/util.js');
var request = function (url, data,reqMethod, requestSuccess, requestFail, requestComplete) {
  util.showToast();
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
  let header = {
    'Content-Type': 'application/json',
    'userAgent': ua,
    'Cookie': user_token
  };
  console.log('>>>>>>>>>>----request---->>>>>>>>>>');
  console.log('链接~');
  console.log(url);
  console.log('请求头~');
  console.log(header);
  console.log('请求体~');
  console.log(data);
  console.log('-----------------------------------');
  wx.request({
    url: url,
    data: data,
    header: header,
    method: 'POST',
    dataType: 'txt',
    success: function (res) {
      console.log('返回值~');
      console.log(res);
      console.log('<<<<<<<<<<----response----<<<<<<<<<<');
      let responseData ;
      let response_code;
      try{
        responseData = JSON.parse(res.data);
        response_code = responseData.retCode;
      } catch(e){
        requestFail('服务器错误的消息格式');
        util.showShortToast({
          title: '服务器错误的消息格式',
          image: '../../../img/coup_status_fail.png',
          icon: 'faild'
        })
        return;
      }

      if (response_code == 102) {
        console.log("身份失效");
        wx.hideNavigationBarLoading();
        wx.hideToast();
        loginJs.clientLogin(reqMethod);
      } else {
        wx.hideNavigationBarLoading();
        wx.hideToast();
        requestSuccess(responseData);
      }
    },
    fail: function (res) { 
      console.log('返回值~');
      console.log(res);
      console.log('<<<<<<<<<<----response----<<<<<<<<<<');
      util.showShortToast({
        title: "网络请求失败",
        icon: "loading"
      });
      requestFail(res);
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