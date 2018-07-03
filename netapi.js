var host = "maywide.free.ngrok.cc";
//var host = "170.10.2.154";
var isHttps = ("maywide.free.ngrok.cc" == host);
var isHttps = false;
var schema = isHttps?'https':'http';

const netApi = {
  host,
  schema,
  login: `${schema}://${host}/api/oauth/miniapp/login`,
  info:  `${schema}://${host}/api/oauth/miniapp/info`,

};
const wxRequest = {
  request(url,data,success,fail){
    wx.showLoading({
      title: '加载中',
    });
    let token = Processing.getToken();
    let contentType = (url == netApi.info ? 'application/x-www-form-urlencoded' :'application/json');
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: data,
      method:'POST',
      header: {
        'content-type': contentType,
        Authorization: `Bearer ${token}`
      },
      success: resp=> {
        wx.hideLoading();
        if (resp.data.success) {
          success(resp.data.data);
        } else {
          fail(resp.data.message);
        }
      },
      fail: function (res) {
        wx.hideLoading();
        fail(res);
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
  }
}
export {
  netApi,
  wxRequest
}