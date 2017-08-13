const requestModle = require('./requestModle.js');
import { Interceptor } from './interceptor/Interceptor.js'    //引入类
import { LogInterceptor } from './interceptor/LogInterceptor.js'    //引入类
class RequestEngine {
  constructor() {
    this.interceptors = []
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
    let logInterceptor = new LogInterceptor();
    this.addInterceptor(logInterceptor);
     requestModle.request(url, data, reqMethod, requestSuccess, requestFail, requestComplete, this.interceptors);
  }

}

export {
  RequestEngine
}
