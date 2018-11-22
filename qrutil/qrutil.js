import RequestEngine from '../netApi/requestEngine.js';
var Promise = require('../libs/es6-promise.js').Promise;
var config = require('../config.js');
var util = require('../utils/util.js');

/**
 * 二维码信息处理
 * options
 * callback 回调函数,为空则返回scene
 */
function getScene(options, callback) {
  var DES3 = require('../utils/DES3.js');

  var q = decodeURIComponent(options.q);
  // q ="www.mayhbbb.com?scene=21~117~8270104048478636"
  // q = "www.mayhbbb.com?qrid=1"
  var qrid = null, scene=null;
  if (util.textIsNull(q)) {
    scene = decodeURIComponent(options.scene);
    qrid = decodeURIComponent(options.qrid);
  } else {
    scene = getQueryString(q, 'scene');
    qrid = getQueryString(q, 'qrid');
  }
  // qrid = 1;
  if (!util.textIsNull(qrid)) {
    var config = require('../config.js');
    let url = config.queQrcodePutById + "?qrid=" + qrid;
    new RequestEngine().request(url, {}, { callBy: this, method: this.getScene, params: [options, callback, flag] }, (success) => {
      callback(success, qrid);
    }, (faild) => {
      callback({failed:true})
    });

    return qrid;
  }else{
    if (util.textIsNull(scene)) {
      callback({ failed: true })
      return ;
    }
    callback(scene);
  }
}
function getQueryString(url, name) {
  var p0 = url.split('?')
  if (p0.length > 1) {
    var paramStr = p0[1]
    var params = paramStr.split('&')
    for (var param of params) {
      if (param.indexOf(name) > -1) {
        return param.split('=')[1]
      }
    }
  }
}

module.exports = {
  getScene: getScene
}