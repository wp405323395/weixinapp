import { Interceptor } from './Interceptor.js'    //引入类
class LogInterceptor extends Interceptor{
  constructor() {
    super();
  }

  onRequest(url, header, data) {
    this.requestStartTime = new Date();
    console.log('>>>>>>>>>>----request---->>>>>>>>>>');
    console.log('链接~');
    console.log(url);
    console.log('请求头~');
    console.log(header);
    console.log('请求体~');
    console.log(data);
    console.log('-----------------------------------');
  }
  onResponse(url, header, data, res) {
    this.responseTime = new Date();
    let totalTime = this.responseTime - this.requestStartTime;
    console.log('返回值~');
    console.log(res);
    console.log('请求总耗时~');
    console.log(totalTime);
    console.log('<<<<<<<<<<----response----<<<<<<<<<<');
  }
}

export { LogInterceptor }