import Interceptor from './Interceptor.js'  
const util = require('../../utils/util.js');
class RequestStatusInterceptor extends Interceptor{
  constructor() {
    super();
  }

  onRequest(url, header, data) {
    util.showToast();
  }
  onResponse(url, header, data) {
    wx.hideNavigationBarLoading();
    wx.hideToast();
  }
  onServiceError(url, header, data) {
    util.showShortToast({
      title: '服务器错误的消息格式',
      image: '../../../img/coup_status_fail.png',
      icon: 'faild'
    })
  }
  onAutherErrorResponse(url, header, data) {
    wx.hideNavigationBarLoading();
    wx.hideToast();
  }
  onFaildResponse(url, header, data) {
    util.showToast({
      title: data.retMsg,
      icon: "loading" ,
      duration:10000
    });
  }
}
export default  RequestStatusInterceptor
