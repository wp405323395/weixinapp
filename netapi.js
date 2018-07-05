
var host = "maywide.free.ngrok.cc";
var host = "192.168.2.126:8080";
var isHttps = ("maywide.free.ngrok.cc" == host);
var isHttps = false;
var schema = isHttps?'https':'http';
var retryTimes = 3;
//wxRequest,netApi
const netApi = {
  host,
  schema,
  login: {url: `${schema}://${host}/api/oauth/miniapp/login`,
          method:'POST'},//登录
  info:  {url:`${schema}://${host}/api/oauth/miniapp/info`,
          method:'POST'},//上传用户信息
  feedback: {url:`${schema}://${host}/misa-service/api/feedback`,
              method:'POST'},//用户反馈
  bindCard: {url:`${schema}://${host}/misa-service/api/user/device/{cardId}/bind`,
              method:'POST'},//绑定卡号
  topic: {url:`${schema}://${host}/misa-service/api/topic`,
              method:'GET'} //专题列表

};
const wxRequest = {
  retryCount:0,
  restfulRequest(api, data, success, fail){
    for(let key in data) {
      api.url = api.url.replace(new RegExp(`{${key}}`),data[key]);
    }
    console.log("restful-> "+api.url);
    this.request(api, {}, success, fail);
  },
  request(api, data, successed, failed) {
    let that = this;
    Processing.showLoading();
    let token = Processing.getToken();
    let contentType = (api.url == netApi.info ? 'application/x-www-form-urlencoded' : 'application/json');
    wx.request({
      url: api.url, //仅为示例，并非真实的接口地址
      data: data,
      method: api.method,
      header: {
        'content-type': contentType,
        Authorization: `Bearer ${token}`
      },
      success: resp => {
        wx.hideLoading();
        if (resp.data.success) {
          successed(resp.data.data);
        } else {
          if (resp.data.invalid_token) {
            //token失效，重新登录。
            Processing.wxLogin(that, api, data, successed, failed);
          } else {
            failed(resp.data.message);
          }
        }
      },
      fail: function (res) {
        wx.hideLoading();

        failed(res);
      }
    })
  }
}







var Processing = {
  getToken(){
    let token;
    try {
      token = wx.getStorageSync('token')
      if (token) {
        // Do something with return value
      }
    } catch (e) {
      // Do something when catch error
    }
    return token;
  },
  showLoading(){
    wx.showLoading({
      title: '加载中',
    });
  },
  wxLogin(context, api, data, successed, failed){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: netApi.login.url,
            data: {
              code: res.code
            },
            success: resp => {
              if (resp.data.success) {
                let token = resp.data.token;//假设拿到token
                try {
                  wx.setStorageSync('token', token);
                } catch (e) {
                }
                context.retryCount++;
                if (context.retryCount < retryTimes) {
                  context.request(api, data, successed, failed);
                } else {
                  wx.showToast({
                    title: '超过自动重新登录次数。',
                  })
                }
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
}
export {
  netApi,
  wxRequest
}