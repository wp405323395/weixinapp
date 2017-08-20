import Interceptor from './Interceptor.js'    //引入类
class LogInterceptor extends Interceptor{
  constructor() {
    super();
  }

  onRequest(url, header, data) {
    this.requestStartTime = new Date();
    console.log('>>>>>>>>>>----request---->>>>>>>>>>');
    console.log('链接=>', url);
    console.log('请求头=>', header);
    console.log('请求体=>', data);
    console.log('-----------------------------------');
  }
  onResponse(url, header, data, res) {
    this.responseTime = new Date();
    let totalTime = this.responseTime - this.requestStartTime; 
    let da = JSON.parse(res.data);
    console.log('返回值=>', da);
    console.log('请求总耗时=>', totalTime);
    console.log('<<<<<<<<<<----response----<<<<<<<<<<');
  }

  onServiceError(url, header, data, res) {
    console.log('服务器错误，返回值=>', res);
    console.log('<<<<<<<<<<----response----<<<<<<<<<<');
  }
  onAutherErrorResponse(url, header, data, res) {
    console.log('Auther错误，返回值=>', res);
    console.log('<<<<<<<<<<----response----<<<<<<<<<<');
  }
  onFaildResponse(url, header, data, res) {
    console.log('请求错误，返回值=>', res);
    console.log('<<<<<<<<<<----response----<<<<<<<<<<');
  }
}

export default LogInterceptor