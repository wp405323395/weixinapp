import RequestEngine from '../netApi/requestEngine.js';
var Promise = require('../libs/es6-promise.js').Promise;
var config = require('../config.js');
var util = require('../utils/util.js');

/**
 * 二维码信息处理
 * options
 * callback 回调函数,为空则返回scene
 * flag 是否需要解密，默认不需要
 */
function getScene(options, callback, flag) {
  var DES3 = require('../utils/DES3.js');

  var q = decodeURIComponent(options.q);
  // q ="www.mayhbbb.com?scene=21~117~8270104048478636"
  // q = "www.mayhbbb.com?qrid=1"
  var qrid = null, scene=null;
  // if (util.textIsNull(q)) {
  //   scene = decodeURIComponent(options.scene);
  // } else if (q.indexOf("scene=") > 0) {
  //   scene = q.split("scene=")[1];
  // } else if (q.indexOf("qrid=") > 0) {
  //   qrid = q.split("qrid=")[1];
  // }

  if (util.textIsNull(q)) {
    scene = decodeURIComponent(options.scene);
    qrid = decodeURIComponent(options.qrid);
  } else if (q.indexOf("scene=") > 0) {
    scene = q.split("scene=")[1];
  } else if (q.indexOf("qrid=") > 0) {
    qrid = q.split("qrid=")[1];
  }

  // qrid = 1;
  if (!util.textIsNull(qrid)) {
    var config = require('../config.js');
    let url = config.queQrcodePutById + "?qrid=" + qrid;
    new Promise((resolve, reject) => {
      new RequestEngine().request(url, {}, { callBy: this, method: this.getScene, params: [options, callback, flag] }, (success) => {
        callback(success);
      }, (faild) => {
        reject(faild);
      });
    })
    return qrid;
  }else{
    if (util.textIsNull(scene)) {

    //判断下，如果scene 包含~ 或者长度小于15 不需要解密或者flag 为true 则强制需要解密
    } else if (flag || (scene.length > 15 && scene.indexOf('~') < 0)) {
      try {
        scene = DES3.decrypt(scene);
      } catch (err) {
        console.log('错误 解密原文: ' + scene)
        console.log(err.name + ': ' + +err.message)
      } finally {
      }
    }
    if (callback){
      callback(scene);
    }
  }

}

module.exports = {
  getScene: getScene
}