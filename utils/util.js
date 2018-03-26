function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatDay(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatLocation(longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

function textIsNotNull(str) {
  if (str == null || str == undefined || str == '' || str == "undefined") {
    return false;
  }
  return true;
}

function textIsNull(str) {
  if (str == null || str == undefined || str == '' || str == "undefined") {
    return true;
  }
  return false;
}

function showTitleDialog(title, content) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: false,
    confirmText: "确定"
  })
}

function showToast({ title = '加载中', icon = 'loading', image, duration = 20000 ,success}={}) {
  wx.hideNavigationBarLoading();
  wx.hideToast();
  wx.showToast({
    title: title,
    icon: icon,
    image: image,
    duration: duration ?duration:30000,
    success: success
  });
}

function showShortToast(toastObj) {
  wx.hideNavigationBarLoading();
  wx.hideToast();
  wx.showToast({
    title: toastObj.title,
    icon: toastObj.icon,
    image: toastObj.image,
    duration: toastObj.duration ? toastObj.duration : 2000,
    success: toastObj.success
  });
}

function getAuther(autherName) {
  wx.getSetting({
    success(res) {
      if (!res.authSetting[autherName]) {
        wx.authorize({
          scope: autherName,
          success() {
          },
          fail() {
            wx.openSetting({
              success: (res) => {
                res.authSetting = {
                  autherName: true
                }
              }
            })
          }
        })
      }
    }
  })
}

/**
 * 0位：二维码来源
 * 1位：智能卡号码
 * 2位：优惠券id
 */
function splice(optionsScene){
  var params = optionsScene.split("~");
  var qrInfo ={};
  for (let [index, elem] of params.entries()) {
    switch(index) {
      case 0:
        qrInfo.qrkind = elem;
      break;
      case 1:
        qrInfo.cardId = elem;
      break;
      case 2:
        qrInfo.couponId = elem;
      break;
    }
  }
  return qrInfo;
}

/**
 * 二维码信息处理
 * options
 * flag 是否需要解密，默认不需要
 */
function getScene(options, callback, flag) {
  var qrutil = require('../qrutil/qrutil.js');
  return qrutil.getScene(options, callback, flag);
}
/**
 *
function getScene(options,flag) {
  // import DES3 from './DES3.js'
  var DES3 = require('./DES3.js');

  var scene = decodeURIComponent(options.q);
  if (this.textIsNull(scene)) {
    scene = decodeURIComponent(options.scene);
  } else {
    scene = scene.split("scene=")[1];
  }
  //scene = '8270102533142253';
  //scene = 'FCB4526479A1FE51435F0CC057A06E9EBA5A74F7F57AE2AD';
  //scene = DES3.encrypt('20~219~8270102533142253');

  //判断下，如果scene 包含~ 或者长度小于12 不需要解密
  //或者flag 为true 则强制需要解密

  if (this.textIsNull(scene)) {
    return scene;
  }else  if (flag || (scene.length > 11 && scene.indexOf('~')<0)){
    try {
      scene = DES3.decrypt(scene);
    } catch (err) {
      console.log('错误 解密原文: ' + scene)
      console.log(err.name + ': ' + +err.message)
    } finally {
    }
  }

  return scene;
}
 */
module.exports = {
  formatTime: formatTime,
  formatLocation: formatLocation,
  textIsNotNull: textIsNotNull,
  formatDay: formatDay,
  showTitleDialog: showTitleDialog,
  getAuther: getAuther,
  showToast: showToast,
  showShortToast: showShortToast,
  textIsNull: textIsNull,
  splice: splice,
  splice: splice,
  getScene:getScene
}
