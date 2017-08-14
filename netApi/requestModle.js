import { Header } from './Header.js'    //引入类
const loginJs = require('./login.js');

var request = function (url, data, reqMethod, requestSuccess, requestFail, requestComplete, interceptors) {
  
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
  
      let responseData;
      let response_code;
      try {
        responseData = JSON.parse(res.data);
        response_code = responseData.retCode;
      } catch (e) {
        for (let interceptor of interceptors) {
          interceptor.onServiceError(url, header, data, res);
        }
        requestFail('服务器错误的消息格式');
        return;
      }

      if (response_code == 102) {
        for (let interceptor of interceptors) {
          interceptor.onAutherErrorResponse(url, header, data, res);
        }
        console.log("身份失效");
        loginJs.clientLogin(reqMethod);
      } else {
        for (let interceptor of interceptors) {
          interceptor.onResponse(url, header, data, res);
        }
        requestSuccess(responseData);
      }
    },
    fail: function (res) {
      for (let interceptor of interceptors) {
        interceptor.onFaildResponse(url, header, data, res);
      }
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