class Interceptor {
  constructor() {
  }

/**
 * 请求开始
 */
  onRequest(url, header, data) {

  }
  /**
   * 正确的服务器返回
   */
  onResponse(url, header, data) {

  }
  /**
   * 服务器错误
   */
  onServiceError(url, header, data){

  }
  /**
   * 权限认证未通过
  */
  onAutherErrorResponse(url, header, data) {

  }
  /**
   * 服务器请求失败
   */
  onFaildResponse(url, header, data){

  }
} 

export default Interceptor