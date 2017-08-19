const requestModle = require('./requestModle.js');
const config = require('../config.js');
import { Interceptor } from './interceptor/Interceptor.js'    //引入类
import { LogInterceptor } from './interceptor/LogInterceptor.js'    //引入类
import { RequestStatusInterceptor } from './interceptor/RequestStatusInterceptor.js'
class RequestEngine {
  constructor(isShowProgress = true) {
    this.interceptors = [],
      this.isShowProgress = isShowProgress;
  }
  addInterceptor(interceptor) {
    this.interceptors.push(interceptor);
  }
  /**
   * url:请求路径。
   * data：请求参数
   * reqMethod:失败后的重试函数。
   * requestSuccess:请求成功的回调。
   * requestFail:请求失败的回调。
   * reqestComplete:请求完成的回调。
   */
  request(url, data, reqMethod, requestSuccess, requestFail, requestComplete) {
    //此处添加拦截器。
    if (config.isDebug ) {
      let logInterceptor = new LogInterceptor();
      this.addInterceptor(logInterceptor);
    }
    if (this.isShowProgress) {
      let status = new RequestStatusInterceptor();
      this.addInterceptor(status);
    }

     requestModle.request(url, data, reqMethod, requestSuccess, requestFail, requestComplete, this.interceptors);
  }


}

export {
  RequestEngine
}
