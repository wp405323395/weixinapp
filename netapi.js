var host = "maywide.free.ngrok.cc";
var host = "170.10.2.154";
var isHttps = ("maywide.free.ngrok.cc" == host);
var isHttps = false;
var schema = isHttps?'https':'http';

const netApi = {
  host,
  schema,
  login: `${schema}://${host}/api/oauth/miniapp/login`,//登录
  info:  `${schema}://${host}/api/oauth/miniapp/info`,//上传用户信息
  feedback: `${schema}://${host}/misa-service/api/feedback`,//用户反馈
  bindCard: `${schema}://${host}/misa-service/api/user/device/{cardId}/bind`//绑定卡号

};
const wxRequest = {
  restfulRequest(url, data, success, fail){
    for(let key in data) {
      url = url.replace(new RegExp(`{${key}}`),data[key]);
    }
    console.log("restful-> "+url);
    this.request(url, {}, success, fail);
  },
  request(url, data, successed, failed) {
    Processing.showLoading();
    let token = Processing.getToken();
    let contentType = (url == netApi.info ? 'application/x-www-form-urlencoded' : 'application/json');
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: data,
      method: 'POST',
      header: {
        'content-type': contentType,
        Authorization: `Bearer ${token}`
      },
      success: resp => {
        wx.hideLoading();
        if (resp.data.success) {
          successed(resp.data.data);
        } else {
          failed(resp.data.message);
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 2000
        });
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
  }
}
export {
  netApi,
  wxRequest
}