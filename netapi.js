var host = "maywide.free.ngrok.cc";
var isHttps = ("maywide.free.ngrok.cc" == host);
var schema = isHttps?'https':'http';

const netApi = {
  host,
  schema,
  loginUrl:`${schema}://${host}/login`,
};
const wxRequest = {
  request: (url,data,success,fail) =>{
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      data: data,
      header: {
        'content-type': 'application/json', // 默认值
        'token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwidWlkIjoxLCJleHAiOjE1MzI4NTQ3OTV9.WpWkBQ1rPgvPdRU4rsvsPJGzcfTtpv6j08r7qKSR83B-BKky4uxPEIcoravG9QafemMgcMUxueea1n_7fOqwcQ'
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data.success) {
          success(res.data.data);
        } else {
          fail(res.data.message);
        }
      },
      fail: function (res) {
        wx.hideLoading();
        fail(res);
      }
    })
  } 
}
export {
  netApi,
  wxRequest
}