// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.callBackUrl = undefined;
    if (options.callBackUrl){
      this.callBackUrl = decodeURIComponent(options.callBackUrl);
    }
    

    // this.productId = "7152";
    wx.setStorage({
      key: 'mmm',
      data: 'kkkk',
    })
    let that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          that.wxcode = res.code;
          that.loginStore();
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }

      }
    });
  },
  loginStore: function (){
    let that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo;

        userInfo = that.encode(JSON.stringify(userInfo));
        //base64编码中url不能识别的字符替换掉，后台会按照同样规则替换会真是数据
        userInfo = userInfo.replace('+','_');
        userInfo = userInfo.replace('/', '-');
        
        let loginUrl = undefined;
        if (that.callBackUrl && that.callBackUrl != 'undefined') {
        } else {
          that.callBackUrl = "https://www.juzijumi.com/mobile/checkWXlogin.htm?url=/mobile/customercenter.htm&code=";
        }
        loginUrl = that.callBackUrl + "&encodeUserInfo=" + userInfo + "&"
          + "wxCode=" + that.wxcode;
        that.setData({
          loginUrl: loginUrl
        });

      },

    })
  },
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }

    }
    return utftext;
  } ,
  encode : function (input) {
    let _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";    
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
    input = this._utf8_encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output +
        _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
        _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  } ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    let status = wx.getStorageSync("status");
    if(status == 1) {
      this.setData({
        loginUrl:'javascript:jsbridgeCallback();'
      });
    }else if (status == 2) {
      this.setData({
        loginUrl: 'javascript:jsbridgeCallbackFail();'
      });
    }
    wx.setStorageSync("status", undefined);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})