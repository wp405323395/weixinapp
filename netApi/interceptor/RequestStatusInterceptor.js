import Interceptor from './Interceptor.js'  
const util = require('../../utils/util.js');
class RequestStatusInterceptor extends Interceptor{
  constructor() {
    super();
  }

  onRequest(url, header, data) {
    util.showToast();
  }
  onResponse(url, header, data, res) {
    wx.hideNavigationBarLoading();
    wx.hideToast();
  }
  onServiceError(err) {
    util.showShortToast({
      title: '服务器错误的消息格式',
      image: '../../../img/coup_status_fail.png',
      icon: 'faild'
    })
  }
  onAutherErrorResponse(err) {
    wx.hideNavigationBarLoading();
    wx.hideToast();
  }
  onFaildResponse(err) {
    util.showShortToast({
      title: "网络请求失败",
      icon: "loading"
    });
  }
}
export default  RequestStatusInterceptor
