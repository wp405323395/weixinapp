
var host = "maywide.free.ngrok.cc";
var host = "39.108.84.154:8080";
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
  feedback: {url:`${schema}://${host}/misa-service/api/my/feedback`,
              method:'POST'},//用户反馈
  bindCard: {url:`${schema}://${host}/misa-service/api/user/device/{cardId}/bind`,
              method:'POST'},//绑定卡号
  topic: {url:`${schema}://${host}/misa-service/api/topic`,
              method:'GET'}, //专题列表
  topicById: {
    url: `${schema}://${host}/misa-service/api/topic/{id}`,
    method: 'GET'
  }, //专题列表
  topicDetail: {
    url: `${schema}://${host}/misa-service/api/topic_video/detail`,
    method: 'GET'
  }, //专题详情
  loadHotSearch:{
    url: `${schema}://${host}/misa-service/api/user/search_recommend_history/all`,
    method:'GET'
  },//加载热门搜索
  search:{
    url: `${schema}://${host}/misa-service/api/search`,
    method:'GET'
  },//搜索
  device:{
    url: `${schema}://${host}/misa-service/api/my/device`,
    method:'GET'
  },//我的设备列表
  modifyDevices: {
    url: `${schema}://${host}/misa-service/api/my/device`,
    method: 'POST'
  },//我的设备修改
  unbind:{
    url: `${schema}://${host}/misa-service/api/my/device/{cardId}/unbind`,
    method: 'POST'
  },//解绑设备
  watchVideoHistory:{
    url: `${schema}://${host}/misa-service/api/my/history/watch/video`,
    method: 'GET'
  },//我的 收看历史（视频）
  watchChannelHistory:{
    url: `${schema}://${host}/misa-service/api/my/history/watch/channel`,
    method: 'GET'
  },//直播历史列表
  deleteHistory:{
    url: `${schema}://${host}/misa-service/api/my/history/watch/{id}`,
    method:'DELETE'
  },//删除收看历史
  favoriteVideo:{
    url: `${schema}://${host}/misa-service/api/my/favorite/video`,
    method:'GET'
  },//我的收藏
  questioon: {
    url: `${schema}://${host}/misa-service/api/faq/all`,
    method: 'GET'
  },//疑难解答
  userFavoriteChannel:{
    url: `${schema}://${host}/misa-service/api/userFavoriteChannel/que`,
    method:'GET'
  },//查询我的频道列表
  delMyChannel:{
    url: `${schema}://${host}/misa-service/api/userFavoriteChannel/del/{channelId}`,
    method:'POST'
  },//删除我关注的频道
  queCurProListByType:{
    url: `${schema}://${host}/misa-service/api/channelProgram/queCurProListByType/{type}`,
    method: 'POST'
  },//分类查询频道列表
  queChannelListByTag:{
    url: `${schema}://${host}/misa-service/api/channel/queChannelListByTag`,
    method:'GET'
  },//添加频道
  addUserFavoriteChannel:{
    url: `${schema}://${host}/misa-service/api/userFavoriteChannel/add/{channelId}`,
    method: 'POST'
  },//添加频道到我的频道
  deleteFavoriteVideo:{
    url: `${schema}://${host}/misa-service/api/my/favorite/video/{videoId}`,
    method: 'DELETE'
  },//删除收藏视频



};
const wxRequest = {
  retryCount:0,
  restfulRequest(api, data, success, fail){
    let api2 = { url: api.url, method:api.method};
    for(let key in data) {
      api2.url = api2.url.replace(new RegExp(`{${key}}`),data[key]);
    }
    console.log("restful-> " + api2.url);
    this.request(api2, {}, success, fail);
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