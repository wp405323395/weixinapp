class Interceptor {
  constructor() {
  }

  onRequest(url, header, data) {

  }
  onResponse(url, header, data, res) {

  }
  onServiceError(url, header, data, res){

  }
  onAutherErrorResponse(url, header, data, res) {

  }
  onFaildResponse(url, header, data, res){

  }
} 

export { Interceptor }