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
    let title = '服务器无错误原因'
    try{
      if (data && data.retMsg) {
        title = data.retMsg
      }
    } catch(err){
      title = '服务器无错误原因'
    }
    util.showToast({
      title: title,
      icon: "loading" ,
      duration:2000
    });
  }
}
export default  RequestStatusInterceptor
