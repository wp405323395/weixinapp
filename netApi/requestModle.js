import { Header } from './Header.js'    //引入类
const loginJs = require('./login.js');
const util = require('../utils/util.js');

var request = function (url, data, reqMethod, requestSuccess, requestFail, requestComplete, interceptors) {
  util.showToast();
  var header = new Header('application/json').getHeader();
  for(let interceptor of interceptors){
    interceptor.onRequest(url, header, data);
  }
  
  wx.request({
    url: url,
    data: data,
    header: header,
    method: 'POST',
    dataType: 'txt',
    success: function (res) {
      for (let interceptor of interceptors) {
        interceptor.onResponse(url, header, data, res);
      }
  
      let responseData;
      let response_code;
      try {
        responseData = JSON.parse(res.data);
        response_code = responseData.retCode;
      } catch (e) {
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
      for (let interceptor of interceptors) {
        interceptor.onResponse(url, header, data, res);
      }
      util.showShortToast({
        title: "网络请求失败",
        icon: "loading"
      });
      requestFail(res);
    },
    complete: function (res) {
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