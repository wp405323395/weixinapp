import { Interceptor } from './Interceptor.js'    //引入类
class LogInterceptor extends Interceptor{
  constructor() {
    super();
  }

  onRequest(url, header, data) {
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
    console.log('返回值~');
    console.log(res);
    console.log('<<<<<<<<<<----response----<<<<<<<<<<');
  }
}

export { LogInterceptor }