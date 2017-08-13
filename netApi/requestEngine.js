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

  request(url, data, reqMethod, requestSuccess, requestFail, requestComplete) {
    let logInterceptor = new LogInterceptor();
    this.addInterceptor(logInterceptor);
     requestModle.request(url, data, reqMethod, requestSuccess, requestFail, requestComplete, this.interceptors);
  }

}

export {
  RequestEngine
}
